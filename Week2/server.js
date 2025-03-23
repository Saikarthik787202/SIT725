const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());


app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  if (!num1 || !num2) {
    return res.status(400).json({ error: "Both numbers are required." });
  }
  const sum = parseFloat(num1) + parseFloat(num2);
  res.json({ sum });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
