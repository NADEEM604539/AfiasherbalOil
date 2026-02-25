"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FFF2E1] border-b border-[#D4A574]/30 shadow-xl">
      {/* Full width container */}
      <div className="w-full flex items-center justify-between px-6 lg:px-16 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#A79277] shadow-md">
            <Image
              src="/logo.jpg"
              alt="Afia's Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#102C26] tracking-wide">
            Afia<span className="text-[#A79277]">'s</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-15 bg-[#102C26] px-2 py-1 rounded-xl border border-[#0A1A15]/40">
          <NavLink href="/" pathname={pathname}>Home</NavLink>
          <NavLink href="/#products" pathname={pathname}>Products</NavLink>
          <NavLink href="/#deals" pathname={pathname}>Deals</NavLink>
          <NavLink href="/orders" pathname={pathname}>Orders</NavLink>
          <NavLink href="/chat" pathname={pathname}>Chat</NavLink>
          <NavLink href="/about" pathname={pathname}>About</NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Chat */}
          <Link
            href="/chat"
            className="md:hidden p-2 rounded-lg hover:bg-[#A79277]/20 transition"
          >
            <MessageCircle className="w-6 h-6 text-[#102C26]" />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-[#A79277]/20 transition"
          >
            <ShoppingCart className="w-6 h-6 text-[#102C26]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#102C26] text-[#FFF2E1] text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in">
              <button className="px-5 py-2 bg-[#102C26] hover:bg-[#0A1A15] text-[#FFF2E1] font-semibold rounded-lg transition-all duration-200 shadow-md">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#102C26]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden w-full bg-[#102C26] border-t border-[#0A1A15]/40 px-6 py-6 space-y-3">
          <MobileLink href="/" setOpen={setOpen}>Home</MobileLink>
          <MobileLink href="/#products" setOpen={setOpen}>Products</MobileLink>
          <MobileLink href="/#deals" setOpen={setOpen}>Deals</MobileLink>
          <MobileLink href="/orders" setOpen={setOpen}>Orders</MobileLink>
          <MobileLink href="/about" setOpen={setOpen}>About</MobileLink>
          <MobileLink href="/chat" setOpen={setOpen}>Chat</MobileLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, pathname }) {
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace("/#", "/"));

  return (
    <Link
      href={href}
      className={`px-5 py-3 rounded-lg text-lg font-bold transition-all duration-200 ${
        isActive
          ? "bg-[#F7E7CE] text-[#102C26] shadow-md"
          : "text-[#F7E7CE] hover:bg-[#1A4A42] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, setOpen }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block w-full px-5 py-3 rounded-lg text-lg font-bold text-[#F7E7CE] hover:bg-[#1A4A42] hover:text-white transition"
    >
      {children}
    </Link>
  );
}