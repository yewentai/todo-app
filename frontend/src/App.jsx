import React, { useState } from 'react';
import { Calendar, Target, Check, TrendingUp } from 'lucide-react';
import useTasks from './hooks/useTasks';
import TaskItem from './components/TaskItem';
import StatsCard from './components/StatsCard';
import ProgressBar from './components/ProgressBar';
import EmptyState from './components/EmptyState';
import AddTaskForm from './components/AddTaskForm';

export default function App() {
  const [newTask, setNewTask] = useState('');
  const {
    tasks,
    loading,
    error,
    operationLoading,
    addTask,
    toggleTask,
    deleteTask,
    clearError,
    stats
  } = useTasks();

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const success = await addTask(newTask);
      if (success) setNewTask('');
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
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
            value={stats.totalCount}
            color="blue"
          />
          <StatsCard
            icon={Check}
            label="Completed"
            value={stats.completedCount}
            color="green"
          />
          <StatsCard
            icon={TrendingUp}
            label="Progress"
            value={`${stats.completionRate}%`}
            color="purple"
          />
        </div>

        {/* Add Task Form */}
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onSubmit={handleAddTask}
          isSubmitting={operationLoading.add}
        />

        {/* Tasks List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span>Today's Tasks</span>
            </h2>
            {stats.totalCount > 0 && (
              <div className="text-sm text-gray-500">
                {stats.completedCount} of {stats.totalCount} completed
              </div>
            )}
          </div>

          {stats.totalCount === 0 ? (
            <EmptyState />
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
                    isToggling={operationLoading.toggle[task.id]}
                    isDeleting={operationLoading.delete[task.id]}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Progress Bar */}
          {stats.totalCount > 0 && (
            <ProgressBar percentage={stats.completionRate} />
          )}
        </div>
      </div>
    </div>
  );
}