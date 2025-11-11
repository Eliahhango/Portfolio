// This file is a placeholder to keep TypeScript projects happy.
// The actual build-time script is generate-sitemap.mjs (plain Node ESM).
export {};

const BASE_URL = process.env.SITE_URL || 'https://www.elitechwiz.site';

// Add routes you want indexed here. Dynamic routes can be listed as needed.
const routes: string[] = [
  '/',
  '/projects',
  '/services',
  '/contact',
  '/admin' // exclude later if needed by robots rules
];

function generateUrl(loc: string): string {
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
  const outDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml.trim() + '\n', 'utf8');
  console.log('Sitemap written to public/sitemap.xml');
}

buildSitemap();


