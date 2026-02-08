import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#16221A] to-[#0B1410] border-t border-[#2C4A35]/40 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid md:grid-cols-4 gap-10 text-green-100">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-green-200">Afia&#39;s</h3>
          <p className="mt-3 text-green-300 text-sm leading-relaxed">
            Pure, natural and organic oils for hair, skin, and wellness. Sustainably sourced, 
            carefully crafted, and made with love for your self-care rituals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-green-200">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
            <li><Link href="/#products" className="hover:text-emerald-400">Shop</Link></li>
            <li><Link href="/orders" className="hover:text-emerald-400">My Orders</Link></li>
            <li><Link href="/chat" className="hover:text-emerald-400">Chat</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-green-200">Contact</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-green-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 
              <span>+92 3336419935</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> 
              <span>abidamansoora016@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-green-200">Follow Us</h4>
          <div className="mt-3 flex gap-4">
            <Link href="https://www.facebook.com/share/1KJrchaFDp/" target="_blank">
              <Facebook className="w-5 h-5 text-green-300 hover:text-emerald-400 transition" />
            </Link>
            <Link href="https://www.instagram.com/made.byafia?igsh=MWhrdnpzazdzMGV1dQ==" target="_blank">
              <Instagram className="w-5 h-5 text-green-300 hover:text-emerald-400 transition" />
            </Link>
        
          </div>
        </div>
      </div>

      <div className="border-t border-[#2C4A35]/40 text-center text-green-400 text-sm py-4">
        © {new Date().getFullYear()} Afia&#39;s. All rights reserved.
      </div>
    </footer>
  );
}
