const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to add two numbers
app.post('/add', (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).send({ error: 'Invalid input. Please provide two numbers.' });
  }

  const result = num1 + num2;
  res.send({ result });

});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
