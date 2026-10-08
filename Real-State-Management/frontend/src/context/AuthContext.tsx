import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { authApi, setAuthToken } from "../lib/api";
import type { ApiUser } from "../types";

interface AuthContextValue {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  login: (payload: Record<string, unknown>) => Promise<void>;
  register: (payload: Record<string, unknown>) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const tokenKey = "rems_token";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(tokenKey),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);

    const hydrate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.me();
        setUser(response.data);
      } catch {
        localStorage.removeItem(tokenKey);
        setAuthToken(null);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void hydrate();
  }, [token]);

  const persistSession = (nextToken: string, nextUser: ApiUser) => {
    localStorage.setItem(tokenKey, nextToken);
    setAuthToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async (payload: Record<string, unknown>) => {
    const response = await authApi.login(payload);
    persistSession(response.token, response.user);
  };

  const register = async (payload: Record<string, unknown>) => {
    const response = await authApi.register(payload);
    persistSession(response.token, response.user);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(tokenKey);
      setAuthToken(null);
      setToken(null);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    if (!token) return;
    const response = await authApi.me();
    setUser(response.data);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, loading, login, register, logout, refreshUser }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
