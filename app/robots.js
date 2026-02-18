export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sign-in', '/sign-up', '/checkout'],
    },
    sitemap: 'https://afias.pk/sitemap.xml',
  }
}
