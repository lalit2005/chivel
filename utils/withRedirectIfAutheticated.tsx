import { User } from '@supabase/gotrue-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from './contexts/useUser';

const defaultOnRedirecting = (): JSX.Element => <>Redirecting</>;

export interface WithRedirectIfAutheticatedOptions {
  redirectTo?: string;
  onRedirecting?: () => JSX.Element;
}

/**
 * @ignore
 */
export interface WithRedirectIfAutheticatedProps {
  user: User;
  [key: string]: any;
}

export type WithRedirectIfAutheticated = <
  P extends WithRedirectIfAutheticatedProps
>(
  Component: React.ComponentType<P>,
  options?: WithRedirectIfAutheticatedOptions
) => React.FC<Omit<P, 'user'>>;

const withRedirectIfAutheticated: WithRedirectIfAutheticated = (
  Component,
  options = {}
) => {
  return function withRedirectIfAuthenticated(props): JSX.Element {
    const { redirectTo, onRedirecting = defaultOnRedirecting } = options;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, isLoading } = useUser();
    const dashboardUrl = '/dashboard';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!user || isLoading) return;
      let returnToPath: string;

      if (!redirectTo) {
        returnToPath = dashboardUrl;
      } else {
        returnToPath = redirectTo;
      }

      // window.location.assign(`${loginUrl}?returnTo=${returnToPath}`)
      console.log(returnToPath);
      router.push(returnToPath);
    }, [user, isLoading]);

    if (!user) return <Component {...(props as any)} />;
    return onRedirecting();
  };
};

export default withRedirectIfAutheticated;
