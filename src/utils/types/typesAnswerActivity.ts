import { ObjActivity } from './typesActivity';
import { TStudents } from './typesStudent';

export type TActivityAnswer = {
  id: string;
  Activity: ObjActivity;
}

export type TFindAnswerStudent = {
  Student: TStudents;
}

export type TObjectAnswer = (TFindAnswerStudent & {
  [x: string]: any;
  id: string;
  answer: string;
  createdAt: Date;
  note_of_teacher?: string;
});

export interface IAnswerTeacherContainerReply<T> extends TObjectAnswer {
  // eslint-disable-next-line no-unused-vars
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  isLoading: boolean;
  fullActivity: T;
  handleBackAllActivity?(): void;
}

export interface IAnswerTeacherModal extends TObjectAnswer {
  // eslint-disable-next-line no-unused-vars
  callback: (note: string, point: number, idAnswer: string, idStudent: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

export interface IAnswerTeacherTableStudents extends TObjectAnswer {
    // eslint-disable-next-line no-unused-vars
    modalOpen: (isTrue: boolean, studentInfos: IAnswerTeacherTableStudents) => void;
}
