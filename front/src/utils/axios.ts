import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.headers!['Authorization'] = 'Bearer ' + window.localStorage.getItem('token') || '';
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
