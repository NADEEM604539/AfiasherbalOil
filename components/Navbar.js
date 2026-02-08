"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Polling cart count every 2 seconds
  useEffect(() => {
    async function getCartCount() {
      try {
        const response = await fetch("/api/check_cart");
        const data = await response.json();
        setCartCount(data.count || 0);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    if(isSignedIn){

      getCartCount();
    }


  }, );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0B1410] via-[#16221A] to-[#1F3323] shadow-md border-b border-[#2C4A35]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-2">
        {/* Logo */}
       <Link href="/" className="flex items-center space-x-3 group">
      {/* Logo circle */}
      <div className="relative w-10 h-10 p-1 rounded-full bg-white shadow-lg border border-green-200 group-hover:scale-110 transition-transform duration-500 ease-out">
        <img
          src="/favicon.ico"
          alt="Afia&#39;s Logo"
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      {/* Brand name */}
      <h1 className="text-2xl font-extrabold text-green-700 tracking-wide">
        Afia<span className="text-emerald-400">&#39;s</span>
      </h1>
    </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/#products">Products</NavLink>
          <NavLink href="/orders">Orders</NavLink>
          <NavLink href="/chat">Chat</NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Chat always visible */}
          <Link href="/chat" className="relative md:hidden">
            <MessageCircle className="w-6 h-6 text-green-200 hover:text-emerald-300 transition" />
          </Link>

          {/* Cart always visible */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-green-200 hover:text-emerald-300 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-semibold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}

            <UserButton afterSignOutUrl="/" />
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-green-200 hover:text-emerald-300 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#0B1410]/95 border-t border-[#2C4A35]/40 px-6 py-6 space-y-4 text-green-100">
          <NavLink href="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink href="/#products" onClick={() => setOpen(false)}>
            Products
          </NavLink>
          <NavLink href="/orders" onClick={() => setOpen(false)}>
            Orders
          </NavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-green-100 hover:text-emerald-300 transition"
    >
      {children}
    </Link>
  );
}
