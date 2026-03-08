const rawApiBaseUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

export const apiConfigurationErrorMessage =
  'VITE_API_URL is not configured. Set it to your backend URL.';

export const isApiConfigured = rawApiBaseUrl.length > 0;

export const buildApiUrl = (path: string) => {
  if (!isApiConfigured) {
    throw new Error(apiConfigurationErrorMessage);
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${rawApiBaseUrl}${normalizedPath}`;
};

