import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 10000,
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
      console.error(`Connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error('Failed to connect to database after retries');
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

testConnection();

export default db;
