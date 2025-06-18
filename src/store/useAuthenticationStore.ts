import { create } from 'zustand';

interface AuthenticationState {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; image?: string } | null;
  setAuthenticationStatus: (status: boolean) => void;
  setUser: (user: { id: string; name: string; email: string; image?: string } | null) => void;
  clearAuthentication: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticationStatus: (status) => set({ isAuthenticated: status }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearAuthentication: () => set({ isAuthenticated: false, user: null }),
})); 