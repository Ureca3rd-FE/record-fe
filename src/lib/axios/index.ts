import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000, // 10초 지나면 Timeout 에러 발생
  withCredentials: true,
});

export default api;
