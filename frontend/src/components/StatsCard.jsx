import React from 'react';

export default function StatsCard({ icon: Icon, label, value, color = "blue" }) {
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
}