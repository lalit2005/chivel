import {
  Session,
  User,
  Provider,
  UserCredentials,
  ApiError,
  AuthChangeEvent,
} from '@supabase/supabase-js'
import supabase from 'libs/supabase'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  session: Session
  user: User
  userLoaded: boolean
  signIn: (options: SignInOptions) => Promise<{
    session: Session | null
    user: User | null
    provider?: Provider | null
    url?: string | undefined
    error: ApiError | null
  }>
  signUp: (options: SignUpOptions) => Promise<{
    user: User | null
    session: Session | null
    error: ApiError | null
  }>
  signOut: () => Promise<{
    error: ApiError | null
  }>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        handleAuthChange(event, session)
        setSession(session)
        setUser(session?.user ?? null)
      }
    )
    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const handleAuthChange = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  useEffect(() => {
    if (user) {
      setUserLoaded(true)
    }
  }, [user])

  const value = {
    session,
    user,
    userLoaded,
    signIn: (options: SignInOptions) => supabase.auth.signIn(options),
    signUp: (options: SignUpOptions) => supabase.auth.signUp(options),
    signOut: () => {
      setUser(null)
      return supabase.auth.signOut()
    },
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}

interface SignInOptions {
  email?: string | undefined
  phone?: string | undefined
  password?: string | undefined
  refreshToken?: string | undefined
  provider?: Provider | undefined
  redirectTo?: string | undefined
  scopes?: string | undefined
}

interface SignUpOptions extends UserCredentials {
  redirectTo?: string | undefined
  data?: object | undefined
}
