import axios from 'axios';

const clientApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

export { clientApi };
