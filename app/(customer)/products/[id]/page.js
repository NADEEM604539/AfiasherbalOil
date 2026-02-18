import db from "@/lib/db";
import ProductPageClient from "./ProductPageClient";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const [rows] = await db.query(
      "SELECT name, description, image_url, price FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return {
        title: "Product Not Found",
      };
    }

    const product = rows[0];

    return {
      title: product.name,
      description: product.description.substring(0, 160),
      openGraph: {
        title: product.name,
        description: product.description.substring(0, 160),
        images: [product.image_url],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description.substring(0, 160),
        images: [product.image_url],
      },
      alternates: {
        canonical: `/products/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Details",
    };
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  // Fetch product and reviews on the server
  let product = null;
  let reviews = [];

  try {
    const [pRows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (pRows.length > 0) {
      product = JSON.parse(JSON.stringify(pRows[0])); // Plain object for client component
    }

    const [rRows] = await db.query("SELECT * FROM reviews WHERE product_id = ?", [id]);
    reviews = JSON.parse(JSON.stringify(rRows));
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!product) {
    return <div className="px-6 md:px-16 py-10 text-red-400">Product Not Found</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'PKR',
      availability: product.instock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://www.afias.pk/products/${id}`
    },
    brand: {
      '@type': 'Brand',
      name: "Afia's Herbal Oil"
    }
  };

  // Add aggregate rating if reviews exist
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviews.length
    };
    jsonLd.review = reviews.slice(0, 5).map(r => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating
      },
      author: {
        '@type': 'Person',
        name: r.user_name || "Anonymous"
      },
      reviewBody: r.comment
    }));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient initialProduct={product} initialReviews={reviews} />
    </>
  );
}
