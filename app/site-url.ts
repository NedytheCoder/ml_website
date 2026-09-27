// Absolute site URL for the sitemap, robots file and link previews.
// Set SITE_URL once the custom domain is live; until then Vercel's
// production URL is used, and localhost in development.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
