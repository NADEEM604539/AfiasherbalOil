import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import HomePageClient from "./HomePageClient";
import db from "@/lib/db";

export const metadata = {
  title: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
  description: "Discover premium herbal oils & organic skincare products. Cold-pressed, 100% natural, sustainably sourced. Shop authentic oils with fast delivery across Pakistan.",
  keywords: ["herbal oil", "organic hair oil", "natural skincare", "cold-pressed oils", "Pakistan herbal products"],
  openGraph: {
    title: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
    description: "Premium quality herbal oils for hair and skin care. 100% natural, organic, and sustainably sourced.",
    type: "website",
    locale: "en_PK",
  },
};

async function fetchData() {
  try {
    // Query products directly from database
    const [products] = await db.query(
      "SELECT id, name, description, image_url, price, instock FROM products WHERE instock = 1 ORDER BY id DESC"
    );

    // Query deals directly from database (assuming there's a deals column or separate table)
    const [deals] = await db.query(
      "SELECT id, name, description, image_url, price, instock FROM products WHERE instock = 1 LIMIT 3"
    );

    // Query special reviews directly from database
    const [reviews] = await db.query(
      "SELECT id, user_name, comment, rating FROM reviews ORDER BY id DESC LIMIT 6"
    );

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

