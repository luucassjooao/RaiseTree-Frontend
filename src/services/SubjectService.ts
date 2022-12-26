import HttpClient from './utils/HttpClient';

class SubjectService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async findAll() {
    return this.httpClient.get('/findAllMatters', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new SubjectService();
