"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Search } from "lucide-react";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [dat, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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
        setFilteredProducts(productsData);
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

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);


  return (
    <div>
      <Navbar />
      <div className="min-h-screen font-sans bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817]">

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF2E1] via-[#FAE8D0] to-[#F5DCC3] opacity-90" />
          
          <div className="relative z-10 mx-auto px-6 py-10 text-center max-w-5xl">
            {/* Centered Logo Image */}
            <div className="relative flex items-center justify-center mb-8">
              <Image
                src="/logo.jpg"
                alt="Brand Logo"
                width={224}
                height={224}
                className="rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-[#102C26] drop-shadow-lg uppercase tracking-wider">
              Pure Herbal & Organic Oils
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-[#6B4F2F] opacity-90 italic font-light">
              Nurturing your beauty with nature's purest essence
            </p>
            

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="#products" className="bg-gradient-to-r from-[#248D76] to-[#1A6B5F] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
                Shop Now
              </Link>
              <Link href="/chat" className="border-2 border-[#248D76] text-[#248D76] px-8 py-3 rounded-full font-semibold hover:bg-[#248D76]/10 transition-colors duration-300">
                Ask an Expert
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-16 py-16 bg-gradient-to-r from-[#E8DCC8] to-[#D9CDB5]">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard title="Cold-Pressed" subtitle="Nutrient-rich extraction for maximum benefits" />
            <FeatureCard title="100% Natural" subtitle="No mineral oils, no parabens, no chemicals" />
            <FeatureCard title="Sustainably Sourced" subtitle="Ethical farms and fair trade practices" />
          </div>
        </section>

        {/* Regular Products Section */}
        <section id="products" className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#102C26] mb-3 uppercase tracking-tight">
                Our Premium Herbal Oils
              </h2>
              <p className="text-[#6B4F2F] text-lg italic font-light">
                Carefully curated oils for your daily self-care ritual
              </p>
            {/* Search Bar */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-[#3D2817] placeholder-[#248D76] border-2 border-[#248D76] bg-[#F0F9F7] focus:outline-none focus:border-[#1A6B5F] focus:ring-2 focus:ring-[#248D76]/30 transition-all duration-300 text-lg"
                />
                <Search className="absolute right-5 w-6 h-6 text-[#248D76] pointer-events-none" />
              </div>
              {searchQuery && (
                <p className="mt-2 text-[#6B4F2F] text-sm">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            </div>

            {loading && <p className="text-center text-[#A79277] animate-pulse text-lg font-semibold">Loading products...</p>}
            {error && <p className="text-center text-red-600 font-semibold text-lg">{error}</p>}
            
            {filteredProducts.length === 0 && !loading && (
              <p className="text-center text-[#A79277] text-lg">No products found matching your search.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Subtle background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A79277]/5 to-[#6B4F2F]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-gradient-to-br from-white via-[#FDF9F3] to-[#F5E6D3] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-[#D9CDB5] hover:border-[#A79277] overflow-hidden h-full flex flex-col">

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#A79277]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Link href={`/products/${product.id}`} className="relative z-10 block h-full flex flex-col">
                      {/* Product Image */}
                      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5E6D3] to-[#E8DCC8] relative mb-5 border border-[#D9CDB5]">
                        <Image
                          src={product.image_url}
                          alt={`${product.name} - Pure Organic Herbal Oil`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
                      </div>

                      {/* Product Details */}
                      <h3 className="text-xl font-bold text-[#102C26] group-hover:text-[#1A4A42] hover:underline transition-colors duration-300 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Status Badge */}
                      <div className="mb-4">
                        {product.instock ? (
                          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] px-3 py-1.5 rounded-full border-2 border-[#102C26]">
                            <span className="inline-block w-2 h-2 bg-[#102C26] rounded-full animate-pulse" />
                            <span className="text-[#102C26] text-xs font-bold">IN STOCK</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-full border border-red-400">
                            <span className="inline-block w-2 h-2 bg-red-600 rounded-full" />
                            <span className="text-red-700 text-xs font-bold">Out of Stock</span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <p className="text-2xl font-bold text-[#248D76] mb-3 group-hover:text-[#1A6B5F] transition-colors">
                        Rs {Number(product.price).toFixed(2)}
                      </p>

                      {/* Description */}
                      <p className="text-[#3D2817] text-sm leading-relaxed line-clamp-2 group-hover:text-[#1A1410] transition-colors flex-grow">
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
        <section id="deals" className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#D9CDB5] to-[#E8DCC8]">
          <div className="relative mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-4xl">✨</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#102C26]">Special Offers & Deals</h2>
                <span className="text-4xl">✨</span>
              </div>
              <p className="text-center text-[#6B4F2F] font-semibold uppercase tracking-wider text-lg">Save on our best-selling organic oils</p>
            </div>
          </div>

          {loading && <p className="text-center text-[#A79277] animate-pulse text-lg font-semibold">Loading deals...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {deals.map((product) => (
              <div key={product.id} className="group relative">
                {/* Glow effect behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#A79277]/20 to-[#6B4F2F]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="relative bg-gradient-to-br from-[#FFE8C8] via-[#FFF2E1] to-[#F5E6D3] rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 border-3 border-[#A79277] h-full flex flex-col">

                  {/* Deal Badge */}
                  <div className="absolute -top-4 right-6 bg-gradient-to-r from-[#A79277] to-[#6B4F2F] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                    🎁 SPECIAL DEAL
                  </div>

                  <Link href={`/products/${product.id}`} className="text-[#3D2817] font-medium block flex flex-col h-full">
                    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5E6D3] to-[#E8DCC8] relative ring-2 ring-[#A79277]/40 mb-5">
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

                    <h3 className="text-lg font-bold text-[#102C26] group-hover:text-[#1A4A42] hover:underline transition-colors cursor-pointer mb-4 line-clamp-2">
                      {product.name}
                    </h3>

                    {product.instock ? (
                        <div className="flex items-center gap-2 mb-4 bg-[#D1FAE5] px-3 py-1.5 rounded-lg w-fit border-2 border-[#102C26]">
                          <span className="inline-block w-2 h-2 bg-[#102C26] rounded-full animate-pulse" />
                          <span className="text-[#102C26] text-xs font-bold">IN STOCK</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mb-4 bg-red-100 px-3 py-1.5 rounded-lg w-fit">
                        <span className="inline-block w-2 h-2 bg-red-600 rounded-full" />
                        <span className="text-red-700 text-xs font-bold">Out of Stock</span>
                      </div>
                    )}

                    <p className="text-[#248D76] text-2xl font-bold mb-3">Rs {Number(product.price).toFixed(2)}</p>
                    <p className="text-[#3D2817] text-sm line-clamp-2 flex-grow">{product.description}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {deals.length === 0 && !loading && (
            <p className="text-center text-[#A79277] text-lg mt-8 font-semibold">No deals available at the moment.</p>
          )}
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] relative overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#102C26] mb-3 uppercase tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-[#6B4F2F] mb-12 text-lg italic font-light">
              Real stories from people who love our natural products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dat.map((review) => (
                <Testimonial key={review.id} quote={review.comment} name={review.user_name} rating={review.rating} />
              ))}
            </div>
          </div>
        </section>

        {/* Chat Button */}
        <button 
          className="fixed bottom-10 right-10 bg-gradient-to-br from-[#1A6B5F] to-[#102C26] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 animate-bounce text-lg font-semibold z-40"
          onClick={() => window.location.href = "/chat"}
        >
          💬 Chat With Expert
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ title, subtitle }) {
  return (
    <div className="rounded-3xl bg-gradient-to-tr from-white to-[#FDF9F3] p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500 text-center border border-[#D9CDB5] hover:border-[#A79277]">
      <h3 className="text-2xl font-bold text-[#102C26] mb-1">{title}</h3>
      <p className="text-[#6B4F2F] text-lg">{subtitle}</p>
    </div>
  );
}

function Testimonial({ quote, name, rating }) {
  // Helper: render stars based on rating value
  const renderStars = (rating) => {
    const filled = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return (
      <span className="text-[#A79277] text-lg">
        {filled}{empty}
      </span>
    );
  };

  return (
    <div
      className="bg-gradient-to-tr from-white to-[#FDF9F3] rounded-3xl shadow-lg p-8 text-center border border-[#D9CDB5] hover:scale-105 transform transition-transform duration-500"
    >
      <p className="text-[#6B4F2F] mb-4 italic text-lg leading-relaxed">"{quote}"</p>
      <div className="mb-3">{renderStars(rating)}</div>
      <p className="font-bold text-[#3D2817] text-lg">— {name}</p>
    </div>
  );
}

