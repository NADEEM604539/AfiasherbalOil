export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/about'],
      disallow: ['/api/', '/sign-in', '/sign-up', '/checkout', '/cart', '/orders'],
    },
    sitemap: 'https://www.afias.pk/sitemap.xml',
  }
}
