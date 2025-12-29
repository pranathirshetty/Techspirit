import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ------------------ MOCK DATABASE ------------------
let posts = [];
let sessions = [];

// ------------------ AI MODERATION ------------------
app.post("/posts", (req, res) => {
  const { text, mood } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text required" });
  }

  const lowered = text.toLowerCase();
  const sensitiveWords = ["suicide", "kill", "die", "self harm"];

  const isSensitive = sensitiveWords.some(word =>
    lowered.includes(word)
  );

  const newPost = {
    id: Date.now(),
    text,
    mood,
    reactions: { heart: 0, hug: 0, leaf: 0 },
    status: isSensitive ? "hidden" : "approved",
    moderatedBy: "AI"
  };

  posts.unshift(newPost);

  res.json({ success: true });
});

// ------------------ GET WALL POSTS ------------------
app.get("/posts", (req, res) => {
  const approved = posts.filter(p => p.status === "approved");
  res.json(approved);
});

// ------------------ INSTANT SUPPORT (AI PLACEHOLDER) ------------------
app.post("/support", (req, res) => {
  const { text, mood } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text required" });
  }

  // Gemini-ready placeholder
  const reply =
    "I'm really glad you reached out. What you're feeling is valid, and you don't have to face it alone. Take a slow breath — this moment will pass. 🌱";

  sessions.push({
    text,
    mood,
    timestamp: new Date().toISOString()
  });

  res.json({ reply });
});

/* ----------------------------------
   ADMIN STATS (AGGREGATED ONLY)
----------------------------------- */
app.get("/admin/stats", (req, res) => {
  const totalPosts = posts.length;
  const approved = posts.filter(p => p.status === "approved").length;
  const hidden = posts.filter(p => p.status === "hidden").length;

  const approvalRate = totalPosts
    ? Math.round((approved / totalPosts) * 100)
    : 0;

  const hiddenRate = totalPosts
    ? Math.round((hidden / totalPosts) * 100)
    : 0;

  res.json({
    totalPosts,
    approved,
    hidden,
    approvalRate,
    hiddenRate,
    supportSessions: sessions.length
  });
});


// ------------------ HEALTH CHECK ------------------
app.get("/", (req, res) => {
  res.send("TechSpirit backend running 🧠");
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

