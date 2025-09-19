import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000/api/v1";

export const TasksProvider = ({ children }) => {
  const { user } = useUserContext();
  const userId = user?._id;

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => setProfileModal(true);

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  // Get all tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`, { withCredentials: true });
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
    setLoading(false);
  };

  // Get single task
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`, { withCredentials: true });
      setTask(response.data);
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  };

  // Create task
  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task, { withCredentials: true });
      setTasks([...tasks, res.data]);
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
      toast.error("Failed to create task");
    }
    setLoading(false);
  };

  // Update task
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task, { withCredentials: true });
      const newTasks = tasks.map((tsk) => (tsk._id === res.data._id ? res.data : tsk));
      setTasks(newTasks);
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("Error updating task", error);
      toast.error("Failed to update task");
    }
    setLoading(false);
  };

  // Delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`, { withCredentials: true });
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
      setTasks(newTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error deleting task", error);
      toast.error("Failed to delete task");
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  // Completed and active tasks
  const completedTasks = tasks.filter((t) => t.completed);
  const activeTasks = tasks.filter((t) => !t.completed);

  // Fetch tasks when userId changes
  useEffect(() => {
    if (userId) getTasks();
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        activeTasks,
        completedTasks,
        profileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => React.useContext(TasksContext);
