import { NEIGHBORHOODS, CITIES } from './constants';

export const prerenderRoutes = [
  '/',
  '/sitemap',
  ...NEIGHBORHOODS.map(n => `/bairro/${encodeURIComponent(n)}`),
  ...CITIES.map(c => `/cidade/${encodeURIComponent(c)}`)
];

export const generateSitemapXML = (baseUrl: string): string => {
  const urls = prerenderRoutes.map(route => {
    const priority = route === '/' ? '1.0' : route === '/sitemap' ? '0.8' : '0.7';
    const changefreq = route === '/' ? 'weekly' : 'monthly';
    
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
};
