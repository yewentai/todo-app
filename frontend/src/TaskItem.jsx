import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className="flex items-center justify-between mb-2">
            <span
                onClick={() => onToggle(task.id)}
                className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
                {task.title}
            </span>
            <button onClick={() => onDelete(task.id)} className="text-red-500">
                Delete
            </button>
        </li>
    );
}