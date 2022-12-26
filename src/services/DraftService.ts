import HttpClient from './utils/HttpClient';

class DraftService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async createDraft(
    title: string,
    description: string,
    draft: string,
  ) {
    return this.httpClient.post('/createDraft', {
      body: {
        title, description, draft,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async getAllDraftsOfUser() {
    return this.httpClient.get('/findAllDraftsOfUser', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async getUniqueDraft(id: string) {
    return this.httpClient.get(`/findDraft/${id}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new DraftService();
