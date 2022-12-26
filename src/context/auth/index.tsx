import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import {
  TAuthProvider, IContext, User,
} from './type';

export const AuthContext = createContext({} as IContext);

export function AuthProvider({ children }: TAuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    const { token, findUser } = await AuthService.Login(email, password);

    localStorage.setItem('@Login:Token', token);

    setUser(findUser);
      <Navigate to="/home" />;
  }, []);

  const loadUserInfos = useCallback(async () => {
    try {
      const { findUser } = await AuthService.Profile();
      setUser(findUser);
    } catch {
      <Navigate to="/home" />;
    }
  }, []);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('@Login:Token');
      <Navigate to="/" />;
  }

  useEffect(() => {
    const token = localStorage.getItem('@Login:Token');

    if (token) {
      try {
        loadUserInfos();
      } catch {
        handleLogout();
      }
    }

    return () => {
      setUser(null);
    };
  }, []);

  const ValuesAuthContextProvider = useMemo(() => ({
    user, signIn, handleLogout,
  }), [user, signIn, handleLogout]);

  return (
    <AuthContext.Provider value={ValuesAuthContextProvider}>
      {children}
    </AuthContext.Provider>
  );
}
