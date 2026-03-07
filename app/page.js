import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import HomePageClient from "./HomePageClient";
import db from "@/lib/db";

export const metadata = {
  title: "Afia's Herbal & Organic Care Products | Skin, Hair & Body Oils Pakistan",
  description:
    "Shop premium herbal oils, natural skin care, hair care, body care, and organic remedies in Pakistan. 100% pure, chemical-free, cold-pressed oils and care products.",
  keywords: [
    "herbal oil", "organic hair oil", "natural skin care", "body care products",
    "cold-pressed oils", "anti hair fall", "acne treatment", "glowing skin",
    "herbal remedies", "chemical-free products", "Pakistan skincare"
  ],
  openGraph: {
    title: "Afia's Herbal & Organic Care Products | Skin, Hair & Body Oils Pakistan",
    description: "Premium herbal and organic products for skin, hair, and body care. 100% natural, cold-pressed, chemical-free, and sustainably sourced.",
    type: "website",
    locale: "en_PK",
  },
};

async function fetchData() {
  try {
    // Query all products (not deals) regardless of stock status
    const [products] = await db.query(
      "SELECT id, name, description, image_url, price, instock FROM products WHERE deal = 0 ORDER BY id DESC"
    );

    // Query all deals regardless of stock status
    const [deals] = await db.query(
      "SELECT id, name, description, image_url, price, instock FROM products WHERE deal = 1 ORDER BY id DESC"
    );

    // Query last 6 approved special reviews
    const [reviews] = await db.query(`SELECT 
    sr.id,
    u.name AS user_name,
    sr.comment,
    sr.rating
  FROM special_reviews sr
  JOIN users u ON sr.user_id = u.id
  WHERE sr.approved = TRUE
  ORDER BY sr.created_at DESC
  LIMIT 6
`);

    return {
      products: Array.isArray(products) ? products : [],
      deals: Array.isArray(deals) ? deals : [],
      reviews: Array.isArray(reviews) ? reviews : [],
    };
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return { products: [], deals: [], reviews: [] };
  }
}

export default async function Home() {
  const { products, deals, reviews } = await fetchData();


  return (
    <div>
      <Navbar />
      <HomePageClient initialProducts={products} initialDeals={deals} initialReviews={reviews} />
    </div>
  );
}

