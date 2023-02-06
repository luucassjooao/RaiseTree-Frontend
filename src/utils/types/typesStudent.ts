import { TUserForOtherTypes } from './typesUser';

export type TFrequency = {
  dates: string[];
  subjectName: string;
}

export type TPoints = {
  points: number;
  subjectName: string;
}

export type TStudents = {
  id: string;
  classroom: string;
  user: TUserForOtherTypes;
  userId?: string;
  points?: TPoints[];
  frequency: TFrequency[];
  _count?: {
    reply_activities: number;
  }
}
