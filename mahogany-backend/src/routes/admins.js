import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// All routes require admin auth
router.use(requireAuth);

// List admin accounts
router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, username, created_at FROM admins ORDER BY id"
  );
  res.json(rows);
});

// Create an admin account
router.post("/", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (String(username).trim().length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters" });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const hash = await bcrypt.hash(String(password), 10);
  try {
    const { rows } = await pool.query(
      `INSERT INTO admins (username, password_hash)
       VALUES ($1, $2)
       RETURNING id, username, created_at`,
      [String(username).trim(), hash]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "That username already exists" });
    }
    throw err;
  }
});

// Delete an admin account
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  if (id === req.admin.id) {
    return res.status(400).json({ error: "You can't delete your own account" });
  }

  const { rows } = await pool.query("DELETE FROM admins WHERE id = $1 RETURNING id", [id]);
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

export default router;
