import Link from "next/link";
import { getOrdersForCurrentUser } from "./actions";
import Navbar from "@/components/Navbar";

export default async function OrdersPage() {
  let orders = [];
  try {
    orders = await getOrdersForCurrentUser();
  } catch (e) {
    return (
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323] text-gray-100">
        <h1 className="text-4xl font-extrabold text-green-200 mb-6 drop-shadow-lg">
          My Orders
        </h1>
        <p className="text-red-400 font-medium">
          Please sign in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen px-6 md:px-16 py-12 relative overflow-hidden bg-gradient-to-b from-[#0B1410] via-[#16221A] to-[#1F3323] text-gray-100">
      {/* Decorative glowing accents */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-12 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-lime-300/10 rounded-full blur-3xl"></div>

      <h1 className="relative z-10 text-4xl font-extrabold text-green-200 mb-10 text-center drop-shadow-lg">
        My Orders
      </h1>

      <div className="relative z-10 space-y-5 max-w-4xl mx-auto">
        {orders.length === 0 && (
          <p className="text-green-300 text-center text-lg">
            You have no orders yet.
          </p>
        )}
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block bg-[#1B2F20]/80 border border-[#2C4A35] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-green-100 text-lg">
                  Order #{order.id}
                </p>
                <p className="text-green-300 text-sm mt-1">
                  Placed on:{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-green-300 text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "success"
                        ? "bg-green-600/30 text-green-200"
                        : "bg-red-600/30 text-red-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              <p className="font-extrabold text-green-300 text-xl">
                Rs {Number(order.total_price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
