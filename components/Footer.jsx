import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#102C26] to-[#0F1F1A] border-t-4 border-[#F7E7CE] relative overflow-hidden" style={{ zIndex: 5 }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7E7CE] rounded-full blur-3xl opacity-5 -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A79277] rounded-full blur-3xl opacity-5 -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-4 gap-12 text-[#F7E7CE] relative z-10">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-black text-[#FFF2E1] mb-4 uppercase">Afia&apos;s</h3>
          <p className="text-[#F7E7CE] text-sm leading-relaxed font-semibold">
            Pure, natural and organic oils for hair, skin, and wellness. Sustainably sourced, 
            carefully crafted, and made with love for your self-care rituals.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="https://www.facebook.com/share/1KJrchaFDp/" target="_blank" className="bg-[#F7E7CE]/10 hover:bg-[#F7E7CE]/20 border-2 border-[#F7E7CE] text-[#FFF2E1] p-3 rounded-full transition-all duration-300 hover:scale-110">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/made.byafia?igsh=MWhrdnpzazdzMGV1dQ==" target="_blank" className="bg-[#F7E7CE]/10 hover:bg-[#F7E7CE]/20 border-2 border-[#F7E7CE] text-[#FFF2E1] p-3 rounded-full transition-all duration-300 hover:scale-110">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black text-[#FFF2E1] mb-4 text-lg uppercase">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="text-[#F7E7CE] hover:text-[#FFF2E1] font-semibold transition duration-300 hover:underline">Home</Link></li>
            <li><Link href="/#products" className="text-[#F7E7CE] hover:text-[#FFF2E1] font-semibold transition duration-300 hover:underline">Shop Products</Link></li>
            <li><Link href="/#deals" className="text-[#F7E7CE] hover:text-[#FFF2E1] font-semibold transition duration-300 hover:underline">Special Deals</Link></li>
            <li><Link href="/orders" className="text-[#F7E7CE] hover:text-[#FFF2E1] font-semibold transition duration-300 hover:underline">My Orders</Link></li>
            <li><Link href="/chat" className="text-[#F7E7CE] hover:text-[#FFF2E1] font-semibold transition duration-300 hover:underline">Chat Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-black text-[#FFF2E1] mb-4 text-lg uppercase">Contact Us</h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#FFF2E1] flex-shrink-0 mt-1" /> 
              <div>
                <p className="text-[#FFF2E1] font-bold">Phone</p>
                <a href="tel:+923336419935" className="text-[#F7E7CE] hover:text-[#FFF2E1] transition font-semibold">+92 333 6419935</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#FFF2E1] flex-shrink-0 mt-1" /> 
              <div>
                <p className="text-[#FFF2E1] font-bold">Email</p>
                <a href="mailto:abidamansoora016@gmail.com" className="text-[#F7E7CE] hover:text-[#FFF2E1] transition font-semibold">abidamansoora016@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#FFF2E1] flex-shrink-0 mt-1" /> 
              <div>
                <p className="text-[#FFF2E1] font-bold">Location</p>
                <p className="text-[#F7E7CE] font-semibold">Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-black text-[#FFF2E1] mb-4 text-lg uppercase">Newsletter</h4>
          <p className="text-[#F7E7CE] text-sm font-semibold mb-4">
            Subscribe to get special offers and updates about new products!
          </p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-3 rounded-lg bg-[#1A4A42] border-2 border-[#F7E7CE] text-white placeholder-gray-400 focus:outline-none focus:border-[#FFF2E1] transition font-semibold"
            />
            <button className="bg-gradient-to-r from-[#A79277] to-[#6B4F2F] text-white px-4 py-3 rounded-lg font-black hover:shadow-lg transition-all duration-300 uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#F7E7CE]/30 bg-[#0F1F1A] bg-opacity-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#F7E7CE] text-sm">
          <p className="font-semibold">
            © 2024 <span className="text-[#FFF2E1] font-black">Afia&apos;s Herbal Oils</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/chat" className="hover:text-[#FFF2E1] transition font-semibold">Privacy Policy</Link>
            <Link href="/chat" className="hover:text-[#FFF2E1] transition font-semibold">Terms & Conditions</Link>
            <Link href="/chat" className="hover:text-[#FFF2E1] transition font-semibold">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
