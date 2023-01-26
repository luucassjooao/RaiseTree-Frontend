import { TStudents } from '../../utils/types/typesStudent';

export type TFrequencyStudents = {
  subjectName: string;
  frequency: boolean;
  student: TStudents;
}

export type TReturnFindStudent = {
  label: string;
  isPresence: boolean;
}
