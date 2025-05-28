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
        <div className={`task-item group flex items-center justify-between p-5 glass-panel rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${isDeleting ? 'opacity-0 transform translate-x-full' : ''} ${task.completed ? 'opacity-75' : ''}`}>
            <div className="flex items-center space-x-4 flex-1">
                <button
                    onClick={() => onToggle(task.id)}
                    className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 ${task.completed
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 shadow-lg shadow-emerald-500/25'
                        : 'border-slate-300 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10'
                        }`}
                >
                    {task.completed && (
                        <Check className="w-4 h-4 text-white animate-scale-in" />
                    )}
                </button>
                <span
                    className={`text-lg text-slate-800 transition-all duration-300 ${task.completed ? 'line-through text-slate-500' : 'hover:text-slate-700'
                        }`}
                >
                    {task.title}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-200"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

const StatsCard = ({ icon: Icon, label, value, color = "blue" }) => {
    const colorClasses = {
        blue: "from-indigo-500 to-violet-500 shadow-indigo-500/25",
        green: "from-emerald-500 to-teal-500 shadow-emerald-500/25",
        purple: "from-violet-500 to-purple-500 shadow-violet-500/25"
    };

    const iconBg = {
        blue: "bg-indigo-100 text-indigo-600",
        green: "bg-emerald-100 text-emerald-600",
        purple: "bg-violet-100 text-violet-600"
    };

    return (
        <div className="glass-panel rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${iconBg[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-600 font-medium">{label}</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="border-4 border-slate-200 border-t-indigo-600 rounded-full w-14 h-14 mx-auto mb-6 loading-spinner"></div>
                    <p className="text-lg text-slate-600 font-medium">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl w-full px-4">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-3">
                    Task Master
                </h1>
                <p className="text-lg text-slate-600 max-w-md mx-auto">Organize your day, achieve your goals with simplicity</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="glass-panel bg-red-50/80 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex justify-between items-center shadow-sm animate-fade-in">
                    <span className="font-medium">{error}</span>
                    <button
                        onClick={clearError}
                        className="text-red-700 hover:text-red-900 font-bold text-xl leading-none p-1"
                        aria-label="Clear error"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
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
            <div className="glass-panel rounded-2xl p-6 shadow-lg mb-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-5 py-4 bg-white/50 text-lg border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                            placeholder="What needs to be done today?"
                            disabled={submitting}
                        />
                    </div>
                    <button
                        onClick={addTask}
                        disabled={!newTask.trim() || submitting}
                        className={`floating-action px-6 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 text-lg ${!newTask.trim() || submitting
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:opacity-95'
                            }`}
                    >
                        <Plus className="w-6 h-6" />
                        <span>{submitting ? 'Adding...' : 'Add Task'}</span>
                    </button>
                </div>
            </div>

            {/* Tasks List */}
            <div className="glass-panel rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-indigo-500" />
                        <span>Today's Tasks</span>
                    </h2>
                    {totalCount > 0 && (
                        <div className="text-lg font-medium text-slate-600">
                            {completedCount}/{totalCount}
                        </div>
                    )}
                </div>

                {totalCount === 0 ? (
                    <div className="text-center py-12 animate-fade-in">
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Target className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">Your task list is empty</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Add your first task to get started. What do you want to accomplish today?
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
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
                    <div className="mt-8 pt-6 border-t border-slate-200/50 animate-fade-in">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-base font-medium text-slate-700">Overall Progress</span>
                            <span className="text-base font-semibold text-slate-800">{completionRate}%</span>
                        </div>
                        <div className="progress-bar w-full h-2.5 rounded-full overflow-hidden bg-slate-100">
                            <div
                                className="progress-fill h-full rounded-full"
                                style={{ width: `${completionRate}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="text-center mt-10 mb-6 text-slate-500 text-sm">
                <p>Made with ❤️ | Task Master v1.0</p>
            </div>
        </div>
    );
}