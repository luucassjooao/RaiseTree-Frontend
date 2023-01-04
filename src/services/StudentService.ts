import HttpClient from './utils/HttpClient';

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
}

export default new StudentService();
