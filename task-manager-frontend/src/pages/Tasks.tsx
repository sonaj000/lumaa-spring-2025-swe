import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        if (!token) return;
        const response = await getTasks(token);
        setTasks(response.data);
    };

    const handleCreateTask = async () => {
        if (!token) return;
        await createTask(title, description, token);
        fetchTasks();
    };

    const handleUpdateTask = async (taskId: number, title: string, description: string, bisComplete: boolean) => {
        if (!token) return;
        await updateTask(taskId, title, description, bisComplete, token);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId: number) => {
        if (!token) return;
        await deleteTask(taskId, token);
        fetchTasks();
    };

    return (
        <div>
            <h2>Task List</h2>
            <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleCreateTask}>Add Task</button>

            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>
                        <span>{task.title} - {task.description}</span>
                        <button onClick={() => handleUpdateTask(task.id, task.title, task.description, !task.bisComplete)}>
                            {task.bisComplete ? "Mark Incomplete" : "Mark Complete"}
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
