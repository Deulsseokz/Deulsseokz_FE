import axios from 'axios';
import { useAuthenticationStore } from '../store/useAuthenticationStore';
import { getTokens, saveTokens } from '../utils/tokenManager';
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  async config => {
    const { accessToken } = await getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async error => {
    let originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== `${BASE_URL}/auth/refresh`
    ) {
      originalRequest._retry = true;

      const { refreshToken } = await getTokens();

      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh: refreshToken,
          });

          const { access: newAccessToken, refresh: newRefreshToken } = response.data;
          await saveTokens(newAccessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('리프레쉬 토큰이 만료되었습니다.', refreshError);
          // 재로그인할 수 있도록 처리
          useAuthenticationStore.getState().signOut();

          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
