import axios from 'axios';
import { BASE_URL } from './url';

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.response.use((response) => {
  const { status } = response;
  // 如果http响应状态码response.status正常，则直接返回数据
  if (status === 200 && response.data.status === 200) {
    return response.data.body;
  }
  //    当请求状态码和后端返回的errCode异常
  //    其他处理操作
  return '请求失败';
});
