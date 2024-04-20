import axios from 'axios';

const clientWithTokenApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_HOST, // 나중에 실제 백엔드 ip로 변경
  timeout: 1000,
});

export { clientWithTokenApi };
