import { API_BASE_URL } from "./constants";
import { Company, DashboardMetrics, Review, SuspiciousReview, User } from "@/types";

type RequestOptions = RequestInit & { skipAuthRefresh?: boolean };

const TOKEN_KEY = "crowdreview:token";
const REFRESH_KEY = "crowdreview:refresh";
const USER_KEY = "crowdreview:user";

let accessToken: string | null = null;
let refreshTokenValue: string | null = null;

function isBrowser() {
  return typeof window !== "undefined";
}

function persistTokens(access?: string | null, refresh?: string | null) {
  if (typeof access !== "undefined") accessToken = access;
  if (typeof refresh !== "undefined") refreshTokenValue = refresh;

  if (isBrowser()) {
    if (access) {
      window.localStorage.setItem(TOKEN_KEY, access);
      document.cookie = `token=${access}; path=/`;
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
      document.cookie = "token=; Max-Age=0; path=/";
    }

    if (refresh) {
      window.localStorage.setItem(REFRESH_KEY, refresh);
    } else {
      window.localStorage.removeItem(REFRESH_KEY);
    }
  }
}

export function persistUser(user?: User | null) {
  if (isBrowser()) {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      document.cookie = `role=${user.role}; path=/`;
    } else {
      window.localStorage.removeItem(USER_KEY);
      document.cookie = "role=; Max-Age=0; path=/";
    }
  }
}

function loadTokens() {
  if (!isBrowser()) return;
  accessToken = window.localStorage.getItem(TOKEN_KEY);
  refreshTokenValue = window.localStorage.getItem(REFRESH_KEY);
}

async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (accessToken === null && isBrowser()) {
    loadTokens();
  }

  const { skipAuthRefresh, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },
    ...rest,
  });

  if (response.status === 401 && !skipAuthRefresh && refreshTokenValue) {
    const refreshed = await refreshToken();
    persistTokens(refreshed.access_token, refreshed.refresh_token);
    return apiFetch<T>(path, { ...rest, skipAuthRefresh: true });
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro ao comunicar com o servidor.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  return (isJson ? response.json() : ({} as T)) as Promise<T>;
}

export async function login(payload: { email: string; password: string }) {
  const data = await apiFetch<{ user: User; access_token: string; refresh_token: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  persistTokens(data.access_token, data.refresh_token);
  persistUser(data.user);
  return data;
}

export async function register(payload: { username: string; email: string; password: string }) {
  const data = await apiFetch<{ user: User; access_token: string; refresh_token: string }>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  persistTokens(data.access_token, data.refresh_token);
  persistUser(data.user);
  return data;
}

export function getStoredUser(): User | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export async function refreshToken() {
  if (!refreshTokenValue && isBrowser()) {
    loadTokens();
  }

  return apiFetch<{ access_token: string; refresh_token: string }>("/auth/refresh", {
    method: "POST",
    skipAuthRefresh: true,
    body: JSON.stringify({ refresh_token: refreshTokenValue }),
  });
}

export function logout() {
  persistTokens(null, null);
  persistUser(null);
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

export async function createReview(payload: { companyId: string; rating: number; comment: string }) {
  return apiFetch<Review>("/reviews/create", {
    method: "POST",
    body: JSON.stringify({
      company_id: payload.companyId,
      rating: payload.rating,
      content: payload.comment,
    }),
  });
}

export async function getDashboardMetrics() {
  return apiFetch<DashboardMetrics>("/admin/dashboard/insights");
}

export async function getSuspiciousReviews() {
  return apiFetch<SuspiciousReview[]>("/admin/reviews/suspicious");
}

export async function respondToReview(reviewId: string, payload: { status: string }) {
  return apiFetch(`/admin/reviews/${reviewId}/respond`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
