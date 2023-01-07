import { TUserForOtherTypes } from './typesUser';

export type TStudents = {
  id: string;
  current_points: string;
  classroom: string;
  user: TUserForOtherTypes;
  userId?: string;
  points?: number[];
}
