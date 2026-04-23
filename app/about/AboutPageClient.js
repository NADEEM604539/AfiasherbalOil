"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Leaf, ShieldCheck, Heart } from "lucide-react";

export default function AboutPageClient() {
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative bg-teal-900 text-white py-24 px-6 md:px-12 lg:px-24 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1608248543803-b0e6c5ee0037?q=80&w=2000&auto=format&fit=crop"
            alt="Herbal background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Our Rooted Journey
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto">
            From a humble home kitchen to a trusted name in natural wellness, discover the heart and soul behind Afia's Herbal Oil.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* The Story Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1547489432-8dfc384e5c54?q=80&w=1200&auto=format&fit=crop"
              alt="Making natural oils"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900">
              How It All Began
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Afia's Herbal Oil was born out of a simple need: a mother's desire to find a truly natural, chemical-free solution for her family's hair and skin care. Frustrated by the countless products filled with artificial additives, our founder, Afia, started producing her own blends using ancient recipes passed down through generations.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              What started as a small remedy for friends and family quickly blossomed. Word spread about the remarkable results of her pure, cold-pressed oils. Today, we remain committed to that original vision: providing honest, organic, and effective care products without compromise.
            </p>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 italic">
              "To empower individuals to embrace their natural beauty through pure, ethically sourced, and handcrafted herbal solutions."
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8 text-green-600" />,
                title: "100% Organic",
                description: "We source only the finest, naturally grown ingredients. No synthetics, ever."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
                title: "Cold-Pressed Purity",
                description: "Our extraction process ensures all essential nutrients remain intact."
              },
              {
                icon: <Heart className="w-8 h-8 text-rose-500" />,
                title: "Cruelty Free",
                description: "We love animals. Our products are never tested on them."
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Sustainably Sourced",
                description: "We work directly with local farmers to ensure fair trade and eco-friendly practices."
              }
            ].map((value, index) => (
              <div key={index} className="text-center space-y-4 p-6 bg-gray-50 rounded-2xl hover:bg-teal-50 transition-colors duration-300">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-teal-800 text-white rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1556228578-8d89b6acd8d4?q=80&w=2000&auto=format&fit=crop"
              alt="Leaf pattern"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Experience the Purity
            </h2>
            <p className="text-lg md:text-xl text-teal-100">
              Ready to transform your self-care routine? Explore our collection of lovingly crafted oils.
            </p>
            <div className="pt-4">
              <Link 
                href="/#products" 
                className="inline-block bg-white text-teal-900 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-transform transform hover:scale-105 shadow-lg"
              >
                Shop Our Collection
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
