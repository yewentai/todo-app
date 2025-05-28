import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Check, Trash2, Calendar, Target, TrendingUp } from 'lucide-react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  return (
    <div className={`group flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 ${isDeleting ? 'opacity-0 transform translate-x-full' : ''} ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => onToggle(task.id)}
          className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${task.completed
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 shadow-lg shadow-emerald-500/25'
            : 'border-gray-300 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10'
            }`}
        >
          {task.completed && (
            <Check className="w-3 h-3 text-white animate-scale-in" />
          )}
        </button>
        <span
          className={`text-gray-800 transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : 'hover:text-gray-600'
            }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

const StatsCard = ({ icon: Icon, label, value, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500 shadow-blue-500/25",
    green: "from-emerald-500 to-teal-500 shadow-emerald-500/25",
    purple: "from-purple-500 to-pink-500 shadow-purple-500/25"
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

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
  }, [clearError]);

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
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Task Master
        </h1>
        <p className="text-gray-600">Organize your day, achieve your goals</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100/80 backdrop-blur-sm border border-red-300 text-red-700 px-6 py-4 rounded-xl mb-6 flex justify-between items-center shadow-sm">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-700 hover:text-red-900 font-bold text-xl leading-none"
            aria-label="Clear error"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard
          icon={Target}
          label="Total Tasks"
          value={totalCount}
          color="blue"
        />
        <StatsCard
          icon={Check}
          label="Completed"
          value={completedCount}
          color="green"
        />
        <StatsCard
          icon={TrendingUp}
          label="Progress"
          value={`${completionRate}%`}
          color="purple"
        />
      </div>

      {/* Add Task Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 mb-8">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="What needs to be done today?"
              disabled={submitting}
            />
          </div>
          <button
            onClick={addTask}
            disabled={!newTask.trim() || submitting}
            className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-lg transition-all duration-200 flex items-center space-x-2 ${!newTask.trim() || submitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-0.5'
              }`}
          >
            <Plus className="w-5 h-5" />
            <span>{submitting ? 'Adding...' : 'Add Task'}</span>
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <span>Today's Tasks</span>
          </h2>
          {totalCount > 0 && (
            <div className="text-sm text-gray-500">
              {completedCount} of {totalCount} completed
            </div>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
            <p className="text-gray-500">Add your first task above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TaskItem
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </div>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-500">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>


      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}