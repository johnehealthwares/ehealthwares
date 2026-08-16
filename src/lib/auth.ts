export const ACCESS_TOKEN_KEY = 'rxsoft_admin_access_token';
export const REFRESH_TOKEN_KEY = 'rxsoft_admin_refresh_token';
export const AUTH_CHANGE_EVENT = 'rxsoft:auth-change';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  roles: string[];
}

export function storeTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function decodeUserFromAccessToken(accessToken: string): AuthUser | null {
  try {
    const payloadRaw = accessToken.split('.')[1] ?? '';
    const payload = JSON.parse(atob(payloadRaw)) as {
      sub?: string;
      username?: string;
      email?: string;
      phone?: string;
      roles?: string[];
      exp?: number;
    };
    if (!payload.sub || !payload.username) return null;
    if (payload.exp && payload.exp * 1000 <= Date.now()) return null;
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email ?? '',
      phone: payload.phone ?? '',
      roles: payload.roles ?? [],
    };
  } catch {
    return null;
  }
}

export function getCurrentUser(): AuthUser | null {
  const token = getAccessToken();
  return token ? decodeUserFromAccessToken(token) : null;
}