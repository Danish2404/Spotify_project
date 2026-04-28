require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const fullMessages = [
      {
        role: "system",
        content:
          "You are CodeBuddy, an expert programming assistant. Help developers with coding doubts clearly, concisely, and practically with examples when useful."
      },
      ...messages
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: fullMessages
        })
      }
    );

    const data = await response.json();

    res.json({
      reply: data.choices[0].message
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});