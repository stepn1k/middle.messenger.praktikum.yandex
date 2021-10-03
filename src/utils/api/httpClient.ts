const enum HttpMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type HttpRequestOptions = {
  method?: HttpMethodsEnum;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
};

function queryStringify(data: Record<string, any>) {
  const queryKeys = Object.keys(data);
  return queryKeys.reduce((acc, key, index) => `${acc}${key}=${data[key]}${index < queryKeys.length - 1 ? '&' : ''}`, '?');
}

export default class HttpClient {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  public get(path: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(this.url + path,
      { ...options, method: HttpMethodsEnum.GET }, options.timeout);
  }

  public post(path: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(this.url + path,
      { ...options, method: HttpMethodsEnum.POST }, options.timeout);
  }

  public put(path: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(this.url + path,
      { ...options, method: HttpMethodsEnum.PUT }, options.timeout);
  }

  public delete(path: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(this.url + path,
      { ...options, method: HttpMethodsEnum.DELETE }, options.timeout);
  }

  request = (
    url: string,
    options: HttpRequestOptions = { method: HttpMethodsEnum.GET },
    timeout: number = 10_000,
  ): Promise<XMLHttpRequest> => {
    const {
      headers = {}, method, data, withCredentials,
    } = options;

    const contentType = headers['content-type'];
    const isJSON = contentType && contentType.includes('application/json');

    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      // timeout
      xhr.timeout = timeout;
      xhr.withCredentials = !withCredentials;

      xhr.open(method,
        (method === HttpMethodsEnum.GET) && data
          ? `${url}${queryStringify(data)}`
          : url);

      // headers
      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HttpMethodsEnum.GET || !data) {
        xhr.send();
      } else if (isJSON) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}
