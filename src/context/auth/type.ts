/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

export interface IStudent {
  id: string;
  classroom: string;
  current_points: number;
  points: number[]
  userId: string;
}

export interface ITeacher {
  id: string;
  classrooms: string[];
  subjectId: string;
  userId: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
  type: 'admin' | 'student' | 'teacher';
  type_model_student: IStudent | null;
  type_model_teacher: ITeacher | null;
  _count: {
    drafts: number;
  }
}

export type IContext = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
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
