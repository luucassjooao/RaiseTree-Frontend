import { TPeoplesNews, TPeoplesScreen } from '../utils/types/typesPeoples';
import HttpClient from './utils/HttpClient';

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

  public async createManyPeoples(peoples: TPeoplesNews[]) {
    return this.httpClient.post('/createManyPeoples', {
      body: {
        peoples,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async findAllPeoplesStaticInOrganization(
    organizationId: string,
  ): Promise<TPeoplesScreen[]> {
    const getPeoples = this.httpClient.get(`/findallpeoplesstaticUser/${organizationId}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });

    return getPeoples;
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
