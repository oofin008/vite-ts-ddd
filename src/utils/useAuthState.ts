import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useMemo } from 'react';
import { LoadingHook, useLoadingValue } from './useLoadingValue';

export type AuthStateHook = LoadingHook<User | null, Error>;

// Ref: https://github.com/CSFrequency/react-firebase-hooks/tree/edab3f3f3b5ec01c8aafcc6096755dfcc69e4408

type AuthStateOptions = {
  onUserChanged?: (user: User | null) => Promise<void>;
};

export const useAuthState = (auth: Auth, options?: AuthStateOptions): AuthStateHook => {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    User | null,
    Error
  >(() => auth.currentUser);

  useEffect(() => {
    const listener = onAuthStateChanged(
      auth,
      async (user) => {
        if (options?.onUserChanged) {
          // onUserChanged function to process custom claims on any other trigger function
          try {
            await options.onUserChanged(user);
          } catch (e) {
            setError(e as Error);
          }
        }
        setValue(user);
      },
      setError
    );

    return () => {
      listener();
    };
  }, [auth]);

  const resArray: AuthStateHook = [value, loading, error];
  return useMemo<AuthStateHook>(() => resArray, resArray);
};