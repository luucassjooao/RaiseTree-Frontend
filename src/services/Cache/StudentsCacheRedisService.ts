import HttpClient from '../utils/HttpClient';

class StudentCacheRedisService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async cleanUpStudentsByClassroom(classroom: string) {
    return this.httpClient.get(`/clean-cache/of-classrooms/${classroom}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new StudentCacheRedisService();
