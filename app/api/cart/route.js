import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const [rows] = await db.query(
      `SELECT ci.id, ci.quantity, p.name, p.price, p.image_url, p.id AS product_id
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ?
       ORDER BY ci.id DESC`,
      [userId]
    );
    return Response.json(rows);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    let product_id, quantity;
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      product_id = body.product_id;
      quantity = body.quantity || 1;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData();
      product_id = Number(form.get("product_id"));
      quantity = Number(form.get("quantity")) || 1;
    } else {
      const form = await request.formData();
      product_id = Number(form.get("product_id"));
      quantity = Number(form.get("quantity")) || 1;
    }
    if (!product_id) {
      return new Response(JSON.stringify({ error: "product_id is required" }), { status: 400 });
    }
    await db.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [userId, product_id, quantity]
    );
    const accept = request.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      return new Response(null, { status: 302, headers: { Location: "/cart" } });
    }
    return Response.json({ ok: true, redirect: "/cart" });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to add to cart" }), { status: 500 });
  }
}


