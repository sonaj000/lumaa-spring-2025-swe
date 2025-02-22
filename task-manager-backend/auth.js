const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

require('dotenv').config();

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Registering new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (checkUser.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the hashed password in the database
    await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Checking user:", username);

    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
        console.log("User not found!");
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log("User found:", user.rows[0]);

    // Compare password
    const comparison = await bcrypt.compare(password, user.rows[0].password);
    console.log("Password match:", comparison);

    if (!comparison) {
        console.log("Wrong password!");
        return res.status(400).json({ error: "Invalid credentials" });
    }

    // Fix: Use `userID` instead of `userId`
    const token = jwt.sign({ userID: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;

