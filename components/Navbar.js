"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#FFF2E1] to-[#F5E6D3] border-b-2 border-[#1a4d42]/20 shadow-xl">
      {/* Full width container */}
      <div className="w-full flex items-center justify-between px-4 md:px-6 lg:px-16 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#1a4d42] shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow">
            <Image
              src="/logo.jpg"
              alt="Afia's Pure Herbal Oils Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="text-xl md:text-2xl font-bold text-[#102C26] tracking-tight whitespace-nowrap">
              Afia<span className="text-[#1a4d42]">'s</span>
            </h1>
            <p className="text-[10px] md:text-xs text-[#6B4F2F] font-semibold uppercase tracking-widest">Pure Herbal Oils</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] px-3 py-2 rounded-full border border-[#0d3a33]/50 shadow-lg">
          <NavLink href="/" pathname={pathname} searchParams={searchParams}>Home</NavLink>
          <NavLink href="/products" pathname={pathname} searchParams={searchParams}>Products</NavLink>
          <NavLink href="/#deals" pathname={pathname} searchParams={searchParams}>Deals</NavLink>
          <NavLink href="/orders" pathname={pathname} searchParams={searchParams}>Orders</NavLink>
          <NavLink href="/chat" pathname={pathname} searchParams={searchParams}>Chat</NavLink>
          <NavLink href="/about" pathname={pathname} searchParams={searchParams}>About</NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Chat */}
          <Link
            href="/chat"
            className="md:hidden p-2.5 rounded-full hover:bg-[#1a4d42]/20 transition flex-shrink-0 hover:shadow-md"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#1a4d42]" />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full hover:bg-[#1a4d42]/20 transition flex-shrink-0 hover:shadow-md"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#1a4d42]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1a4d42] text-[#FFF2E1] text-xs font-bold rounded-full px-2 py-0.5 shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in" className="flex-shrink-0">
              <button className="px-4 md:px-6 py-2 bg-gradient-to-r from-[#1a4d42] to-[#0d3a33] hover:from-[#0d3a33] hover:to-[#051f1a] text-[#FFF2E1] font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#1a4d42] flex-shrink-0 p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden w-full bg-gradient-to-b from-[#1a4d42] to-[#0d3a33] border-t-2 border-[#0d3a33]/40 px-6 py-6 space-y-3 shadow-xl">
          <MobileLink href="/" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Home</MobileLink>
          <MobileLink href="/products" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Products</MobileLink>
          <MobileLink href="/#deals" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Deals</MobileLink>
          <MobileLink href="/orders" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Orders</MobileLink>
          <MobileLink href="/about" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>About</MobileLink>
          <MobileLink href="/chat" setOpen={setOpen} pathname={pathname} searchParams={searchParams}>Chat</MobileLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, pathname, searchParams }) {
  let isActive = false;

  if (href === "/") {
    isActive = pathname === "/";
  } else if (href.includes("?")) {
    // For URLs with query parameters (like /products?deals=deals)
    const [path, query] = href.split("?");
    const currentDealsParam = searchParams.get("deals");
    isActive = pathname === path && currentDealsParam === "deals";
  } else {
    // For regular paths
    isActive = pathname.startsWith(href) && pathname === href;
  }

  return (
    <Link
      href={href}
      className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-base font-bold transition-all duration-300 whitespace-nowrap ${
        isActive
          ? "bg-[#F5E6D3] text-[#102C26] shadow-lg scale-105"
          : "text-[#F5E6D3] hover:bg-[#1a4d42]/40 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, setOpen, pathname, searchParams }) {
  let isActive = false;

  if (href === "/") {
    isActive = pathname === "/";
  } else if (href.includes("?")) {
    // For URLs with query parameters (like /products?deals=deals)
    const [path, query] = href.split("?");
    const currentDealsParam = searchParams.get("deals");
    isActive = pathname === path && currentDealsParam === "deals";
  } else {
    // For regular paths
    isActive = pathname.startsWith(href) && pathname === href;
  }

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`block w-full px-5 py-3 rounded-lg text-lg font-bold transition-all duration-300 ${
        isActive
          ? "bg-[#F5E6D3] text-[#102C26] shadow-lg"
          : "text-[#F5E6D3] hover:bg-[#1a4d42]/40 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}