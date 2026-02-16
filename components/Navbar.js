"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";

import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0B1410] via-[#16221A] to-[#1F3323] shadow-lg border-b border-[#2C4A35]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 p-1 rounded-full bg-white shadow-lg border border-green-200 group-hover:scale-110 transition-transform duration-500 ease-out">
            <Image
              src="/logo.jpg"
              alt="Afia's Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-green-700 tracking-wide group-hover:tracking-wider transition-all duration-300">
            Afia<span className="text-emerald-400">&apos;s</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/#products">Products</NavLink>
          <NavLink href="/#deals">Deals</NavLink>
          <NavLink href="/orders">Orders</NavLink>
          <NavLink href="/chat">Chat</NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Chat button (mobile) */}
          <Link href="/chat" className="relative md:hidden p-2 rounded-md hover:bg-emerald-600/20 transition">
            <MessageCircle className="w-6 h-6 text-green-200 hover:text-emerald-300 transition-colors duration-300" />
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-md hover:bg-emerald-600/20 transition">
            <ShoppingCart className="w-6 h-6 text-green-200 hover:text-emerald-300 transition-colors duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-semibold rounded-full px-2 animate-pulse shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href={`/sign-in?redirect_url=${encodeURIComponent("/")}`}>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-500 hover:scale-105 transform transition-all duration-300">
                Sign in
              </button>
            </Link>
          )}

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
          <NavLink href="/#deals" onClick={() => setOpen(false)}>
            Deals
          </NavLink>
          <NavLink href="/orders" onClick={() => setOpen(false)}>
            Orders
          </NavLink>
          <NavLink href="/chat" onClick={() => setOpen(false)}>
            Chat
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
      className="relative inline-flex items-center px-4 py-2 rounded-lg font-medium text-green-100 hover:text-emerald-300 transition-colors duration-300 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
    </Link>
  );
}
