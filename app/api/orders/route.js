import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const email = user.emailAddresses[0].emailAddress;

    const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found in DB" }), {
        status: 404,
      });
    }

    const userId = userRows[0].id;

    const [rows] = await db.query(
      "SELECT id, total_price, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return Response.json(rows);
  } catch (e) {
    console.error("GET orders error:", e);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  const conn = await db.getConnection();
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const email = user.emailAddresses[0].emailAddress;
    const name = user.firstName || "Customer";

    const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found in DB" }), {
        status: 404,
      });
    }

    const userId = userRows[0].id;

    if (!userId) {
      await conn.release();
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await conn.beginTransaction();

    // Read contact/address/payment_method from client JSON
    let contact = null,
      address = null,
      payment_method = "cod";
    try {
      const body = await request.json();
      contact = body?.contact || null;
      address = body?.address || null;
      payment_method = body?.payment_method || "cod";
    } catch {}

    const [cartItems] = await conn.query(
      `SELECT ci.id, ci.product_id, ci.quantity, p.name AS product_name, p.price
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ?`,
      [userId]
    );

    if (cartItems.length === 0) {
      await conn.release();
      return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    }

    const total = cartItems.reduce((s, it) => s + Number(it.price) * it.quantity, 0);
    const deliveryCharge = 200;
    const grandTotal = total + deliveryCharge;

    const [orderRes] = await conn.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')",
      [userId, grandTotal]
    );
    const orderId = orderRes.insertId;

    for (const it of cartItems) {
      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, it.product_id, it.quantity, it.price]
      );
    }

    await conn.query(
      "INSERT INTO payments (order_id, contact, address, payment_method, status) VALUES (?, ?, ?, ?, 'success')",
      [orderId, contact, address, payment_method]
    );

    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    await conn.commit();
    await conn.release();

    // ======================================
    // 📧 SEND SIMPLE ORDER CONFIRMATION EMAIL
    // ======================================

    const emailText = `
Hi ${name},

Thank you for your order with YourShop!

Your order #${orderId} has been successfully placed.

Order Summary:
- Total Amount: $${grandTotal.toFixed(2)}
- Payment Method: ${payment_method.toUpperCase()}
- Address: ${address || "Not provided"}
- Contact: ${contact || "Not provided"}

We’ll let you know when your order is shipped.

Best regards,
YourShop Team
    `;

    await resend.emails.send({
      from: "YourShop <onboarding@resend.dev>", // or "YourShop <no-reply@yourdomain.com>" after domain verification
      to: email,
      subject: `Order Confirmation #${orderId}`,
      text: emailText,
    });

    return Response.json({ ok: true, order_id: orderId });
  } catch (e) {
    console.error("Order error:", e);
    try {
      await conn.rollback();
    } catch {}
    try {
      await conn.release();
    } catch {}
    return new Response(JSON.stringify({ error: "Failed to place order" }), {
      status: 500,
    });
  }
}
