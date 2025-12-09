import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000, // 10초 지나면 Timeout 에러 발생
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 401 에러면 refresh token 을 사용해서 access token 을 갱신
      window.location.href = "/login";
    }
    // 그 외에는 에러 반환
    return Promise.reject(error);
  }
);

export default api;
