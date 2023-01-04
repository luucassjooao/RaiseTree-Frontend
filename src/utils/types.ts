import { ChangeEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >

export type UserInformations = {
  type: string;
  name: string;
  classroom?: string[] | string;
  email: string;
  password: string;
  subjectId?: string;
}

export interface UserInformationsForSendMail extends UserInformations {
  code: string
}

export type Login = {
  email: string;
  password: string;
}

export type TActivity = {
  title: string;
  description: string;
  classrooms: string[];
  activity: string;
  dateExpiration: string | Date;
  type: string;
  previousPoints: number;
}

export type TDraft = {
  description: string;
  draft: string;
  title: string;
  id: string;
  createAt: Date;
}

export type TTActivityScreen = {
  activity: string;
  title: string;
  classrooms: string[];
  Teacher: {
    user: {
      name: string
    }
  }
  answered_activities: {
    [x: string]: any;
    id: string;
    answer: string;
    createdAt: Date;
    note_of_teacher: string;
    Student: {
      id: string;
      current_points: number;
      classroom: string;
      user: {
        name: string;
        id: string;
      }
    }
  }
}

export type TFindAnswerStudent = {
  Student: {
    id: string;
    current_points: number;
    classroom: string;
    user: {
      name: string;
      id: string
    }
  }
}

export interface IObjectAnswer extends TFindAnswerStudent {
  [x: string]: any;
  id: string;
  answer: string;
  createdAt: Date;
  note_of_teacher?: string;
}

export interface IAnswerTeacherContainerReply<T> extends IObjectAnswer {
  // eslint-disable-next-line no-unused-vars
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  isLoading: boolean;
  fullActivity: T;
  handleBackAllActivity?(): void;
}

export interface IAnswerTeacherModal extends IObjectAnswer {
  // eslint-disable-next-line no-unused-vars
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

export interface IAnswerTeacherTableStudents extends IObjectAnswer {
    // eslint-disable-next-line no-unused-vars
    modalOpen: (isTrue: boolean, studentInfos: IAnswerTeacherTableStudents) => void;
}
