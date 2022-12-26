import HttpClient from './utils/HttpClient';

type TPeoples = {
  name: string;
  type: string;
  classroom: string[];
  cpf?: string | null;
}

class StaticUser {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async sendOnePerson(
    name: string,
    classroom: string[],
    type: string,
    code?: string,
  ) {
    return this.httpClient.post('/newStaticUser', {
      body: {
        name,
        classroom,
        type,
        code,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async createManyPeoples(peoples: TPeoples[]) {
    return this.httpClient.post('/createManyPeoples', {
      body: {
        peoples,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async findAllPeoplesStaticInOrganization(organizationId: string) {
    return this.httpClient.get(`/findallpeoplesstaticUser/${organizationId}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async createPeoplesOfSheet(sheetId: string, typeOfPeoples: string) {
    return this.httpClient.get(`/createPeoplesBySheet/${sheetId.split('/')[5]}/${typeOfPeoples}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new StaticUser();
