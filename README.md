# Task Manager App

For this task management app, the Frontend using React + TypeScript is found in the task-manager frontend folder, and the backend logic regarding postgreSQL is found in the task-manager-backend folder. 
**Task Management** This application uses:
- **Frontend**: React + TypeScript  
- **Backend**: Node.js + Express  
- **Database**: PostgreSQL  

## Features
**User Authentication** (Register/Login)  
**JWT-based Authorization** (Protect routes)  
**Task Management** (CRUD operations)  
**Persistent Storage** with PostgreSQL  

---

## 🚀 Setup Guide

### **Backend Setup**
#### ** Prerequisites**
- Install [Node.js](https://nodejs.org/)  
- Install [PostgreSQL](https://www.postgresql.org/download/)

#### ** Install & Run Backend**
```sh
cd task-manager-backend
npm install
npm run dev

Create a .env file in the backend directory with the following:

Server Port
PostgreSQL Database Connection String
JWT Secret Key

Create tables in the PostgreSQL database usig the following SQL commands. 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    bisComplete BOOLEAN DEFAULT false,
    userID INTEGER REFERENCES users(id) ON DELETE CASCADE
);

**Front End**
Install & Run Frontend using these commands:
cd task-manager-frontend
npm install
npm start

Video_Demo_Link: https://www.loom.com/share/298b105f115045b9a01548680b8d9358?sid=45503d2f-6325-47b0-89e4-1fb6702a1e6c

*Monthly Salary Expectations*
- 25-30 dollars an hour

