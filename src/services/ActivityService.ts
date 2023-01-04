import { TActivity } from '../utils/types';
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
  }: TActivity) {
    return this.httpClient.post('/createActivity', {
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

  public async getHomeActivities() {
    return this.httpClient.get('/getHomeActivities', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
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
}

export default new ActivityService();
