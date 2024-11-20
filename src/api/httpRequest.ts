import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

type HttpResponseType = { isSuccess: boolean; code: number; message: string };
type HttpSuccessType<T> = HttpResponseType & { result?: T };

const BASE_URL = '/api';

const defaultAxios = axios.create({ baseURL: BASE_URL });
const authAxios = axios.create({ baseURL: BASE_URL });

authAxios.interceptors.request.use((config) => {
  return config;
});

authAxios.interceptors.response.use((config) => {
  return config;
});

class ResponseError extends Error {
  isSuccess: boolean;

  code: number;

  constructor(response: HttpResponseType) {
    super(response?.message);

    this.isSuccess = response?.isSuccess;
    this.code = response?.code;
  }
}

const makeInstance =
  (instance: AxiosInstance) =>
  async <T>(options: AxiosRequestConfig) => {
    try {
      const result = await instance<HttpSuccessType<T>>(options);

      return result.data;
    } catch (e) {
      const err = e as AxiosError<HttpResponseType>;

      console.error('error', err);
      if (err.response) {
        throw new ResponseError(err.response.data);
      }

      throw err;
    }
  };

const defaultInstance = makeInstance(defaultAxios);
const authInstance = makeInstance(authAxios);

export { defaultInstance, authInstance };
