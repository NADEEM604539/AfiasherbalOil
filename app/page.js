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
    // Fetch products
    const response = await fetch("http://localhost:3000/api/products", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const products = await response.json();

    // Fetch deals
    const dealsResponse = await fetch("http://localhost:3000/api/deals", {
      next: { revalidate: 3600 },
    });
    const deals = await dealsResponse.json();

    // Fetch reviews
    const reviewResponse = await fetch("http://localhost:3000/api/special_reviews", {
      next: { revalidate: 3600 },
    });
    const reviews = await reviewResponse.json();

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

