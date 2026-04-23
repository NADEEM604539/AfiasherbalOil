import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#F5E6D3] via-[#FBF0E0] to-[#F7E7CE] border-t-4 border-[#248D76] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#248D76]/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#102C26]/5 rounded-full blur-3xl -ml-32 -mb-32" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-12 grid md:grid-cols-4 gap-4 md:gap-8 relative z-10">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-black text-[#102C26] uppercase tracking-wide mb-2 md:mb-3">Afia&#39;s</h3>
          <p className="text-[#6B4F2F] text-xs leading-relaxed font-medium">
            Pure, natural and organic oils for hair, skin, and wellness. Sustainably sourced, carefully crafted, and made with love for your self-care rituals.
          </p>
          <div className="mt-2 md:mt-3 flex gap-4">
            <Link href="https://www.facebook.com/share/1KJrchaFDp/" target="_blank" className="bg-white border-2 border-[#1a4d42] text-[#1a4d42] p-3 rounded-full hover:bg-[#1a4d42] hover:text-white transition-all duration-300 hover:scale-110">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/made.byafia?igsh=MWhrdnpzazdzMGV1dQ==" target="_blank" className="bg-white border-2 border-[#1a4d42] text-[#1a4d42] p-3 rounded-full hover:bg-[#1a4d42] hover:text-white transition-all duration-300 hover:scale-110">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black text-[#102C26] mb-2 md:mb-4 text-lg uppercase tracking-wide">Quick Links</h4>
          <ul className="space-y-1 md:space-y-2 text-sm">
            <li><Link href="/" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Home</Link></li>
            <li><Link href="/#products" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Shop Products</Link></li>
            <li><Link href="/#deals" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Special Deals</Link></li>
            <li><Link href="/orders" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ My Orders</Link></li>
            <li><Link href="/chat" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block\">→ Chat Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-black text-[#102C26] mb-3 md:mb-5 text-lg uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-[#1a4d42]">Contact Space</h4>
          <div className="space-y-4 text-sm">
            
            <div className="flex items-start gap-3 bg-white/40 p-3 rounded-xl border border-[#248D76]/20">
              <div className="bg-[#1a4d42] p-2 rounded-full text-white shadow-sm mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#102C26] font-bold text-xs uppercase tracking-wider mb-1">Call Us Available 24/7</p>
                <a href="tel:+923336419935" className="text-[#1a4d42] hover:text-[#248D76] transition-colors font-bold text-md">+92 333 641 9935</a>
                <a href="tel:+923434647035" className="text-[#1a4d42] hover:text-[#248D76] transition-colors font-bold text-md">+92 343 464 7035</a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/40 p-3 rounded-xl border border-[#248D76]/20">
              <div className="bg-[#1a4d42] p-2 rounded-full text-white shadow-sm">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#102C26] font-bold text-xs uppercase tracking-wider">Email Us</p>
                <a href="mailto:abidamansoora016@gmail.com" className="text-[#1a4d42] hover:text-[#248D76] transition-colors font-bold text-xs break-all mt-0.5">abidamansoora016@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/40 p-3 rounded-xl border border-[#248D76]/20">
              <div className="bg-[#1a4d42] p-2 rounded-full text-white shadow-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <p className="text-[#102C26] font-bold text-xs uppercase tracking-wider">Location</p>
                <p className="text-[#1a4d42] font-bold text-sm mt-0.5">Pakistan</p>
              </div>
            </div>

          </div>
        </div>

        {/* Legal Links */}
        <div className="md:pl-6 border-t md:border-t-0 md:border-l border-[#248D76]/20 pt-6 md:pt-0 mt-6 md:mt-0">
          <h4 className="font-black text-[#102C26] mb-3 md:mb-5 text-lg uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-0.5 after:bg-[#1a4d42]">Legal</h4>
          <ul className="space-y-4 text-sm font-bold bg-white/30 p-6 rounded-2xl border border-[#248D76]/10 shadow-sm">
            <li><Link href="/about" className="text-[#6B4F2F] hover:text-[#102C26] transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group w-full"><span className="text-[#248D76] group-hover:pl-1 transition-all">â†’</span> Privacy Policy</Link></li>
            <li className="h-px bg-gradient-to-r from-[#248D76]/20 to-transparent my-1"></li>
            <li><Link href="/about" className="text-[#6B4F2F] hover:text-[#102C26] transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group w-full"><span className="text-[#248D76] group-hover:pl-1 transition-all">â†’</span> Terms & Conditions</Link></li>
            <li className="h-px bg-gradient-to-r from-[#248D76]/20 to-transparent my-1"></li>
            <li><Link href="/about" className="text-[#6B4F2F] hover:text-[#102C26] transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group w-full"><span className="text-[#248D76] group-hover:pl-1 transition-all">â†’</span> About Us</Link></li>
          </ul>
        </div>

        

      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#248D76]/30 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 text-[#6B4F2F] text-xs md:text-sm">
          <p className="font-semibold">
            © {new Date().getFullYear()} <span className="text-[#102C26] font-black">Afia&#39;s Herbal Oils</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
