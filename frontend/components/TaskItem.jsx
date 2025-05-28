import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export default function TaskItem({
    task,
    onToggle,
    onDelete,
    isToggling,
    isDeleting
}) {
    return (
        <div className={`group flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 ${isDeleting ? 'opacity-0 transform translate-x-full' : ''} ${task.completed ? 'opacity-75' : ''}`}>
            <div className="flex items-center space-x-3 flex-1">
                <button
                    onClick={() => onToggle(task.id)}
                    disabled={isToggling}
                    aria-label={task.completed ? 'Uncomplete task' : 'Complete task'}
                    className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${task.completed
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 shadow-lg shadow-emerald-500/25'
                        : 'border-gray-300 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10'
                        }`}
                >
                    {task.completed && (
                        <Check className="w-3 h-3 text-white animate-scale-in" />
                    )}
                    {isToggling && (
                        <div className="absolute inset-0 border-t-2 border-t-emerald-500 rounded-full animate-spin"></div>
                    )}
                </button>
                <span
                    className={`text-gray-800 transition-all duration-300 ${task.completed ? 'line-through text-gray-500' : 'hover:text-gray-600'}`}
                >
                    {task.title}
                </span>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                disabled={isDeleting}
                aria-label="Delete task"
                className={`p-2 text-gray-400 rounded-lg transition-all duration-200 ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50'}`}
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}