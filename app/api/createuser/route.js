import db from '@/lib/db';
import { redirect } from 'next/navigation';

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.data.email_addresses[0].email_address;
    const name = body.data.first_name;


    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    if (rows.length > 0) {
      console.log('Email already exists');
    } else {
      await db.query(
        'INSERT INTO users (name, email, role_id) VALUES (?, ?, ?)',
        [name, email,2]
      );
      console.log('User created successfully');
    }
  } catch (error) {
    console.error('Error in POST:', error);
  }
}
