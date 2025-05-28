import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState({
    add: false,
    toggle: {},
    delete: {}
  });

  const clearError = useCallback(() => setError(null), []);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.data);
      clearError();
    } catch (err) {
      setError('Failed to load tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [clearError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title) => {
    if (!title.trim()) return;

    try {
      setOperationLoading(prev => ({ ...prev, add: true }));
      clearError();
      const response = await taskService.addTask(title.trim());
      setTasks(prev => [...prev, response.data]);
      return true;
    } catch (err) {
      setError('Failed to add task. Please try again.');
      return false;
    } finally {
      setOperationLoading(prev => ({ ...prev, add: false }));
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      setOperationLoading(prev => ({
        ...prev,
        toggle: { ...prev.toggle, [id]: true }
      }));
      clearError();
      const response = await taskService.updateTask(id, {
        title: task.title,
        completed: !task.completed
      });
      setTasks(prev => prev.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update task. Please try again.');
    } finally {
      setOperationLoading(prev => ({
        ...prev,
        toggle: { ...prev.toggle, [id]: false }
      }));
    }
  };

  const deleteTask = async (id) => {
    try {
      setOperationLoading(prev => ({
        ...prev,
        delete: { ...prev.delete, [id]: true }
      }));
      clearError();
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    } finally {
      setOperationLoading(prev => ({
        ...prev,
        delete: { ...prev.delete, [id]: false }
      }));
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  return {
    tasks,
    loading,
    error,
    operationLoading,
    addTask,
    toggleTask,
    deleteTask,
    clearError,
    stats: { completedCount, totalCount, completionRate }
  };
}