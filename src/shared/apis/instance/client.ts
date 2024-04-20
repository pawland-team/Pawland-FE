import axios from 'axios';

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_HOST,
  timeout: 1000,
});

export { clientApi };
