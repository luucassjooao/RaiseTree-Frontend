import { TObjectAnswer } from './typesAnswerActivity';
import { TTeacher } from './typesTeacher';

export type TActivity = {
  id?: string
  title: string;
  description: string;
  classrooms: string[];
  activity: string;
  dateExpiration: string | Date;
  type: string;
  previousPoints: number;
}

export type ObjActivity = (TActivity & {
  Teacher: TTeacher;
  subjectId: string;
  subject: {
    id: string;
    name: string;
  }
})

export type ArrayActivity = {
  nameSubject: string;
  activitys: ObjActivity[]
}

export type TTActivityScreen = {
  activity: string;
  title: string;
  classrooms: string[];
  Teacher: TTeacher;
  answered_activities: TObjectAnswer;
}
