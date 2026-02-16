export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/sign-in', '/sign-up', '/checkout'],
    },
    sitemap: 'https://afiasherbaloil.com/sitemap.xml',
  }
}
