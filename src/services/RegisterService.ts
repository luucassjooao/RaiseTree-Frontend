import HttpClient from './utils/HttpClient';

class RegisterService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async sendEmailForRegisterOrganization(
    organizationName: string,
    organizationClassrooms: string[],
    name: string,
    email: string,
    password: string,
    subjectId: string,
  ) {
    return this.httpClient.post('/sendEmailForRegister', {
      body: {
        organizationName,
        organizationClassrooms,
        name,
        email,
        password,
        subjectId,
        firstContact: true,
      },
    });
  }

  public async registerTeacher(
    activeToken: string,
    password: string,
    subjectId: string,
  ) {
    return this.httpClient.post('/activeTeacher', {
      body: {
        activeToken,
        password,
        subjectId,
      },
    });
  }
}

export default new RegisterService();
