import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Local Ollama endpoint
const OLLAMA_URL = "http://localhost:11434/api/generate";

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5",   // or any model you pulled
        prompt: prompt,
        stream: false       // easier for now; can enable streaming later
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.response,
    });
  } catch (err) {
    console.error("Ollama error:", err);
    res.status(500).json({ error: "Local model request failed" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
