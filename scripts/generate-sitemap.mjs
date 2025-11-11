import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || 'https://www.elitechwiz.site';

const routes = [
  '/',
  '/projects',
  '/services',
  '/contact',
  '/blog',
  '/case-studies',
  '/booking',
  '/downloads'
];

function generateUrl(loc) {
  const escaped = loc.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return `
  <url>
    <loc>${BASE_URL}${escaped}</loc>
    <changefreq>weekly</changefreq>
    <priority>${loc === '/' ? '1.0' : '0.7'}</priority>
  </url>`;
}

function buildSitemap() {
  const urls = routes.map((r) => generateUrl(r)).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  const outDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml.trim() + '\n', 'utf8');
  console.log('Sitemap written to public/sitemap.xml');
}

buildSitemap();


