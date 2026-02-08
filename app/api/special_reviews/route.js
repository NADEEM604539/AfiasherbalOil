import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request) {
  try {
    // Get current user
    const userId = await getCurrentUserId();

    // Get form data
    const form = await request.formData();
    const rating = Number(form.get("rating"));
    const comment = form.get("comment") || null;
    const order_id= form.get("order_id") ;

    if (!rating || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: "Invalid rating" }), { status: 400 });
    }

    // Insert into DB
    await db.query(
      "INSERT INTO special_reviews (user_id, order_id, rating, comment) VALUES (?, ? , ?, ?)",
      [userId,order_id, rating, comment]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error submitting review:", err);
    return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
  }
}

export async function GET() {
  try {
    const [reviews] = await db.query(`
      SELECT 
        special_reviews.id,
        special_reviews.comment,
        special_reviews.rating,
        special_reviews.created_at,
        users.name AS user_name
      FROM special_reviews
      JOIN users ON special_reviews.user_id = users.id
      ORDER BY special_reviews.created_at DESC
      LIMIT 6
    `);
    return Response.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
  }
}
