import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const { rows } = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
  const admin = rows[0];
  if (!admin) return res.status(401).json({ error: "Invalid username or password" });

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid username or password" });

  const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token, username: admin.username });
});

export default router;
