import React from 'react';
import { Target } from 'lucide-react';

export default function EmptyState() {
    return (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
            <p className="text-gray-500">Add your first task above to get started!</p>
        </div>
    );
}