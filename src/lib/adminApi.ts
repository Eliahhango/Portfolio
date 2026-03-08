const apiBaseUrl = import.meta.env.VITE_API_URL || '';

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};

export const createSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const readJsonResponse = async <T>(response: Response): Promise<T> => {
  const raw = await response.text();
  let parsed: unknown = null;

  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }
  }

  if (!response.ok) {
    const message = typeof parsed === 'object' && parsed && 'message' in parsed && typeof parsed.message === 'string'
      ? parsed.message
      : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return parsed as T;
};

export const adminFetch = async <T>(path: string, token: string, init: RequestInit = {}) => {
  const headers = new Headers(init.headers);

  if (!(init.body instanceof FormData) && init.method && init.method !== 'GET' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
  });

  return readJsonResponse<T>(response);
};
