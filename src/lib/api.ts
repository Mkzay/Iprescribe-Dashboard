import type {
  DashboardStatsResponse,
  LoginResponse,
  PatientsIndexResponse,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export async function apiLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<LoginResponse>(res);
}

export async function fetchDashboardStats(): Promise<DashboardStatsResponse> {
  const res = await fetch(`${BASE_URL}/admin/dashboard/stats`, {
    headers: {
      ...authHeader(),
    },
  });
  return handleResponse<DashboardStatsResponse>(res);
}

export async function fetchPatients(page = 1): Promise<PatientsIndexResponse> {
  const url = new URL(`${BASE_URL}/admin/patients`);
  url.searchParams.set("page", String(page));
  const res = await fetch(url.toString(), {
    headers: {
      ...authHeader(),
    },
  });
  return handleResponse<PatientsIndexResponse>(res);
}
