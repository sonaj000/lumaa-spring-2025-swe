require('dotenv').config()
const express = require('express') //backend
const cors = require('cors') //requests fromt frontend
const { Pool } = require('pg') //postgrersql
const authenticationRoute = require('./auth')
const taskRoutes = require('./tasks');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/auth", authenticationRoute)
app.use('/tasks', taskRoutes)

const pool = new Pool({connectionString: process.env.DATABASE_URL,});
pool.connect().then(() => console.log('connected to postgresql')).catch(err => console.error('database connection error'));

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});


