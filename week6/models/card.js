// models/card.js
class Card {
    constructor(title, subTitle, path, description) {
        this.title = title;
        this.subTitle = subTitle;
        this.path = path;
        this.description = description;
    }

    // Database operations
    static async getAllCards() {
        // MongoDB operation to get all cards
        return collection.find({}).toArray();
    }

    async save() {
        // MongoDB operation to save a card
        return collection.insertOne(this);
    }
}

module.exports = Card;

// controllers/cardController.js
const Card = require('../models/card');

class CardController {
    static async getAllCards(req, res) {
        try {
            const cards = await Card.getAllCards();
            res.json({ statusCode: 200, data: cards });
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    }

    static async createCard(req, res) {
        try {
            const card = new Card(req.body.title, req.body.subTitle, req.body.path, req.body.description);
            const result = await card.save();
            res.json({ statusCode: 200, data: result });
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    }
}

module.exports = CardController;

// routes/cardRoutes.js
const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/api/cards', CardController.getAllCards);
router.post('/api/cards', CardController.createCard);

module.exports = router;

// server.js
const express = require('express');
const app = express();
const cardRoutes = require('./routes/cardRoutes');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://your_connection_string";
let collection;

async function connectDB() {
    const client = await MongoClient.connect(uri);
    const db = client.db('your_database');
    collection = db.collection('Cards');
    return collection;
}

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/', cardRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB().then(() => {
        console.log('Database Connected');
    }).catch(err => {
        console.error(err);
    });
});