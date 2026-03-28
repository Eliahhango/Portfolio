import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

type AdminRole = 'main' | 'admin';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    role: AdminRole;
  };
}

const parseCsv = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }
  return value
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);
};

const getAdminTokens = (): string[] => {
  const fromSingle = process.env.ADMIN_API_TOKEN ? [process.env.ADMIN_API_TOKEN.trim()] : [];
  const fromList = parseCsv(process.env.ADMIN_API_TOKENS);
  return Array.from(new Set([...fromSingle, ...fromList]));
};

const getMainAdminTokens = (fallbackToken: string): string[] => {
  const fromSingle = process.env.MAIN_ADMIN_API_TOKEN ? [process.env.MAIN_ADMIN_API_TOKEN.trim()] : [];
  const fromList = parseCsv(process.env.MAIN_ADMIN_API_TOKENS);
  const combined = Array.from(new Set([...fromSingle, ...fromList]));
  return combined.length > 0 ? combined : [fallbackToken];
};

const parseBearerToken = (authorizationHeader: string | undefined): string | null => {
  if (!authorizationHeader) {
    return null;
  }
  const [scheme, token] = authorizationHeader.split(' ');
  if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
    return null;
  }
  return token.trim();
};

const safeCompare = (expected: string, provided: string): boolean => {
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
};

const obfuscatedAdminId = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex').slice(0, 24);
};

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const configuredTokens = getAdminTokens();
  if (configuredTokens.length === 0) {
    res.status(503).json({
      message: 'Admin authentication is not configured on the server.',
    });
    return;
  }

  const token = parseBearerToken(req.headers.authorization);
  if (!token) {
    res.status(401).json({ message: 'Authorization token is required.' });
    return;
  }

  const matchedToken = configuredTokens.find((configuredToken) => safeCompare(configuredToken, token));
  if (!matchedToken) {
    res.status(401).json({ message: 'Invalid or expired token.' });
    return;
  }

  const mainAdminTokens = getMainAdminTokens(configuredTokens[0]);
  const isMainAdmin = mainAdminTokens.some((configuredToken) => safeCompare(configuredToken, matchedToken));

  req.admin = {
    id: obfuscatedAdminId(matchedToken),
    role: isMainAdmin ? 'main' : 'admin',
  };

  next();
};

export const requireMainAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.admin) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }

  if (req.admin.role !== 'main') {
    res.status(403).json({ message: 'Main admin access required.' });
    return;
  }

  next();
};
