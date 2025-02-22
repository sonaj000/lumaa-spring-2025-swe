const express = require('express');
const { Pool } = require('pg');
const authenticateToken = require('./authentication'); // Protect routes

require('dotenv').config();

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// GET all tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    console.log("Debug: userID from JWT:", req.userID);
    const userID = req.userID;

    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE userID = $1', [userID]);

        console.log("Tasks Retrieved:", tasks.rows);
        res.json(tasks.rows);
    } catch (err) {
        console.error("Error retrieving tasks:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new task
router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const userID = req.userID;

    try {
        const newTask = await pool.query(
            'INSERT INTO tasks (title, description, userID) VALUES ($1, $2, $3) RETURNING *',
            [title, description, userID]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// UPDATE a task
router.put('/:id', authenticateToken, async (req, res) => {
    const { title, description, bisComplete } = req.body;
    const taskID = req.params.id;
    const userID = req.userID;

    try {
        const updatedTask = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, bisComplete = $3 WHERE id = $4 AND userID = $5 RETURNING *',
            [title, description, bisComplete, taskID, userID]
        );

        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const taskID = req.params.id;
    const userID = req.userID;

    try {
        const deletedTask = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND userID = $2 RETURNING *', [taskID, userID]
        );
        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;



