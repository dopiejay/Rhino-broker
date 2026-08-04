import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: submit a quote request from the site's Quote form
router.post("/", async (req, res) => {
  const { name, phone, email, insurance_type, details } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  const { rows } = await pool.query(
    `INSERT INTO quote_requests (name, phone, email, insurance_type, details)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, phone, email || null, insurance_type || null, details || null]
  );

  res.status(201).json(rows[0]);
});

// Admin: list all quote requests, newest first
router.get("/", requireAuth, async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM quote_requests ORDER BY created_at DESC");
  res.json(rows);
});

// Admin: update a request's status (new / contacted / closed)
router.patch("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const allowed = ["new", "contacted", "closed"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(", ")}` });
  }

  const { rows } = await pool.query(
    "UPDATE quote_requests SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// Admin: delete a request
router.delete("/:id", requireAuth, async (req, res) => {
  await pool.query("DELETE FROM quote_requests WHERE id = $1", [req.params.id]);
  res.status(204).end();
});

export default router;
