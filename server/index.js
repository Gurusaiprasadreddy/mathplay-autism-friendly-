const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { readDB, writeDB } = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/status', (req, res) => {
    res.json({ status: 'active', message: 'Mathplay Backend is running' });
});

// GET /api/scores - Retrieve all scores
app.get('/api/scores', async (req, res) => {
    try {
        const db = await readDB();
        res.json(db.scores);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read scores' });
    }
});

// POST /api/score - Save a new score
app.post('/api/score', async (req, res) => {
    try {
        const { topic, score, difficulty } = req.body;
        if (!topic || score === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = await readDB();
        const newScore = {
            id: Date.now(),
            date: new Date().toISOString(),
            topic,
            score,
            difficulty,
        };
        db.scores.push(newScore);
        await writeDB(db);

        res.status(201).json({ message: 'Score saved', data: newScore });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save score' });
    }
});

// POST /api/feedback - Save user feedback
app.post('/api/feedback', async (req, res) => {
    try {
        const { type, message, rating } = req.body;
        const db = await readDB();
        const newFeedback = {
            id: Date.now(),
            date: new Date().toISOString(),
            type,
            message,
            rating
        };
        db.feedback.push(newFeedback);
        await writeDB(db);

        res.status(201).json({ message: 'Feedback received' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

// POST /api/cartoon-feedback - Save cartoon game feedback
app.post('/api/cartoon-feedback', async (req, res) => {
    try {
        const feedbackData = req.body;
        const db = await readDB();

        // Ensure cartoonFeedback array exists (migration for existing db)
        if (!db.cartoonFeedback) {
            db.cartoonFeedback = [];
        }

        const newFeedback = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...feedbackData
        };
        db.cartoonFeedback.push(newFeedback);
        await writeDB(db);

        res.status(201).json({ message: 'Cartoon feedback saved' });
    } catch (error) {
        console.error('Error saving cartoon feedback:', error);
        res.status(500).json({ error: 'Failed to save cartoon feedback' });
    }
});

// Serve frontend in production (optional for now, but good practice)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
