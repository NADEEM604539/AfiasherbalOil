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
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817]">
        <Link
          href="/orders"
          className="text-[#248D76] hover:text-[#1A6B5F] font-semibold transition-colors"
        >
          ← Back to orders
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold text-[#102C26]">
          Order
        </h1>
        <p className="mt-4 text-red-600 font-medium">
          Unable to load order.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] relative overflow-hidden">
      <Navbar />
      
      {/* Glowing background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#248D76]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

      <div className="relative px-6 md:px-16 py-12 max-w-5xl mx-auto z-10">
        {/* Back link */}
        <Link href="/orders" className="text-[#248D76] hover:text-[#1A6B5F] font-semibold transition-colors">
          ← Back to orders
        </Link>

        <div className="mt-6 space-y-3">
          <h1 className="text-4xl font-extrabold text-[#102C26]">
            Order #{order.id}
          </h1>
          <p className="text-[#6B4F2F]">
            {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} •{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                order.status === "delivered"
                  ? "bg-[#248D76]/20 text-[#248D76]"
                  : order.status === "processing"
                  ? "bg-blue-500/20 text-blue-600"
                  : order.status === "pending"
                  ? "bg-[#F7A500]/20 text-[#C67F1F]"
                  : order.status === "cancelled"
                  ? "bg-red-500/20 text-red-600"
                  : "bg-gray-500/20 text-gray-600"
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </p>
        </div>

        {/* Items List */}
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold text-[#102C26]">Order Items</h2>
          {order.items.map((it, index) => (
            <div
              key={it.product_id - index}
              className="flex items-center justify-between bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[#248D76] transition-all duration-300"
            >
              <div>
                <p className="font-semibold text-[#102C26] text-lg">{it.name}</p>
                <p className="text-[#6B4F2F] mt-2">Quantity: <span className="font-semibold">{it.quantity}</span></p>
              </div>
              <div className="text-right">
                <p className="text-[#248D76] font-bold text-lg">
                  Rs {Number(it.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="mt-10 bg-white border-2 border-[#F7E7CE] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[#6B4F2F] mb-2">Subtotal</p>
              <p className="text-[#6B4F2F]">Delivery Charges</p>
            </div>
            <div className="text-right">
              <p className="text-[#3D2817] font-semibold mb-2">
                Rs {(Number(order.total_price) - 200).toFixed(2)}
              </p>
              <p className="text-[#3D2817] font-semibold">Rs 200</p>
            </div>
          </div>
          <div className="border-t-2 border-[#F7E7CE] mt-4 pt-4 flex justify-between items-center">
            <p className="text-2xl font-bold text-[#102C26]">Total:</p>
            <p className="text-2xl font-bold text-[#248D76]">
              Rs {Number(order.total_price).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Review Form only if delivered */}
        {order.status === "delivered" && <ReviewForm orderId={order.id} />}
      </div>
    </div>
  );
}
