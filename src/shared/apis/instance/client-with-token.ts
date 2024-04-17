import axios from 'axios';

const clientWithTokenApi = axios.create({
  baseURL: 'http://localhost:3000', // 나중에 실제 백엔드 ip로 변경
  timeout: 1000,
});

export { clientWithTokenApi };
