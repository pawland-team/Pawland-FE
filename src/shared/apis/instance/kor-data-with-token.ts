import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios';

export const korDataWithToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KOREA_DATA_BASE_URL,
  timeout: 3000,
  timeoutErrorMessage: '요청 시간이 3초 이상 초과되었습니다. 다시 시도해주세요.',
  headers: {
    'Content-Type': 'application/json',
  },
});

korDataWithToken.interceptors.request.use(null, (error) => {
  if (isAxiosError(error)) {
    console.error(`☢️ [API] | Error ${error.message} Request`);

    return Promise.reject(error);
  }

  console.error(error);

  return Promise.reject(new Error('☢️ 알 수 없는 에러가 발생했습니다. 다시 시도해주세요. | Request'));
});

korDataWithToken.interceptors.response.use(null, (error) => {
  if (isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    console.error(`☢️ [API] ${method?.toUpperCase()} ${url} | Response`);

    return Promise.reject(error);
  }

  console.error(error);

  return Promise.reject(new Error('☢️ 알 수 없는 에러가 발생했습니다. 다시 시도해주세요. | Response'));
});
