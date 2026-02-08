import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getOrderDetailsForCurrentUser } from "../actions";
import ReviewForm from "@/components/ReviewForm"; // We'll create a client-side form component

export default async function OrderDetails({ params }) {
  let order;
  try {
    const { id } = await params;
    order = await getOrderDetailsForCurrentUser(id);
  } catch (e) {
    order = null;
  }

  if (!order) {
    return (
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323] text-gray-100">
        <Link
          href="/orders"
          className="text-green-300 hover:underline font-medium"
        >
          ← Back to orders
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold text-green-200 drop-shadow-lg">
          Order
        </h1>
        <p className="mt-4 text-red-400 font-medium">
          Unable to load order.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323] text-gray-100">
      <Navbar />
      <div className="relative px-6 md:px-16 py-12 max-w-5xl mx-auto">
        {/* Back link */}
        <Link href="/orders" className="relative z-10 text-green-300 hover:underline font-medium">
          ← Back to orders
        </Link>

        <div className="mt-6 relative z-10 space-y-2">
          <h1 className="text-4xl font-extrabold text-green-200 drop-shadow-lg">
            Order #{order.id}
          </h1>
          <p className="text-green-300">
            {new Date(order.created_at).toLocaleString()} •{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === "success" || order.status === "delivered"
                  ? "bg-green-600/30 text-green-200"
                  : "bg-red-600/30 text-red-200"
              }`}
            >
              {order.status}
            </span>
          </p>
        </div>

        {/* Items List */}
        <div className="mt-8 space-y-5 relative z-10">
          {order.items.map((it, index) => (
            <div
              key={it.product_id - index}
              className="flex items-center justify-between bg-[#1B2F20]/80 border border-[#2C4A35] rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <div>
                <p className="font-semibold text-green-100 text-lg">{it.name}</p>
                <p className="text-green-300 mt-1">Qty: {it.quantity}</p>
              </div>
              <div className="text-green-300 font-bold text-lg">
                Rs {Number(it.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <p className="mt-10 text-2xl text-green-200 font-bold relative z-10">
          Total:{" "}
          <span className="text-green-300">
            Rs {Number(order.total_price).toFixed(2)} (200 Delivery Charges)
          </span>
        </p>

        {/* Review Form only if delivered */}
        {order.status === "delivered" && <ReviewForm orderId={order.id} />}
      </div>
    </div>
  );
}
