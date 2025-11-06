const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Data file path
const dataFile = path.join(__dirname, "data", "feedback.json");

// Ensure data folder exists
fs.ensureFileSync(dataFile);

// GET route to fetch all feedback
app.get("/feedback", async (req, res) => {
  const data = await fs.readJson(dataFile).catch(() => []);
  res.json(data);
});

// POST route to save new feedback
app.post("/feedback", async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Please provide name and feedback." });
  }

  const newFeedback = { name, message, date: new Date().toISOString() };
  const data = await fs.readJson(dataFile).catch(() => []);
  data.push(newFeedback);
  await fs.writeJson(dataFile, data, { spaces: 2 });

  res.json({ success: true, feedback: newFeedback });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
