const express = require('express');
const { Pool } = require('pg');
const authenticateToken = require('./authentication');

require('dotenv').config();

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// 🔹 Get all tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    const userID = req.userID;

    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE userID = $1', [userID]);
        res.json(tasks.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 🔹 Create a new task
router.post('/', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    const userID = req.userID;

    try {
        const newTask = await pool.query(
            'INSERT INTO tasks (title, description, bisComplete, userID) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, false, userID]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 🔹 Update a task (mark complete, edit text)
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

// 🔹 Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const taskID = req.params.id;
    const userID = req.userID;

    try {
        const deletedTask = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND userID = $2 RETURNING *',
            [taskID, userID]
        );

        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

