import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      clearError();
    } catch (err) {
      setError('Failed to load tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [API_URL, clearError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      setSubmitting(true);
      clearError();
      const response = await axios.post(`${API_URL}/tasks`, {
        title: newTask.trim()
      });
      setTasks(prev => [...prev, response.data]);
      setNewTask('');
    } catch (err) {
      setError('Failed to add task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      clearError();
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        title: task.title,
        completed: !task.completed
      });
      setTasks(prev => prev.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id) => {
    try {
      clearError();
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !submitting) {
      addTask();
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  if (loading) {
    return (
      <div className="app-container p-4">
        <div className="text-center">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="app-container p-4">
      <h1 className="text-2xl mb-4">To-Do List</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-700 hover:text-red-900 font-bold"
            aria-label="Clear error"
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-4 flex">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border p-2 flex-grow mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a new task"
          disabled={submitting}
        />
        <button
          onClick={addTask}
          disabled={!newTask.trim() || submitting}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </div>

      {totalCount === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks yet. Add one above to get started!
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}

      <div className="mt-4 text-sm text-gray-600 flex justify-between">
        <span>{completedCount} of {totalCount} completed</span>
        {totalCount > 0 && (
          <span>{Math.round((completedCount / totalCount) * 100)}% done</span>
        )}
      </div>
    </div>
  );
}