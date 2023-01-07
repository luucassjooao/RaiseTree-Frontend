import { TActivity } from '../utils/types';
import HttpClient from './utils/HttpClient';

type ObjActivity = {
  id: string;
  title: string;
  description: string;
  classrooms: string[];
  type: string;
  teacherId: string;
  dateExpiration: Date;
  Teacher: {
    subject: {
      name: string;
    };
    user: {
      name: string;
    }
  }
  subjectId: string;
  subject: {
    id: string;
    name: string;
  }
}

type ArrayActivity = {
  nameSubject: string;
  activitys: ObjActivity[]
}

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
}

export default new ActivityService();
