"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [dat, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const [productsRes, dealsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/deals"),
        ]);

        const [productsData, dealsData] = await Promise.all([
          productsRes.json(),
          dealsRes.json(),
        ]);

        setProducts(productsData);
        setDeals(dealsData);
      } catch (err) {
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/special_reviews");
        const data = await res.json();
        setData(Array.isArray(data) ? data : []);
      } catch (err) {
        setData([]);
      }
    };

    fetchMainData();   // High priority
    fetchReviews();    // Lower priority
  }, []);


  return (
    <div>
      <Navbar />
      <div className="min-h-screen font-sans bg-gradient-to-b from-[#0E1D13] via-[#1A2E1B] to-[#2E3E2A] text-gray-100">

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#132214] via-[#1F3C28] to-[#2C4D37] opacity-95" />
          <svg className="absolute -bottom-10 left-0 w-[140%] h-48 text-[#3C5F40] opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,64L60,90.7C120,117,240,171,360,192C480,213,600,203,720,186.7C840,171,960,149,1080,144C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
          <div className="relative z-10 mx-auto px-6 py-21 text-center max-w-5xl">
            {/* Centered Logo Image */}

            <div className="relative flex items-center justify-center">
              <Image
                src="/logo.jpg"       // use .webp or .png, not .ico
                alt="Brand Logo"
                width={224}            // same as Tailwind w-56
                height={224}           // same as Tailwind h-56
                className="rounded-full shadow-2xl animate-float"
                priority               // loads immediately
              />
            </div>

            <h1 className="mt-4 text-2xl md:text-3xl font-bold text-green-100 drop-shadow-sm uppercase tracking-wider">Pure Herbal & Organic Oils for Hair and Skin</h1>
            <p className="mt-2 text-lg md:text-xl text-green-200 opacity-90 italic">Nurturing your beauty with nature's purest essence.</p>
            <div className="mt-10 flex items-center justify-center gap-5">
              <Link href="#products" className="bg-gradient-to-r from-[#FFD580] to-[#FFC857] text-[#2E1F1A] px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">Shop Now</Link>
              <Link href="/chat" className="border border-gray-300 text-gray-100 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">Ask an Expert</Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-16 py-20 bg-[#1B2F20]">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard title="Cold-Pressed" subtitle="Nutrient-rich extraction" />
            <FeatureCard title="100% Natural" subtitle="No mineral oils, no parabens" />
            <FeatureCard title="Sustainably Sourced" subtitle="Ethical farms and fair trade" />
          </div>
        </section>

        {/* Regular Products Section */}
        <section id="products" className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#13221F] via-[#1A2F22] to-[#13221F]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#BCE2B0] mb-3 uppercase tracking-tight">Our Premium Herbal Oils</h2>
              <p className="text-green-300 text-lg italic">Carefully curated oils for your daily self-care ritual.</p>
            </div>

            {loading && <p className="text-center text-green-300 animate-pulse">Loading products...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Subtle background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-gradient-to-br from-[#1B2F20] via-[#162318] to-[#0F1C13] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-[#2C4A35] hover:border-[#3C5F40] overflow-hidden h-full">

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-600/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Link href={`/products/${product.id}`} className="relative z-10 block h-full flex flex-col">
                      {/* Product Image */}
                      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1C13] to-[#0A0F0D] relative mb-5">
                        <Image
                          src={product.image_url}
                          alt={`${product.name} - Pure Organic Herbal Oil`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                      </div>

                      {/* Product Details */}
                      <h3 className="text-lg font-bold text-[#A6D787] group-hover:text-[#BCE2B0] hover:underline transition-colors duration-300 mb-2">
                        {product.name}
                      </h3>

                      {/* Status Badge */}
                      <div className="mb-4">
                        {product.instock ? (
                          <div className="inline-flex items-center gap-2 bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-600/40">
                            <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-emerald-300 text-xs font-semibold">In Stock</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 bg-red-900/30 px-3 py-1.5 rounded-full border border-red-600/40">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-red-400 text-xs font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <p className="text-2xl font-bold text-[#81C784] mb-3 group-hover:text-[#A6D787] transition-colors">
                        Rs {Number(product.price).toFixed(2)}
                      </p>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors flex-grow">
                        {product.description}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deals Section - Special Styling */}
        <section id="deals" className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#13221F] via-[#1A2F22] to-[#13221F]">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD580]/10 via-transparent to-[#FFD580]/10 rounded-lg blur-xl" />
            <div className="relative">
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl">✨</span>
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD580] to-[#FFC857]">Special Offers & Deals</h2>
                <span className="text-3xl">✨</span>
              </div>
              <p className="text-center text-[#FFD580] mt-3 font-semibold uppercase tracking-wider">Save on our best-selling organic oils</p>
            </div>
          </div>

          {loading && <p className="text-center text-[#FFD580] animate-pulse">Loading deals...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {deals.map((product) => (
              <div key={product.id} className="group relative">
                {/* Glow effect behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD580]/20 to-[#FFC857]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="relative bg-gradient-to-br from-[#2A3D2F] via-[#1E3A28] to-[#1A2E1F] rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 border-2 border-[#FFD580]/50 h-full flex flex-col">

                  {/* Deal Badge */}
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-[#FFD580] to-[#FFC857] text-[#2E1F1A] px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                    🎁 SPECIAL DEAL
                  </div>

                  <Link href={`/products/${product.id}`} className="text-[#BCE2B0] font-medium block flex flex-col h-full">
                    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A2E1B] to-[#0F1C13] relative ring-2 ring-[#FFD580]/30 mb-5">
                      <Image
                        src={product.image_url}
                        alt={`${product.name} - Discounted Herbal Oil`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-12" />
                    </div>

                    <h3 className="text-lg font-bold text-[#FFD580] group-hover:text-[#FFEB3B] hover:underline transition-colors cursor-pointer mb-4">{product.name}</h3>

                    {product.instock ? (
                      <div className="flex items-center gap-2 mb-4 bg-green-600/20 px-3 py-1.5 rounded-lg w-fit">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-xs font-semibold">In Stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mb-4 bg-red-600/20 px-3 py-1.5 rounded-lg w-fit">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-red-400 text-xs font-semibold">Out of Stock</span>
                      </div>
                    )}

                    <p className="text-[#FFD580] text-xl font-bold mb-3">Rs {Number(product.price).toFixed(2)}</p>
                    <p className="text-gray-300 text-sm line-clamp-2 flex-grow">{product.description}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {deals.length === 0 && !loading && (
            <p className="text-center text-[#FFD580] text-lg mt-8">No deals available at the moment.</p>
          )}
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 md:px-16 bg-[#1A2F22] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#13221F] via-[#1A2F22] to-[#1E3A28] opacity-90" />

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#A6D787] mb-6">
              What Our Customers Say
            </h2>
            <p className="text-green-300 mb-12 text-lg">
              Real stories from people who love our natural products.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dat.map((review) => (
                <Testimonial key={review.id} quote={review.comment} name={review.user_name} rating={review.rating} />
              ))}
            </div>
          </div>

          {/* Optional decorative background wave */}
          <svg className="absolute bottom-0 left-0 w-full h-20 text-[#3C5F40] opacity-25" viewBox="0 0 1440 320">
            <path fill="currentColor" d="M0,64L60,85.3C120,107,240,149,360,181.3C480,213,600,235,720,224C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </section>


        {/* Chat Button */}
        <button className="fixed bottom-10 right-10 bg-gradient-to-br from-[#2E4D36] to-[#1B2F20] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 animate-bounce" onClick={() => window.location.href = "/chat"}>
          Chat With Expert
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ title, subtitle }) {
  return (
    <div className="rounded-3xl bg-gradient-to-tr from-[#1F3C28] to-[#356836] p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500 text-center">
      <h3 className="text-xl font-bold text-[#DCE8D9]">{title}</h3>
      <p className="text-green-300 mt-2">{subtitle}</p>
    </div>
  );
}

function Testimonial({ quote, name, rating }) {
  // Helper: render stars based on rating value
  const renderStars = (rating) => {
    const filled = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return (
      <span className="text-[#FFD580] text-lg">
        {filled}{empty}
      </span>
    );
  };

  return (
    <div
      className="bg-gradient-to-tr from-[#13221F] to-[#1E3A28]
      rounded-3xl shadow-2xl p-8 text-center border border-[#3C5F40]
      hover:scale-105 transform transition-transform duration-500"
    >
      <p className="text-green-300 mb-4 italic">{quote}</p>
      <div className="mb-3">{renderStars(rating)}</div>
      <p className="font-bold text-[#BCE2B0]">— {name}</p>
    </div>
  );
}

