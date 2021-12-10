import {
  Session,
  User,
  Provider,
  UserCredentials,
  ApiError,
  AuthChangeEvent,
} from "@supabase/supabase-js";
import supabase from "libs/supabase";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  session: Session;
  user: User;
  isLoading?: boolean;
  signIn: (
    { email, phone, password, refreshToken, provider }: UserCredentials,
    { redirectTo, scopes }: { redirectTo?: string; scopes?: string }
  ) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | null;
    url?: string | undefined;
    error: ApiError | null;
  }>;
  signUp: (
    { email, phone, password, refreshToken, provider }: UserCredentials,
    {
      redirectTo,
      data,
    }: {
      redirectTo?: string | undefined;
      data?: object | undefined;
    }
  ) => Promise<{
    user: User | null;
    session: Session | null;
    error: ApiError | null;
  }>;
  signOut: () => Promise<{
    error: ApiError | null;
  }>;
};

export const UserContext =
  createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsLoading(true);
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
        handleAuthChange(event, session);
        setSession(session);
      }
    );
    setIsLoading(false);
    return () => {
      authListener?.unsubscribe();
    };
  });

  const handleAuthChange = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const value = {
    session,
    user,
    isLoading,
    signIn: (
      { email, phone, password, refreshToken, provider }: UserCredentials,
      { redirectTo, scopes }: { redirectTo?: string; scopes?: string }
    ) =>
      supabase.auth.signIn(
        { email, phone, password, refreshToken, provider },
        { redirectTo, scopes }
      ),
    signUp: (
      { email, phone, password, refreshToken, provider }: UserCredentials,
      { redirectTo, data }: { redirectTo?: string; data?: object }
    ) =>
      supabase.auth.signUp(
        { email, phone, password, refreshToken, provider },
        { redirectTo, data }
      ),
    signOut: () => {
      setUser(null);
      return supabase.auth.signOut();
    },
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
