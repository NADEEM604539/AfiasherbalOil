"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const { refreshCartCount } = useCart();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (res.status === 401) {
        setError("Please sign in to checkout.");
        setItems([]);
        return;
      }
      setItems(await res.json());
    })();
  }, []);

  const total = items.reduce(
    (s, it) => (s + Number(it.price) * it.quantity),
    0
  );

  const placeOrder = async () => {
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact,
        address,
        payment_method: paymentMethod,
      }),
    });
    setPlacing(false);
    setShowConfirm(false); // Close modal
    if (res.ok) {
      await res.json();
      // Sync Navbar (Cart is cleared after order)
      refreshCartCount();
      window.location.href = "/orders";
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Failed to place order");
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen px-6 md:px-16 py-12 relative overflow-hidden bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323] text-gray-100">
      {/* Decorative glowing orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-12 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-lime-300/10 rounded-full blur-3xl"></div>

      {/* Page Heading */}
      <h1 className="text-5xl font-extrabold text-green-200 mb-12 text-center drop-shadow-lg tracking-wide">
        Checkout
      </h1>

      <div className="mt-6 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {/* Items & Form */}
        <div className="md:col-span-2 space-y-6">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 bg-[#1E3A28]/90 border border-[#3C5F40] rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm"
            >
              <img
                src={it.image_url}
                alt={it.name}
                className="w-24 h-24 object-cover rounded-2xl shadow-md"
              />
              <div className="flex-1">
                <p className="font-semibold text-green-100 text-lg">
                  {it.name}
                </p>
                <p className="text-green-300 mt-1">Qty: {it.quantity}</p>
              </div>
              <div className="text-green-300 font-bold text-lg">
                Rs {(Number(it.price) * it.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Customer Details */}
          <div className="grid gap-4 mt-8 bg-[#16251A]/80 border border-[#2C4A35] rounded-3xl p-6 shadow-lg backdrop-blur-sm">
            <label className="text-green-200 font-semibold text-lg">
              Phone
            </label>
            <input
              suppressHydrationWarning
              value={contact}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 12) {
                  setContact(value);
                }
              }}
              type="number"
              placeholder="Enter phone number"
              className="px-5 py-3 rounded-3xl border border-[#3C5F40] bg-[#0F1A13]/90 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner placeholder-green-400 transition-all duration-300"
            />
            <label className="text-green-200 font-semibold text-lg">
              Address
            </label>
            <textarea
              suppressHydrationWarning
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Delivery address"
              className="px-5 py-3 rounded-3xl border border-[#3C5F40] bg-[#0F1A13]/90 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner placeholder-green-400 transition-all duration-300"
            />

            <label className="text-green-200 font-semibold text-lg">
              Payment Method
            </label>
            <select
              suppressHydrationWarning
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="px-5 py-3 rounded-3xl border border-[#3C5F40] bg-[#0F1A13]/90 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner transition-all duration-300"
            >
              <option value="cod">Cash on Delivery</option>
            </select>

            {error && <p className="text-red-400 font-medium">{error}</p>}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border border-[#3C5F40] rounded-3xl p-8 bg-[#16251A]/80 shadow-2xl backdrop-blur-sm flex flex-col gap-6">
          <p className="text-green-200 font-bold text-xl">Total</p>
          <p className="text-3xl text-green-300 font-extrabold">
            Rs {(total + 200).toFixed(2)} <br></br> (200 Delivery Charges)

          </p>
          <button
            disabled={placing || !contact || !address || items.length === 0}
            onClick={() => setShowConfirm(true)}
            className="mt-2 w-full bg-gradient-to-br from-[#356836] to-[#1F3C28] text-green-100 px-6 py-3 rounded-3xl font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300 disabled:opacity-60"
          >
            {placing ? "Placing..." : "Place Order"}
          </button>

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
              <div className="bg-[#1B2F20] border border-[#3C5F40] rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-2xl font-bold text-green-200 mb-4">Confirm Your Order</h2>
                <p className="text-green-300 mb-6 leading-relaxed">
                  Are you sure you want to place this order? Please double-check your phone number and delivery address.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-8 p-4 bg-[#132214] rounded-2xl border border-green-900/30">
                  <p><span className="text-green-500 font-semibold">Phone:</span> {contact}</p>
                  <p><span className="text-green-500 font-semibold">Address:</span> {address}</p>
                  <p><span className="text-green-500 font-semibold">Total:</span> Rs {(total + 200).toFixed(2)}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 px-6 py-3 rounded-2xl border border-[#3C5F40] text-green-300 font-semibold hover:bg-[#2C4A35] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FFD580] to-[#FFC857] text-[#2E1F1A] font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {placing ? "Confirming..." : "Confirm order"}
                  </button>
                </div>
              </div>
            </div>
          )}
          <Link
            href="/cart"
            className="mt-2 block text-center text-green-300 hover:underline font-medium"
          >
            Back to cart
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
