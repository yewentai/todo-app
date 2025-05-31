import React from 'react';
import { Plus } from 'lucide-react';

export default function AddTaskForm({
    newTask,
    setNewTask,
    onSubmit,
    isSubmitting
}) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isSubmitting && newTask.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 mb-8">
            <div className="flex space-x-3">
                <div className="flex-1 relative">
                    <input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                        placeholder="What needs to be done today?"
                        disabled={isSubmitting}
                        aria-label="Add new task"
                    />
                </div>
                <button
                    onClick={onSubmit}
                    disabled={!newTask.trim() || isSubmitting}
                    aria-label="Add task"
                    className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-lg transition-all duration-200 flex items-center space-x-2 ${!newTask.trim() || isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-0.5'
                        }`}
                >
                    <Plus className="w-5 h-5" />
                    <span>{isSubmitting ? 'Adding...' : 'Add Task'}</span>
                </button>
            </div>
        </div>
    );
}