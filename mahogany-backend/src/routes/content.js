import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public: fetch all content blocks, keyed by block key
router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT key, data, updated_at FROM content_blocks");
  const content = {};
  for (const row of rows) content[row.key] = row.data;
  res.json(content);
});

// Only these blocks are editable from the admin dashboard.
// Everything else on the site is managed in code (src/data/site.js).
const EDITABLE_KEYS = new Set(["contact_info", "faqs", "news", "tips"]);

// Admin: update a single content block
router.put("/:key", requireAuth, async (req, res) => {
  const { key } = req.params;
  const data = req.body;
  if (!EDITABLE_KEYS.has(key)) {
    return res.status(403).json({ error: "This content block is not editable" });
  }
  if (!data || typeof data !== "object") {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }

  await pool.query(
    `INSERT INTO content_blocks (key, data, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [key, data]
  );

  res.json({ key, data });
});

export default router;
