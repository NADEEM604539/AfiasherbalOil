import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, description, price, image_url, category, instock FROM products where deal=? ORDER BY created_at DESC",[false]
    );
    return Response.json(rows);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}


