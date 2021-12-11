import { User } from '@supabase/gotrue-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from './contexts/useUser';

/**
 * @ignore
 */
const defaultOnRedirecting = (): JSX.Element => (
  <>
    <div className='w-screen min-h-screen bg-black' />
  </>
);

export interface WithPageAuthRequiredOptions {
  /**
   * ```js
   * withPageAuthRequired(Profile, {
   *   returnTo: '/profile'
   * });
   * ```
   *
   * Add a path to return the user to after login.
   */
  returnTo?: string;
  /**
   * ```js
   * withPageAuthRequired(Profile, {
   *   onRedirecting: () => <div>Redirecting you to the login...</div>
   * });
   * ```
   *
   * Render a message to show that the user is being redirected to the login.
   */
  onRedirecting?: () => JSX.Element;
}

/**
 * @ignore
 */
export interface WithPageAuthRequiredProps {
  user: User;
  [key: string]: any;
}

export type WithPageAuthRequired = <P extends WithPageAuthRequiredProps>(
  Component: React.ComponentType<P>,
  options?: WithPageAuthRequiredOptions
) => React.FC<Omit<P, 'user'>>;

const withPageAuthRequired: WithPageAuthRequired = (
  Component,
  options = {}
) => {
  return function withPageAuthRequired(props): JSX.Element {
    const { returnTo, onRedirecting = defaultOnRedirecting } = options;
    const loginUrl = '/auth/login';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, isLoading } = useUser();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.log(user);
      if (user || isLoading) return;
      let returnToPath: string;

      if (!returnTo) {
        const currentLocation = window.location.toString();
        returnToPath =
          currentLocation.replace(new URL(currentLocation).origin, '') || '/';
      } else {
        returnToPath = returnTo;
      }

      // window.location.assign(`${loginUrl}?returnTo=${returnToPath}`)
      router.push(`${loginUrl}?returnTo=${returnToPath}`);
    }, [user, isLoading]);

    if (user) return <Component user={user} {...(props as any)} />;

    return onRedirecting();
  };
};

export default withPageAuthRequired;
