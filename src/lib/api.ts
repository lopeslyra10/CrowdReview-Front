import { API_BASE_URL } from "./constants";
import {
  Company,
  DashboardMetrics,
  Review,
  SuspiciousReview,
  User,
} from "@/types";

type RequestOptions = RequestInit & { skipAuthRefresh?: boolean };

async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuthRefresh, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...rest,
  });

  if (response.status === 401 && !skipAuthRefresh) {
    try {
      await refreshToken();
      return apiFetch<T>(path, { ...rest, skipAuthRefresh: true });
    } catch {
      throw new Error("Sessão expirada. Faça login novamente.");
    }
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro ao comunicar com o servidor.");
  }

  const isJson =
    response.headers.get("content-type")?.includes("application/json");
  return (isJson ? response.json() : ({} as T)) as Promise<T>;
}

export async function login(payload: { email: string; password: string }) {
  return apiFetch<{ user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return apiFetch<{ user: User }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function me() {
  return apiFetch<User>("/auth/me");
}

export async function refreshToken() {
  return apiFetch("/auth/refresh", {
    method: "POST",
    skipAuthRefresh: true,
  });
}

export async function logout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}

export async function getCompanies() {
  return apiFetch<Company[]>("/companies");
}

export async function getCompany(id: string) {
  return apiFetch<Company>(`/companies/${id}`);
}

export async function getCompanyReviews(id: string) {
  return apiFetch<Review[]>(`/companies/${id}/reviews`);
}

export async function createReview(payload: {
  companyId: string;
  rating: number;
  comment: string;
  tags: string[];
  location?: string;
  images?: string[];
}) {
  return apiFetch<Review>("/reviews/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getDashboardMetrics() {
  return apiFetch<DashboardMetrics>("/dashboard/metrics");
}

export async function getSuspiciousReviews() {
  return apiFetch<SuspiciousReview[]>("/admin/reviews/suspicious");
}

export async function respondToReview(
  reviewId: string,
  payload: { response: string }
) {
  return apiFetch(`/admin/reviews/${reviewId}/respond`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
