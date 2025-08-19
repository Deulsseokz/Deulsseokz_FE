import { deleteTokens, getTokens, saveTokens } from '@/utils/tokenManager';
import { create } from 'zustand';

/**
 * 인증 상태를 관리하는 스토어
 * @param {boolean} isAuthenticated - 인증 상태
 * @param {boolean} isLoading - 로딩 상태
 * @param {function} signIn - 로그인 액션
 * @param {function} signOut - 로그아웃 액션
 */
interface AuthenticationStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// result 타입 반드시 명시해야 함

export const useAuthenticationStore = create<AuthenticationStore>(set => ({
  isAuthenticated: false,
  isLoading: true,

  signIn: async (accessToken: string, refreshToken: string) => {
    await saveTokens(accessToken, refreshToken);
    set({ isAuthenticated: true });
  },

  signOut: async () => {
    await deleteTokens();
    set({ isAuthenticated: false });
  },

  checkAuthStatus: async () => {
    const { accessToken } = await getTokens();
    set({ isAuthenticated: !!accessToken, isLoading: false });
  },
}));
