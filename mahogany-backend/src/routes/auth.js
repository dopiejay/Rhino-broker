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

  const payload = { id: admin.id, username: admin.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.json({ token, refreshToken, username: admin.username });
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(401).json({ error: "Missing refresh token" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const token = jwt.sign({ id: payload.id, username: payload.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const nextRefreshToken = jwt.sign({ id: payload.id, username: payload.username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token, refreshToken: nextRefreshToken });
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
