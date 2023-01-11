import { ArrayActivity, ICreateActiviyByDraft } from '../utils/types/typesActivity';
import HttpClient from './utils/HttpClient';

class ActivityService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async createActivity({
    title,
    description,
    classrooms,
    activity,
    dateExpiration,
    type,
    previousPoints,
    idDraft,
  }: ICreateActiviyByDraft) {
    return this.httpClient.post(`/createActivity/${idDraft}`, {
      body: {
        title, description, classrooms, activity, dateExpiration, type, previousPoints,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async answerActivity(answer: string, idActivity: string) {
    return this.httpClient.post(`/registerAnswer/${idActivity}`, {
      body: {
        answer,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async answerReplyActivityOfStudent(
    note: string,
    point: number,
    idActivity: string,
    idAnswer: string,
    idStudent: string,
  ) {
    return this.httpClient.patch(`/replyActivityOfStudent/${idActivity}/${idAnswer}/${idStudent}`, {
      body: {
        note, point,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async getHomeActivities(): Promise<ArrayActivity[]> {
    const getActivities = await this.httpClient.get('/getHomeActivities', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });

    return getActivities;
  }

  public async getUniqueActivityById(id: string) {
    return this.httpClient.get(`/getUniqueById/${id}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async getAllAnswerActivityOfStudent(studentId: string) {
    return this.httpClient.get(`/getAllAnswerAcitivityOfStudent/${studentId}`, {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async adminGetActivity() {
    return this.httpClient.get('/adminGetActivity', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new ActivityService();
