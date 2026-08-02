import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const useSSL = /neon\.tech|render\.com|sslmode=require/.test(process.env.DATABASE_URL || "");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

export async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS content_blocks (
      key TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS quote_requests (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT,
      phone TEXT NOT NULL,
      email TEXT,
      insurance_type TEXT,
      preferred_contact TEXT,
      details TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
}
