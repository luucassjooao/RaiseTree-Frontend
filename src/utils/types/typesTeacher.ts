import { TUserForOtherTypes } from './typesUser';

export type TTeacher = {
  id: string
  classrooms: string[]
  subjectId: string
  user: TUserForOtherTypes;
  userId?: string;
}
