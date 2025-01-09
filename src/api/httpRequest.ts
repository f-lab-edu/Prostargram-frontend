import { getAccessToken } from '@/utils/manageToken';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export type HttpResponseType = {
  isSuccess: boolean;
  code: number;
  message: string;
};
export type HttpSuccessType<T> = HttpResponseType & { result?: T };

const BASE_URL = '/api';

const defaultAxios = axios.create({ baseURL: BASE_URL });
const authAxios = axios.create({ baseURL: BASE_URL });

authAxios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

authAxios.interceptors.response.use((config) => {
  return config;
});

export class ResponseError extends Error {
  isSuccess: boolean;

  code: number;

  originError: AxiosError;

  constructor(err: AxiosError<HttpResponseType>) {
    if (err.response) {
      super(err.response.data.message);
      this.isSuccess = err.response.data.isSuccess;
      this.code = err.response.data.code;
    } else {
      super(err.message);
      this.isSuccess = false;
      this.code = 0;
    }

    this.originError = err;
  }
}
// export class ResponseError extends Error {
//   isSuccess: boolean;

//   code: number;

//   constructor(err: AxiosError<HttpResponseType>) {
//     super(err.message);

//     this.isSuccess = !!err.response?.data.isSuccess || false;
//     this.code = err.response?.data.code || 499;
//   }
// }

const makeInstance =
  (instance: AxiosInstance) =>
  async <T>(options: AxiosRequestConfig) => {
    try {
      const result = await instance<HttpSuccessType<T>>(options);

      return result.data;
    } catch (e) {
      const err = e as AxiosError<HttpResponseType>;
      console.log(err);

      throw new ResponseError(err);
    }
  };

const defaultInstance = makeInstance(defaultAxios);
const authInstance = makeInstance(authAxios);

export { defaultInstance, authInstance };
