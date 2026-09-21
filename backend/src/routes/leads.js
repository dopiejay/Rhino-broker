import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: submit a lead from the site's Contact form
router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};
  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  const { rows } = await pool.query(
    `INSERT INTO leads (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email || null, phone || null, subject || null, message]
  );

  res.status(201).json(rows[0]);
});

// Admin: list all leads, newest first
router.get("/", requireAuth, async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
  res.json(rows);
});

// Admin: update a lead's status (new / contacted / closed)
router.patch("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const allowed = ["new", "contacted", "closed"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(", ")}` });
  }

  const { rows } = await pool.query(
    "UPDATE leads SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// Admin: delete a lead
router.delete("/:id", requireAuth, async (req, res) => {
  await pool.query("DELETE FROM leads WHERE id = $1", [req.params.id]);
  res.status(204).end();
});

export default router;