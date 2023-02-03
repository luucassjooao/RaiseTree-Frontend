/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';
import { User } from '../../utils/types/typesUser';

export type IContext = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  hopingActivatingAccount: boolean;
  ChangeHopingActivatingAccount(): void;
  changeNumberOfDrafts(type: 'increse' | 'decrese'): void;
}

export type TAuthProvider = {
  children: ReactNode;
};

export type AuthResponse = {
  token: string;
  findUser: {
    _id: string;
    type: 'teacher' | 'student';
    name: string;
    email: string;
  }
}
