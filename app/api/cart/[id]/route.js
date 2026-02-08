import db from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const { quantity } = body;
    if (!quantity || quantity < 1) {
      return new Response(JSON.stringify({ error: "quantity must be >= 1" }), { status: 400 });
    }
    await db.query("UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?", [quantity, id, userId]);
    return Response.json({ ok: true });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to update item" }), { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const { id } = await params;
    await db.query("DELETE FROM cart_items WHERE id = ? AND user_id = ?", [id, userId]);
    return Response.json({ ok: true });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to remove item" }), { status: 500 });
  }
}


