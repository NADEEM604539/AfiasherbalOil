import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// const certPath = path.join(process.cwd(), 'isrgrootx1.pem');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  // ssl: {
  //   ca: fs.readFileSync(certPath),
  //   rejectUnauthorized: true,
  //   enableTrace: true
  // },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 2000,
  acquireTimeout: 2000,
  timeout: 2000,
});

// Test connection with retry mechanism
const testConnection = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await db.getConnection();
      console.log('Database connected successfully');
      connection.release();
      return true;
    } catch (err) {
      console.error(`Connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

testConnection().catch(console.error);

export default db;
