import axios from "axios";
import type {
  ApiProperty,
  ApiUser,
  DashboardPayload,
  PropertyFilters,
} from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export interface AuthResponse {
  message: string;
  user: ApiUser;
  token: string;
}

export const authApi = {
  register: async (payload: Record<string, unknown>) =>
    (await api.post<AuthResponse>("/register", payload)).data,
  login: async (payload: Record<string, unknown>) =>
    (await api.post<AuthResponse>("/login", payload)).data,
  logout: async () => (await api.post("/logout")).data,
  me: async () => (await api.get<{ data: ApiUser }>("/me")).data,
};

export const propertyApi = {
  list: async (filters: PropertyFilters = {}) =>
    (await api.get("/properties", { params: filters })).data,
  get: async (id: number) =>
    (await api.get<{ data: ApiProperty }>(`/properties/${id}`)).data,
  create: async (payload: FormData) =>
    (
      await api.post("/admin/properties", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  update: async (id: number, payload: FormData) =>
    (
      await api.post(`/admin/properties/${id}?_method=PUT`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  remove: async (id: number) =>
    (await api.delete(`/admin/properties/${id}`)).data,
};

export const favoritesApi = {
  list: async () => (await api.get("/favorites")).data,
  toggle: async (id: number) =>
    (await api.post(`/favorites/${id}/toggle`)).data,
};

export const contactsApi = {
  create: async (payload: Record<string, unknown>) =>
    (await api.post("/contacts", payload)).data,
};

export const dashboardApi = {
  get: async () => (await api.get<DashboardPayload>("/admin/dashboard")).data,
};

export const usersApi = {
  list: async (params: Record<string, unknown> = {}) =>
    (await api.get("/admin/users", { params })).data,
  update: async (id: number, payload: Record<string, unknown>) =>
    (await api.put(`/admin/users/${id}`, payload)).data,
  remove: async (id: number) => (await api.delete(`/admin/users/${id}`)).data,
};

export default api;
