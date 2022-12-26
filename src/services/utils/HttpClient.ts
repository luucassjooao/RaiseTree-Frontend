/* eslint-disable no-undef */
import APIError from '../../errors/APIError';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
}

class HttpClient {
  public baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path: string, options: RequestOptions) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path: string, options: RequestOptions) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  patch(path: string, options: RequestOptions) {
    return this.makeRequest(path, {
      method: 'PATCH',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(path: string, options: RequestOptions) {
    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    if (import.meta.env.VITE_REACT_MODE === 'develpmnet') console.log(response, responseBody);

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
