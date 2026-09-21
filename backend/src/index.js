import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initSchema } from "./db.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import quoteRoutes from "./routes/quotes.js";
import leadRoutes from "./routes/leads.js";
import adminRoutes from "./routes/admins.js";
import uploadRoutes, { UPLOAD_DIR } from "./routes/uploads.js";

dotenv.config();

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin/non-browser requests (no origin header) and any configured origin
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/uploads", uploadRoutes);

// Serve uploaded images so content blocks can reference them directly
app.use("/uploads", express.static(UPLOAD_DIR));

// Fallback error handler so unexpected errors return JSON, not an HTML stack trace
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const port = process.env.PORT || 4000;

initSchema()
  .then(() => {
    app.listen(port, () => console.log(`Mahogany backend running on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to initialise database schema:", err);
    process.exit(1);
  });
