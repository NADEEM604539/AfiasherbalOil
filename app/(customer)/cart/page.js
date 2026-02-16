"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });

      if (res.status === 401) {
        setError("Please sign in to view your cart.");
        setItems([]);
        return;
      }

      const data = await res.json();
      setItems(data);
    } catch (e) {
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ FAST quantity update (Optimistic UI)
  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;

    const previousItems = [...items];
    setUpdatingId(id);

    // 1️⃣ Instant UI update
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }
    } catch (err) {
      // 2️⃣ Revert if API fails
      setItems(previousItems);
      setError("Failed to update quantity.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ FAST remove
  const removeItem = async (id) => {
    const previousItems = [...items];
    setUpdatingId(id);

    // Instant remove
    setItems(prev => prev.filter(item => item.id !== id));

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
    } catch (err) {
      setItems(previousItems);
      setError("Failed to remove item.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deliveryCharges = items.length > 0 ? 200 : 0;

  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price) * it.quantity,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-6 md:px-16 py-16 bg-gradient-to-b from-[#0E1D13] via-[#1A2E1B] to-[#2E3E2A] text-gray-100">
        <h1 className="text-4xl font-bold text-green-200 mb-8 text-center drop-shadow-lg">
          Your Cart
        </h1>

        {loading ? (
          <p className="text-center text-green-300 animate-pulse">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="mt-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Items List */}
            <div className="md:col-span-2 space-y-6">
              {items.length === 0 && (
                <p className="text-gray-400 text-center">
                  Your cart is empty.
                </p>
              )}

              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-4 border border-[#3C5F40] rounded-2xl p-4 bg-[#1E3A28] shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={it.image_url}
                    alt={it.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-green-200">
                      {it.name}
                    </p>

                    <p className="text-green-300 mt-1">
                      Rs {Number(it.price).toFixed(2)}
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      {/* Minus */}
                      <button
                        disabled={updatingId === it.id}
                        className="px-3 py-1 border border-green-500 rounded-full hover:bg-green-600 transition disabled:opacity-50"
                        onClick={() =>
                          updateQty(it.id, it.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span className="text-green-200">
                        {it.quantity}
                      </span>

                      {/* Plus */}
                      <button
                        disabled={updatingId === it.id}
                        className="px-3 py-1 border border-green-500 rounded-full hover:bg-green-600 transition disabled:opacity-50"
                        onClick={() =>
                          updateQty(it.id, it.quantity + 1)
                        }
                      >
                        +
                      </button>

                      {/* Remove */}
                      <button
                        disabled={updatingId === it.id}
                        className="ml-4 text-red-500 hover:text-red-400 transition disabled:opacity-50"
                        onClick={() => removeItem(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            {items.length !== 0 && (
              <div className="border border-[#3C5F40] rounded-2xl p-6 bg-[#1B2F20] shadow-lg h-fit">
                <p className="text-green-200 font-semibold text-lg">
                  Subtotal
                </p>

                <p className="text-2xl text-green-300 mt-2 font-bold">
                  Rs {(subtotal + deliveryCharges).toFixed(2)}
                  <br />
                  ({deliveryCharges} Delivery Charges)
                </p>

                <Link
                  href="/checkout"
                  className="mt-6 inline-block w-full text-center bg-gradient-to-r from-[#FFD580] to-[#FFC857] text-[#2E1F1A] px-5 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                >
                  Checkout
                </Link>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
