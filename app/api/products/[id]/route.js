import db from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const [rows] = await db.query(
      "SELECT id, name, description, price, image_url, category, instock FROM products WHERE id = ?",
      [id]
    );
    if (!rows[0]) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}
