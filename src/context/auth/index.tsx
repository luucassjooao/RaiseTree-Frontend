import {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import AuthService from '../../services/AuthService';
import { User } from '../../utils/types/typesUser';
import {
  TAuthProvider, IContext,
} from './type';

export const AuthContext = createContext({} as IContext);

export function AuthProvider({ children }: TAuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  const [hopingActivatingAccount, setHopingActivatingAccount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    const { token, findUser } = await AuthService.Login(email, password);

    localStorage.setItem('@Login:Token', token);

    setUser(findUser);
      <Navigate to="/home" />;
  }, []);

  const loadUserInfos = useCallback(async () => {
    const { findUser } = await AuthService.Profile();
    setUser(findUser);
  }, []);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('@Login:Token');
    queryClient.clear();
      <Navigate to="/" />;
  }

  function ChangeHopingActivatingAccount() {
    setHopingActivatingAccount((prevState) => (prevState !== true));
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('@Login:Token');

      setLoading(true);
      if (token) {
        try {
          await loadUserInfos();
        } catch {
          handleLogout();
        } finally {
          setLoading(false);
        }
      }
    })();
  }, []);

  const ValuesAuthContextProvider = useMemo(() => ({
    user, signIn, handleLogout, hopingActivatingAccount, ChangeHopingActivatingAccount,
  }), [user, signIn, handleLogout]);

  return (
    <>
      <Loader isLoading={loading} />
      <AuthContext.Provider value={ValuesAuthContextProvider}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
