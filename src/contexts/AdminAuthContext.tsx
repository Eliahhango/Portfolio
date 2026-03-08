import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { auth, initializeAuthPersistence, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from '../firebase';
import { firebaseClientSetupMessage, isFirebaseClientConfigured, missingFirebaseClientEnvVars } from '../lib/firebaseClientConfig';
import { buildApiUrl, readJsonResponse } from '../lib/adminApi';
import type { AdminProfile } from '../types/admin';

interface AdminAuthContextValue {
  user: User | null;
  adminProfile: AdminProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
  missingConfig: string[];
  configurationError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getFirebaseToken: (forceRefresh?: boolean) => Promise<string | null>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const verifyAdminAccess = async (idToken: string) => {
  const response = await fetch(buildApiUrl('/api/admin/verify'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const data = await readJsonResponse<{ admin: AdminProfile }>(response);
  return data.admin;
};

const normalizeAuthError = (error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unable to sign in.';

  if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password') || message.includes('auth/user-not-found')) {
    return 'Wrong email or password.';
  }

  if (message.includes('auth/invalid-email')) {
    return 'Enter a valid email address.';
  }

  return message;
};

export const AdminAuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [configurationError, setConfigurationError] = useState<string | null>(firebaseClientSetupMessage);

  const clearAuthState = () => {
    setUser(null);
    setAdminProfile(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const syncAuthenticatedUser = async (nextUser: User | null, active: () => boolean) => {
    if (!nextUser) {
      if (active()) {
        clearAuthState();
        setIsLoading(false);
      }
      return;
    }

    try {
      const nextToken = await nextUser.getIdToken();
      const verifiedAdmin = await verifyAdminAccess(nextToken);

      if (!active()) {
        return;
      }

      setUser(nextUser);
      setAdminProfile(verifiedAdmin);
      setToken(nextToken);
      setIsAuthenticated(true);
    } catch {
      await firebaseSignOut(auth).catch(() => undefined);

      if (active()) {
        clearAuthState();
      }
    } finally {
      if (active()) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let isActive = true;
    let unsubscribe = () => undefined;

    const setupAuth = async () => {
      if (!isFirebaseClientConfigured || !auth) {
        setConfigurationError(firebaseClientSetupMessage);
        setIsLoading(false);
        return;
      }

      try {
        await initializeAuthPersistence();
      } catch (error) {
        console.error('Failed to initialize Firebase auth persistence:', error);
        setConfigurationError(error instanceof Error ? error.message : 'Failed to initialize Firebase auth.');
        setIsLoading(false);
        return;
      }

      if (!isActive) {
        return;
      }

      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setIsLoading(true);
        void syncAuthenticatedUser(nextUser, () => isActive);
      });
    };

    void setupAuth();

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!isFirebaseClientConfigured || !auth) {
      throw new Error(firebaseClientSetupMessage || 'Firebase client configuration is incomplete.');
    }

    setIsLoading(true);
    setConfigurationError(firebaseClientSetupMessage);

    try {
      await initializeAuthPersistence();
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const nextToken = await credentials.user.getIdToken(true);
      const verifiedAdmin = await verifyAdminAccess(nextToken);

      setUser(credentials.user);
      setAdminProfile(verifiedAdmin);
      setToken(nextToken);
      setIsAuthenticated(true);
      setConfigurationError(null);
    } catch (error) {
      await firebaseSignOut(auth).catch(() => undefined);
      clearAuthState();
      throw new Error(normalizeAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!auth) {
      clearAuthState();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      await firebaseSignOut(auth);
    } finally {
      clearAuthState();
      setIsLoading(false);
    }
  };

  const getFirebaseToken = async (forceRefresh = false) => {
    if (!auth?.currentUser) {
      return null;
    }

    const nextToken = await auth.currentUser.getIdToken(forceRefresh);
    setToken(nextToken);
    return nextToken;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        adminProfile,
        token,
        isLoading,
        isAuthenticated,
        isConfigured: isFirebaseClientConfigured,
        missingConfig: missingFirebaseClientEnvVars,
        configurationError,
        login,
        logout,
        getFirebaseToken,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used inside an AdminAuthProvider');
  }

  return context;
};
