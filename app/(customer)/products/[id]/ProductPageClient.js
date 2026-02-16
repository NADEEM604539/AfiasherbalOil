"use client"
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";

export default function ProductPageClient({ initialProduct, initialReviews }) {
  const { isSignedIn } = useUser();
  const [product] = useState(initialProduct);
  const [reviews] = useState(initialReviews);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323] text-gray-100 relative overflow-hidden">
        {/* glowing background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

        <Link href="/" className="relative z-10 text-green-300 hover:underline">
          ← Back to products
        </Link>

        <div className="relative z-10 mt-6 grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-green-900/30 bg-[#1B2F20]/70 backdrop-blur-sm">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-green-100">{product.name}</h1>
            {product.instock ? (
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span className="text-green-400 font-semibold tracking-wide">
                  In Stock
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#f87171]" />
                <span className="text-red-400 font-semibold tracking-wide">
                  Out of Stock
                </span>
              </div>
            )}

            <p className="mt-3 text-2xl text-green-300 font-semibold">
              Rs {Number(product.price).toFixed(2)}
            </p>
            <p className="mt-4 text-green-200 leading-relaxed">{product.description}</p>
            {product.instock === 1 &&
              <AddToCartForm productId={product.id} />
            }
            {product.instock === 0 &&
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                disabled
              >
                Out of Stock
              </button>
            }

            {/* Reviews */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-green-100">Reviews</h2>
              <div className="mt-4 space-y-4">
                {reviews.length === 0 && (
                  <p className="text-green-300">No reviews yet.</p>
                )}
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-[#223528]/80 border border-[#2C4A35] rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="text-yellow-400 text-lg">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </div>
                    <p className="mt-2 text-green-200">{r.comment}</p>
                    <p className="mt-1 text-sm text-green-400">By {r.user_name || "Anonymous"}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-green-100">
                  Add a Review
                </h3>
                <ReviewForm productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useCart } from "@/lib/CartContext";

function AddToCartForm({ productId }) {
  const { isSignedIn } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { refreshCartCount } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (typeof window !== 'undefined') {
        window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: parseInt(quantity) })
      });

      if (!res.ok) {
        setMessage("Failed to add to cart. Please try again.");
        return;
      }

      setMessage("✓ Added to cart!");
      setQuantity(1);
      // Sync Navbar
      refreshCartCount();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-3 items-center flex-wrap">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-24 border border-green-700 rounded-lg px-3 py-2 bg-[#0F1C13] text-green-200 focus:outline-none focus:border-green-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {message && (
        <span className={`text-sm font-semibold ${message.includes("✓") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </span>
      )}
    </form>
  );
}

function ReviewForm({ productId }) {
  const { isSignedIn } = useUser();
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (typeof window !== 'undefined') {
        window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          rating: parseInt(rating),
          comment: comment || null
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.error || "Failed to add review.");
        return;
      }

      setMessage("✓ Review added successfully!");
      setRating("5");
      setComment("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error submitting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-3 max-w-md">
      <label className="text-sm text-green-300">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border border-green-700 rounded-lg px-3 py-2 bg-[#0F1C13] text-green-200"
      >
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </select>

      <label className="text-sm text-green-300">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="3"
        className="border border-green-700 rounded-lg px-3 py-2 bg-[#0F1C13] text-green-200"
        placeholder="Share your experience"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
      {message && (
        <span className={`text-sm font-semibold ${message.includes("✓") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </span>
      )}
    </form>
  );
}
