export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sign-in', '/sign-up', '/checkout'],
    },
    sitemap: 'https://www.afias.pk/sitemap.xml',
  }
}
