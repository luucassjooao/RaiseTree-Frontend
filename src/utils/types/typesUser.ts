import { TStudents } from './typesStudent';
import { TTeacher } from './typesTeacher';

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

export type TUserForOtherTypes = {
  id?: string;
  name?: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  organizationId: string;
  type: 'admin' | 'student' | 'teacher';
  type_model_student: TStudents | null;
  type_model_teacher: TTeacher | null;
  _count: {
    drafts: number;
  }
}
