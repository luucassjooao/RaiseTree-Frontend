import { UserInformationsForSendMail } from '../utils/types/typesUser';
import HttpClient from './utils/HttpClient';

class AuthService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async createMailForActiveAccount({
    type,
    name,
    classroom,
    email,
    password,
    subjectId,
    code,
  }: UserInformationsForSendMail) {
    return this.httpClient.post('/sendEmailForRegister', {
      body: {
        type, name, classroom, email, password, subjectId, code,
      },
    });
  }

  public async ActiveUserWithCode(activeToken: string) {
    return this.httpClient.post('/activeUserWithCode', { body: { activeToken } });
  }

  public async Login(email: string, password: string) {
    return this.httpClient.post('/login', {
      body: { email, password },
    });
  }

  public async Profile() {
    return this.httpClient.get('/profile', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new AuthService();
