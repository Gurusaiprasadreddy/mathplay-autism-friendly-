const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'db.json');
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory and db file exist
async function initDB() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }

    try {
        await fs.access(DB_PATH);
    } catch {
        const initialData = { scores: [], feedback: [] };
        await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    }
}

async function readDB() {
    await initDB();
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
}

async function writeDB(data) {
    await initDB();
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
