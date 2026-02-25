"use client";
import { useState } from "react";

export default function ReviewForm({ orderId }) {
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("order_id", orderId);

      const res = await fetch("/api/special_reviews", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setSuccessMsg("Review submitted successfully!");
      setRating("5");
      setComment("");
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-2 md:px-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#102016]/80 border border-[#2C4A35] rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-200 text-center mb-4">
          Share Your Experience
        </h2>

        {successMsg && <p className="text-green-400 font-medium text-center">{successMsg}</p>}
        {errorMsg && <p className="text-red-400 font-medium text-center">{errorMsg}</p>}

        <div className="grid gap-2">
          <label className="text-sm text-green-300 font-medium">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-green-700 rounded-lg px-4 py-3 bg-[#0F1C13] text-green-200 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300"
          >
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-green-300 font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="5"
            className="border border-green-700 rounded-lg px-4 py-3 bg-[#0F1C13] text-green-200 focus:ring-2 focus:ring-green-500 outline-none transition-all duration-300 resize-none"
            placeholder="Write your thoughts..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
