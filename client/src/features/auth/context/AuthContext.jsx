import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import {auth} from "../../../shared/config/firebase";
import { resolveUserRole } from '../lib/userRole';
import { env } from '../../../shared/config/env';
import {
  getCurrentMockUser,
  MOCK_AUTH_EVENT,
  signOutMockUser,
} from '../../../shared/lib/auth/mockAuth';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (env.useMockAuth) {
      setUser(getCurrentMockUser());
      setIsPending(false);

      const handleMockAuthChange = (event) => {
        setUser(event.detail ?? getCurrentMockUser());
      };

      window.addEventListener(MOCK_AUTH_EVENT, handleMockAuthChange);

      return () => {
        window.removeEventListener(MOCK_AUTH_EVENT, handleMockAuthChange);
      };
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setIsPending(false);
      },
      (err) => {
        setError(err);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => {
      const resolvedRole = resolveUserRole(user);

      return {
        session: user ? { uid: user.uid } : null,
        user,
        role: resolvedRole,
        isAuthenticated: Boolean(user),
        isPending,
        error,
        async refetch() {
          return null;
        },
        async signOut() {
          if (env.useMockAuth) {
            signOutMockUser();
            setUser(null);
            return null;
          }

          return firebaseSignOut(auth);
        },
        updateUserProfile(profile) {
          setUser((currentUser) => {
            if (!currentUser) {
              return currentUser;
            }

            return {
              ...currentUser,
              email: profile?.mail || currentUser.email,
              displayName: profile?.name || currentUser.displayName,
              profile: {
                ...currentUser.profile,
                ...profile,
              },
            };
          });
        },
      };
    },
    [user, isPending, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}