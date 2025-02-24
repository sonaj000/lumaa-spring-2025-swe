import React, { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import { useNavigate } from "react-router-dom";

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<{ 
        id: number; 
        title: string; 
        description: string; 
        bisComplete: boolean;
    }[]>([]);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchTasks = useCallback(async () => {
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const response = await getTasks(token);
            setTasks(response.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async () => {
        await createTask(title, description, token!);
        setTitle("");
        setDescription("");
        fetchTasks();
    };

    const handleUpdateTask = async (task: { 
        id: number; 
        title: string; 
        description: string; 
        bisComplete: boolean;
    }) => {
        try {
            // ✅ Ensure `bisComplete` is passed correctly
            const updatedTask = await updateTask(task.id, token!, task.title, task.description, task.bisComplete);

            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === task.id
                        ? { ...t, title: updatedTask.title, description: updatedTask.description, bisComplete: updatedTask.bisComplete }
                        : t
                )
            );

            setEditingTask(null); // ✅ Exit edit mode after saving
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        await deleteTask(taskId, token!);
        fetchTasks();
    };

    const handleToggleComplete = async (task: { 
        id: number; 
        title: string; 
        description: string; 
        bisComplete: boolean;
    }) => {
        try {
            const updatedTask = { ...task, bisComplete: !task.bisComplete };
            await updateTask(task.id, token!, updatedTask.title, updatedTask.description, updatedTask.bisComplete);

            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
            );
        } catch (error) {
            console.error("Error toggling task completion:", error);
        }
    };

    const startEditing = (task: any) => {
        setEditingTask(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    return (
        <div>
            <h2>Task List</h2>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleCreateTask}>Add Task</button>

            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>
                        {editingTask === task.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                                <button onClick={() => handleUpdateTask({ 
                                    id: task.id, 
                                    title: editTitle, 
                                    description: editDescription, 
                                    bisComplete: task.bisComplete
                                })}>Save</button>
                                <button onClick={() => setEditingTask(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span>{task.title} - {task.description} - {task.bisComplete ? "✅ Completed" : "❌ Not Completed"}</span>
                                <button onClick={() => startEditing(task)}>Edit</button>
                                <button onClick={() => handleToggleComplete(task)}>
                                    {task.bisComplete ? "Mark Incomplete" : "Mark Complete"}
                                </button>

                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;





