import db from "@/lib/db";

export default async function sitemap() {
  const baseUrl = 'https://afias.pk';

  // Base routes
  const routes = [
    '',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  // Product routes
  try {
    const [products] = await db.query("SELECT id, updated_at FROM products WHERE instock = 1");
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: product.updated_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
