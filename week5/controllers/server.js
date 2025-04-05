const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

const uri = "mongodb://localhost:27017/myprojectDB"; // Replace with your MongoDB connection string
let collection;

app.use(express.static(path.join(__dirname, '../views/public'))); // Serve static files
app.use(express.json());

// MongoDB Connection
async function connectDB() {
    try {
        const client = await MongoClient.connect(uri);
        collection = client.db('myprojectDB').collection('Cards');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Add a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/public/index.html')); // Serve the index.html file
});

// API Routes
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await collection.find({}).toArray();
        res.json({ statusCode: 200, data: cards });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
});

app.post('/api/cards', async (req, res) => {
    try {
        const card = req.body;
        const result = await collection.insertOne(card);
        res.json({ statusCode: 200, data: result });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});