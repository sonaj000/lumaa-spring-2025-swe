const express = require('express');
const { Pool } = require('pg');
const authenticateToken = require('./authMiddleware'); // Protect routes

require('dotenv').config();

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});