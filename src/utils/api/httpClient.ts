const enum HttpMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type HttpRequestOptions = {
  method?: HttpMethodsEnum;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
};

export default class HttpClient {
  get(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethodsEnum.GET }, options.timeout);
  };

  post(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethodsEnum.POST }, options.timeout);
  };

  put(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethodsEnum.PUT }, options.timeout);
  };

  delete(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: HttpMethodsEnum.DELETE }, options.timeout);
  };

  request(url: string, options: HttpRequestOptions = { method: HttpMethodsEnum.GET }, timeout: number = 10_000): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      // timeout
      xhr.timeout = timeout;
      xhr.open(method,
        (method === HttpMethodsEnum.GET) && data
          ? `${url}${queryStringify(data)}`
          : url
      );

      // headers
      Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HttpMethodsEnum.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });

  };
}

function queryStringify(data: Record<string, any>) {
  const queryKeys = Object.keys(data)
  return queryKeys.reduce((acc, key, index) => {
    return `${acc}${key}=${data[key]}${index < queryKeys.length - 1 ? '&' : ''}`;
  }, '?');
}
