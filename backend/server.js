const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = 3001;

const client = new Client({
    host: 'database',
    user: 'user',
    password: 'password',
    database: 'mydb',
    port: 5432
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Database connection error', err));

app.get('/', (req, res) => {
    res.send('Hello from Node.js Backend!');
});

app.get('/users', async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

