import { TUserForOtherTypes } from './typesUser';

export type TTeacher = {
  id: string
  classrooms: string[]
  subject: {
    id: string;
    name: string;
  };
  user: TUserForOtherTypes;
  userId?: string;
}
