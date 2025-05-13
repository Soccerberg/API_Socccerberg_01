const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

app.post("/api/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    console.error("GPT error:", err.message);
    res.status(500).json({ error: "GPT request failed" });
  }
});

app.listen(3001, () => console.log("✅ GPT-Server läuft auf http://localhost:3001"));
