const hopByHopHeaders = new Set([
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

const getProxyBaseUrl = () => {
  const value = process.env.API_PROXY_URL || process.env.VITE_API_URL || '';
  return value.trim().replace(/\/+$/, '');
};

const normalizeBody = (body, headers) => {
  if (body == null) {
    return undefined;
  }

  if (Buffer.isBuffer(body) || typeof body === 'string') {
    return body;
  }

  const contentType = headers['content-type'] || headers['Content-Type'] || '';

  if (contentType.includes('application/json')) {
    return JSON.stringify(body);
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return new URLSearchParams(body).toString();
  }

  return JSON.stringify(body);
};

const buildUpstreamUrl = (req) => {
  const proxyBaseUrl = getProxyBaseUrl();

  if (!proxyBaseUrl) {
    return null;
  }

  const upstreamUrl = new URL(proxyBaseUrl);
  const rawPath = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path || '';
  const normalizedPath = String(rawPath).replace(/^\/+/, '');

  upstreamUrl.pathname = `/api/${normalizedPath}`;

  Object.entries(req.query).forEach(([key, value]) => {
    if (key === 'path' || value == null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => upstreamUrl.searchParams.append(key, item));
      return;
    }

    upstreamUrl.searchParams.set(key, String(value));
  });

  return upstreamUrl;
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const upstreamUrl = buildUpstreamUrl(req);

  if (!upstreamUrl) {
    return res.status(500).json({
      message: 'API proxy is not configured. Set API_PROXY_URL in Vercel.',
    });
  }

  const headers = {};

  Object.entries(req.headers).forEach(([key, value]) => {
    if (!value || hopByHopHeaders.has(key.toLowerCase())) {
      return;
    }

    headers[key] = Array.isArray(value) ? value.join(', ') : value;
  });

  const init = {
    method: req.method,
    headers,
    redirect: 'manual',
  };

  if (req.method && !['GET', 'HEAD'].includes(req.method.toUpperCase())) {
    init.body = normalizeBody(req.body, req.headers);
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, init);

    upstreamResponse.headers.forEach((value, key) => {
      if (!hopByHopHeaders.has(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const responseBuffer = Buffer.from(await upstreamResponse.arrayBuffer());
    return res.status(upstreamResponse.status).send(responseBuffer);
  } catch (error) {
    console.error('API proxy request failed:', error);
    return res.status(502).json({
      message: 'Failed to reach upstream API server.',
    });
  }
}
