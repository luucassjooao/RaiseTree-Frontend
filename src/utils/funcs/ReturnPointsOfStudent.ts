import { useAuth } from '../../hooks/useAuth';
import { TPoints, TStudents } from '../types/typesStudent';

export function ReturnPointsOfStudent(student: TStudents | undefined): number | string {
  const { user } = useAuth();

  if (!student) return 0;

  const { points } = student;

  const findPointsOfStudentInThisSubject = points?.find(
    (point: TPoints) => point.subjectName === user?.type_model_teacher?.subject.name,
  );

  if (!findPointsOfStudentInThisSubject) return 'Ouve um error ao buscar os pontos deste aluno!';

  return findPointsOfStudentInThisSubject.points;
}
