# 📝 React Frontend

A modern, responsive React frontend for the Task Master todo application built with Vite, React, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Clean, gradient-based design with glass morphism effects
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant feedback for all task operations
- **Loading States**: Visual indicators for all async operations
- **Error Handling**: User-friendly error messages with dismissal
- **Accessibility**: ARIA labels and keyboard navigation support
- **Animations**: Smooth transitions and micro-interactions
- **Progress Tracking**: Visual progress bar and completion statistics

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom utility classes
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for consistent iconography
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with React-specific rules

## 📦 Project Structure

``` sh
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddTaskForm.jsx  # Task creation form
│   │   ├── EmptyState.jsx   # Empty state display
│   │   ├── ProgressBar.jsx  # Progress visualization
│   │   ├── StatsCard.jsx    # Statistics display cards
│   │   └── TaskItem.jsx     # Individual task component
│   ├── hooks/
│   │   └── useTasks.js      # Custom hook for task management
│   ├── services/
│   │   └── taskService.js   # API communication layer
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles (Tailwind imports)
│   └── setupTests.js        # Test configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## ⚙️ Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 7.0.0 or **yarn** >= 1.22.0

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd todo_app/frontend

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Development Server

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:5173
```

### 4. Building for Production

```bash
# Build the app for production
npm run build

# Preview the production build locally
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 API Integration

The frontend communicates with the FastAPI backend through the [`taskService`](src/services/taskService.js) which provides:

- `getTasks()` - Fetch all tasks
- `addTask(title)` - Create a new task
- `updateTask(id, data)` - Update an existing task
- `deleteTask(id)` - Delete a task

The API URL is configurable via the `VITE_API_URL` environment variable.

## 🎨 Components Overview

### Core Components

- **[`App.jsx`](src/App.jsx)** - Main application component with layout and state management
- **[`useTasks`](src/hooks/useTasks.js)** - Custom hook handling all task-related operations and state

### UI Components

- **[`AddTaskForm`](src/components/AddTaskForm.jsx)** - Form component for creating new tasks
- **[`TaskItem`](src/components/TaskItem.jsx)** - Individual task display with toggle/delete actions
- **[`StatsCard`](src/components/StatsCard.jsx)** - Statistics display cards (total, completed, progress)
- **[`ProgressBar`](src/components/ProgressBar.jsx)** - Visual progress indicator
- **[`EmptyState`](src/components/EmptyState.jsx)** - Friendly empty state when no tasks exist

## 🎯 Key Features

### State Management

- Centralized task state management through the [`useTasks`](src/hooks/useTasks.js) hook
- Optimistic updates with error rollback
- Loading states for individual operations (add, toggle, delete)

### User Experience

- Keyboard shortcuts (Enter to add tasks)
- Visual feedback for all interactions
- Smooth animations and transitions
- Responsive design for all screen sizes

### Error Handling

- Graceful error handling with user-friendly messages
- Network error recovery
- Input validation

## 🔧 Configuration

### Vite Configuration

The [`vite.config.js`](vite.config.js) includes:

- React plugin
- Tailwind CSS plugin
- Vitest testing setup
- Development server configuration

### ESLint Configuration

The [`eslint.config.js`](eslint.config.js) includes:

- React-specific rules
- React Hooks rules
- Modern JavaScript standards

## 🚀 Deployment

### Build Process

```bash
npm run build
```

### Deployment Options

- **Netlify**: Deploy the `dist/` folder
- **Vercel**: Connect your repository for automatic deployments
- **Static Hosting**: Upload the `dist/` folder to any static hosting service

## 🤝 Contributing

1. Follow the existing code style and component patterns
2. Add tests for new features
3. Update documentation as needed
4. Ensure all linting passes: `npm run lint`

## 📄 License

This project is part of the Task Master todo application. See the main project README for license information.
