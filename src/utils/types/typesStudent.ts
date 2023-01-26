import { TUserForOtherTypes } from './typesUser';

export type TFrequency = {
  dates: string[];
  subjectName: string;
}

export type TStudents = {
  id: string;
  current_points: string;
  classroom: string;
  user: TUserForOtherTypes;
  userId?: string;
  points?: number[];
  frequency: TFrequency[];
  _count?: {
    reply_activities: number;
  }
}
