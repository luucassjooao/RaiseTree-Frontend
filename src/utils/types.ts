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
    Student: {
      id: string;
      current_points: number;
      classroom: string;
      user: {
        name: string;
      }
    }
  }
}

export type TAnswerTeacher = {
  id: string;
  answer: string;
  createdAt: Date;
  Student: {
    id: string;
    current_points: number;
    classroom: string;
    user: {
      name: string;
    }
  }
}

export interface IAnswerTeacherContainerReply extends TAnswerTeacher {
  // eslint-disable-next-line no-unused-vars
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  isLoading: boolean;
}

export interface IAnswerTeacherModal extends TAnswerTeacher {
  // eslint-disable-next-line no-unused-vars
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

export interface IAnswerTeacherTableStudents extends TAnswerTeacher {
    // eslint-disable-next-line no-unused-vars
    modalOpen: (isTrue: boolean, studentInfos: IAnswerTeacherTableStudents) => void;
}
