"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function HomePageClient({ initialProducts, initialDeals, initialReviews }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, initialProducts]);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#F0E6D2] via-[#E8DCC8] to-[#DFD0B8] text-[#3D2817]">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF2E1] via-[#FAE8D0] to-[#F5DCC3] opacity-90" />
        
        <div className="relative z-10 mx-auto px-6 py-10 text-center max-w-5xl">
          {/* Centered Logo Image */}
          <div className="relative flex items-center justify-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Afias Logo"
              width={224}
              height={224}
              className="rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-[#102C26] drop-shadow-lg uppercase tracking-wider">
            Pure Herbal Oils
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-[#6B4F2F] opacity-90 italic font-light">
            Nature's gift for health, beauty, and wellness
          </p>
          

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="#products" className="bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              Shop Now
            </Link>
            <Link href="/chat" className="border-2 border-[#1a4d42] text-[#1a4d42] px-8 py-3 rounded-full font-semibold hover:bg-[#1a4d42]/10 transition-colors duration-300">
              Get Expert Advice
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-16 bg-gradient-to-r from-[#D9CDB5] to-[#CAC1A0]">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard title="100% Pure & Natural" subtitle="No additives, preservatives, or synthetic chemicals" />
          <FeatureCard title="Cold-Pressed" subtitle="Extracted at low temperatures to preserve nutrients" />
          <FeatureCard title="Organic Sourced" subtitle="Sustainably harvested from premium sources" />
        </div>
      </section>

      {/* Regular Products Section */}
      <section id="products" className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#F0E6D2] via-[#E8DCC8] to-[#DFD0B8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#102C26] mb-3 uppercase tracking-tight">
              Our Premium Collection
            </h2>
            <p className="text-[#6B4F2F] text-lg italic font-light">
              Handpicked herbal oils for health, beauty, and daily wellness
            </p>
          {/* Search Bar */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for oils, benefits, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-[#3D2817] placeholder-[#1a4d42] border-2 border-[#1a4d42] bg-[#F0F9F7] focus:outline-none focus:border-[#0d3a33] focus:ring-2 focus:ring-[#1a4d42]/30 transition-all duration-300 text-lg"
              />
              <Search className="absolute right-5 w-6 h-6 text-[#1a4d42] pointer-events-none" />
            </div>
            {searchQuery && (
              <p className="mt-2 text-[#6B4F2F] text-sm">
                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          </div>
          
          {filteredProducts.length === 0 && (
            <p className="text-center text-[#A79277] text-lg">No products found matching your search.</p>
          )}

          {/* 4-Column Responsive Grid with Center Alignment */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <div className="w-full max-w-xs">
                    <ProductCard product={product} isDeal={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prominent View All Products Button */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Deals Section - Special Styling */}
      <section id="deals" className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#CAC1A0] to-[#D9CDB5]">
        <div className="relative mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="text-4xl">✨</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#102C26]">Limited Time Offers</h2>
              <span className="text-4xl">✨</span>
            </div>
            <p className="text-center text-[#6B4F2F] font-semibold uppercase tracking-wider text-lg">Exclusive deals on our premium herbal oils</p>
          </div>
        </div>

        {initialDeals.length === 0 ? (
          <p className="text-center text-[#A79277] text-lg font-semibold">No deals available at the moment.</p>
        ) : (
          <>
            {/* 3-Column Grid Centered for Deals */}
            <div className="flex justify-center mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {initialDeals.map((product) => (
                  <div key={product.id} className="flex justify-center">
                    <div className="w-full max-w-xs">
                      <ProductCard product={product} isDeal={true} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent View All Products Button */}
            <div className="text-center">
              <Link
                href="/products?deals=deals"
                className="inline-block bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider"
              >
                Explore All Deals →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#F0E6D2] via-[#E8DCC8] to-[#DFD0B8] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#102C26] mb-3 uppercase tracking-tight">
            What Our Customers Love
          </h2>
          <p className="text-[#6B4F2F] mb-12 text-lg italic font-light">
            Real reviews from people who trust Afias for pure herbal wellness
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialReviews.map((review) => (
              <Testimonial key={review.id} quote={review.comment} name={review.user_name} rating={review.rating} />
            ))}
          </div>
        </div>
      </section>

      {/* About Afias Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#DFD0B8] to-[#D0C4A0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#102C26] mb-6">About Afias Pure Oils</h2>
              <p className="text-[#6B4F2F] text-lg leading-relaxed mb-4">
                Welcome to Afias, where nature's healing power meets modern wellness. We believe that pure, organic herbal oils are nature's gift for achieving true health and beauty naturally.
              </p>
              <p className="text-[#6B4F2F] text-lg leading-relaxed mb-6">
                Our carefully curated collection features premium cold-pressed oils, aromatic essences, and traditional herbal remedies sourced from the finest organic farms. Each product is selected for its exceptional purity, potency, and the wellness benefits it brings to your life.
              </p>
              <Link href="/about" className="inline-block bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Learn More About Afias →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-white via-[#FDF9F3] to-[#F5E6D3] rounded-3xl p-8 border-2 border-[#D9CDB5] shadow-xl">
              <h3 className="text-2xl font-bold text-[#102C26] mb-6">Why Choose Afias?</h3>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <span className="text-3xl text-[#1a4d42] font-bold flex-shrink-0">✓</span>
                  <div>
                    <h4 className="font-bold text-[#102C26] mb-1">100% Pure & Natural</h4>
                    <p className="text-[#6B4F2F]">No additives, fillers, or chemical preservatives in any product</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-3xl text-[#1a4d42] font-bold flex-shrink-0">✓</span>
                  <div>
                    <h4 className="font-bold text-[#102C26] mb-1">Cold-Pressed Methods</h4>
                    <p className="text-[#6B4F2F]">Preserves nutrients and therapeutic benefits</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-3xl text-[#1a4d42] font-bold flex-shrink-0">✓</span>
                  <div>
                    <h4 className="font-bold text-[#102C26] mb-1">Affordable Wellness</h4>
                    <p className="text-[#6B4F2F]">Premium quality organic oils at accessible prices</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-3xl text-[#1a4d42] font-bold flex-shrink-0">✓</span>
                  <div>
                    <h4 className="font-bold text-[#102C26] mb-1">Fast Shipping</h4>
                    <p className="text-[#6B4F2F]">Quick and reliable delivery across Pakistan</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#F0E6D2] via-[#E8DCC8] to-[#DFD0B8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#102C26] mb-4 text-center uppercase tracking-tight">How It Works</h2>
          <p className="text-[#6B4F2F] text-center text-lg mb-12 italic font-light">Get your pure herbal oils in just 4 easy steps</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <StepCard step={1} title="Browse" description="Explore our premium collection of pure herbal oils and remedies" />
            <StepCard step={2} title="Select" description="Choose your favorite oils, quantity, and add items to cart" />
            <StepCard step={3} title="Checkout" description="Secure payment with multiple payment options available" />
            <StepCard step={4} title="Enjoy" description="Receive your order and experience the power of pure nature" />
          </div>
        </div>
      </section>

      {/* Collections Category Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#CAC1A0] to-[#D9CDB5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#102C26] mb-4 text-center uppercase tracking-tight">Explore Our Collections</h2>
          <p className="text-[#6B4F2F] text-center text-lg mb-12 italic font-light">Find the perfect oil for your wellness needs</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CategoryCard title="Hair & Scalp Care" description="Nourish and strengthen with our premium hair oils" icon="💇" />
            <CategoryCard title="Skin & Beauty" description="Rejuvenate your skin with our natural beauty oils" icon="✨" />
            <CategoryCard title="Health & Wellness" description="Support your wellness journey with therapeutic oils" icon="🌿" />
          </div>
        </div>
      </section>

      {/* Chat Button */}
      <button 
        className="fixed bottom-10 right-10 bg-gradient-to-br from-[#0d3a33] to-[#051f1a] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 animate-bounce text-lg font-semibold z-40"
        onClick={() => window.location.href = "/chat"}
      >
        💬 Chat With Expert
      </button>
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

function ProductCard({ product, isDeal }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 h-full flex flex-col ${isDeal ? 'border-3 border-[#A79277] bg-gradient-to-br from-[#FFE8C8] via-[#FFF2E1] to-[#F5E6D3]' : 'border border-[#D9CDB5] bg-gradient-to-br from-white via-[#FDF9F3] to-[#F5E6D3]'} shadow-lg hover:shadow-2xl group`}>
      {isDeal && (
        <div className="absolute -top-4 right-6 bg-gradient-to-r from-[#A79277] to-[#6B4F2F] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
          🎁 DEAL
        </div>
      )}
      
      <Link href={`/products/${product.id}`} className="block flex-1 flex flex-col p-6">
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5E6D3] to-[#E8DCC8] relative mb-5 border border-[#D9CDB5] flex items-center justify-center">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="text-center text-[#A79277]">
              <div className="text-5xl mb-2">🌿</div>
              <p className="text-sm font-semibold">No image available</p>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#102C26] group-hover:text-[#1A4A42] hover:underline transition-colors mb-2 line-clamp-2">
          {product.name}
        </h3>

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

        <p className="text-2xl font-bold text-[#1a4d42] mb-3">
          Rs {Number(product.price).toFixed(2)}
        </p>

        <p className="text-[#3D2817] text-sm leading-relaxed line-clamp-2 flex-grow">
          {product.description}
        </p>
      </Link>
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

function StepCard({ step, title, description }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl p-8 text-center border-2 border-[#D9CDB5] hover:border-[#1a4d42] shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
          {step}
        </div>
        <h3 className="text-2xl font-bold text-[#102C26] mb-3 mt-4">{title}</h3>
        <p className="text-[#6B4F2F] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CategoryCard({ title, description, icon }) {
  return (
    <div className="bg-gradient-to-br from-white to-[#FDF9F3] rounded-3xl p-10 text-center border-2 border-[#D9CDB5] hover:border-[#1a4d42] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-[#102C26] mb-3">{title}</h3>
      <p className="text-[#6B4F2F] text-lg leading-relaxed">{description}</p>
    </div>
  );
}
