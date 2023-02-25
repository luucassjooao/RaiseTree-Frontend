import { TNotify } from '../utils/types/typesNotify';
import HttpClient from './utils/HttpClient';

class NotifyService {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_BASE_URL}`);
  }

  public async countNotifications() {
    return this.httpClient.get('/getCountNotifications', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async getAllNotifications(): Promise<TNotify[]> {
    return this.httpClient.get('/getAllNotifications', {
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }

  public async markAllNotificationsAsRead(notifications: TNotify[]) {
    return this.httpClient.patch('/markAllNotificationAsRead', {
      body: {
        notifications,
      },
      headers: {
        authorization: localStorage.getItem('@Login:Token') || '',
      },
    });
  }
}

export default new NotifyService();
