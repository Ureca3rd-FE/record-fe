import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000, // 10초 지나면 Timeout 에러 발생
  withCredentials: true,
});

// 요청 인터셉터 추가하기
axios.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      if (originalRequest.url?.includes("/auth/reissue")) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
  }
);

export default api;
