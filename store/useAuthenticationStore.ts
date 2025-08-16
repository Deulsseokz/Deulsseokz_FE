import { create } from 'zustand';

interface AuthenticationStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const useAuthenticationStore = create<AuthenticationStore>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  signIn: () => set({ isAuthenticated: true }),
  signOut: () => set({ isAuthenticated: false }),
}));
