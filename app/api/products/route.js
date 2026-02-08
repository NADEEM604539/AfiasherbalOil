import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, description, price, image_url, category, instock FROM products where deal=? ORDER BY created_at DESC",[false]
    );
    return Response.json(rows);
  } catch (e) {
    console.error("GET products error:", e.message, e.code);
    return new Response(JSON.stringify({ error: "Failed to fetch products", details: e.message }), { status: 500 });
  }
}


