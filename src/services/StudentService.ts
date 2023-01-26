import { TStudents } from '../utils/types/typesStudent';
import HttpClient from './utils/HttpClient';

interface TFrequencyStudents {
  subjectName: string;
  frequency: boolean;
  student: TStudents;
}
class StudentService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async getStudentsByClassroom(classroom: string) {
    return this.httpClient.get(`/getStudents/${classroom}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async addFrequencyStudents(frequencyStudents: TFrequencyStudents[]) {
    return this.httpClient.patch('/addFrequency', {
      body: {
        frequencyStudents,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new StudentService();
