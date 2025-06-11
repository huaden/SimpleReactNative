import { useState } from "react";
import { Task } from "@/types/Task";



export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<String | null>(null);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false)
    

    //returns tasks with strings that match a given search query
    //currently it tries to match in both title and text description
    const getFilterTasks = (searchQuery: String) => {
        const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return filteredTasks
    };

    //creates a task: all task must have at least a title, but description is optional
    const addTask = (title: string, text: string) => {
        if (title.trim() === '') return;
        setTasks([
        ...tasks, 
        { id: Date.now().toString(), title, text, completed: false }
        ]);
    };


    //updates the task accordingly to the form values and current editing task
    const editTask = (editingTask: Task, title: string, text: string) => {
        if (!editingTask) return;
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: title, text: text} : t));
        setEditingTask(null);
        setFormVisible(false);
    };
    
    //display the form with preloaded values when someone clicks the edit button
    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setFormVisible(true);
    };
    

    //used to set tasks to compeleted when someclicks on the "Done" button
    const toggleComplete = (id: string) => {
        setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    //used to delete tasks after someone confirms their delete
    const deleteTask = () => {
        if (taskToDelete){
        setTasks(tasks.filter(task => task.id !== taskToDelete));
        setTaskToDelete(null);
        setDeleteConfirmVisible(false);
        }
    };

    //brings up the confirmDelete form to ensure user doesn't accidentally delete an item
    const confirmDeleteTask = (id: string) => {
        setTaskToDelete(id);
        setDeleteConfirmVisible(true);
    };

    return {getFilterTasks, addTask, editTask, handleEdit, toggleComplete, deleteTask, confirmDeleteTask, 
        isFormVisible, setFormVisible, editingTask, setEditingTask, deleteConfirmVisible, 
        setDeleteConfirmVisible, taskToDelete, setTaskToDelete}

}
