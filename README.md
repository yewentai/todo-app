# 📝 Task Master - Full-Stack Todo Application

A modern, responsive full-stack Todo application with a clean UI and robust API, built with:

* **Backend:** FastAPI (Python) - RESTful API with validation and error handling
* **Frontend:** React + Vite - Modern component-based UI with hooks
* **Styling:** Tailwind CSS - Utility-first styling with custom components
* **Testing:** pytest (Backend) & Vitest + React Testing Library (Frontend)
* **Deployment:** Render.com ready backend, static hosting ready frontend

---

## ✨ Features

### Core Functionality

* **Full CRUD Operations** - Create, read, update, and delete tasks
* **Task Completion** - Mark tasks as completed with visual feedback
* **Task Statistics** - Real-time progress tracking and completion rates
* **Duplicate Prevention** - Business logic to prevent duplicate task titles
* **Input Validation** - Comprehensive client and server-side validation

### User Experience

* **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
* **Modern UI** - Glass morphism effects with smooth animations
* **Loading States** - Visual feedback for all async operations
* **Error Handling** - User-friendly error messages with recovery options
* **Accessibility** - ARIA labels and keyboard navigation support

### Technical Features

* **RESTful API** - Well-structured endpoints with proper HTTP status codes
* **CORS Configuration** - Seamless frontend-backend integration
* **Auto-documentation** - Interactive API docs with Swagger UI
* **Component Architecture** - Modular, reusable React components
* **Custom Hooks** - Centralized state management with `useTasks`

---

## 📦 Project Structure

``` sh
todo_app/
├── backend/
│   ├── main.py              # FastAPI application with all endpoints
│   ├── requirements.txt     # Python dependencies
│   ├── render.yaml         # Render.com deployment configuration
│   └── test/
│       └── test_main.py    # Comprehensive test suite
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AddTaskForm.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js  # Custom hook for task management
│   │   ├── services/
│   │   │   └── taskService.js # API communication layer
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Application entry point
│   │   ├── index.css        # Global styles (Tailwind imports)
│   │   ├── App.test.jsx     # Component tests
│   │   └── setupTests.js    # Test configuration
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies and scripts
│   ├── vite.config.js       # Vite configuration with testing setup
│   └── eslint.config.js     # ESLint configuration
└── README.md               # This file
```

---

## ⚙️ Prerequisites

* **Node.js** ≥ 16.0.0 & **npm** ≥ 7.0.0
* **Python** ≥ 3.8 & **pip**
* (Optional) **Virtual Environment** - Recommended for Python dependencies
* (Optional) **WSL2** or Unix-like shell for development

---

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd todo_app
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will be running at:**

* **API:** <http://localhost:8000>
* **Interactive Docs:** <http://localhost:8000/docs>
* **Alternative Docs:** <http://localhost:8000/redoc>

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
echo "VITE_API_URL=http://localhost:8000" > .env

# Start development server
npm run dev
```

**Frontend will be running at:** <http://localhost:5173>

---

## 🔌 API Endpoints

### Task Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Create new task |
| `GET` | `/tasks/{id}` | Get specific task |
| `PUT` | `/tasks/{id}` | Update task |
| `DELETE` | `/tasks/{id}` | Delete task |
| `GET` | `/tasks/stats` | Get task statistics |

### Example API Usage

```bash
# Create a task
curl -X POST "http://localhost:8000/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn FastAPI", "completed": false}'

# Get all tasks
curl http://localhost:8000/tasks

# Get statistics
curl http://localhost:8000/tasks/stats
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage
pytest --cov=main
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 📈 Deployment

### Backend Deployment (Render.com)

1. Push your code to GitHub
2. Connect your repository to Render.com
3. The `render.yaml` file will automatically configure the deployment
4. Your API will be available at your Render URL

### Frontend Deployment

#### Netlify/Vercel

```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

#### Manual Static Hosting

```bash
cd frontend
npm run build
# Upload contents of dist/ folder to your hosting service
```

### Environment Variables

Set the production API URL in your frontend deployment:

```env
VITE_API_URL=https://your-backend-api.com
```

---

## 🏗️ Architecture

### Backend Architecture

* **FastAPI Framework** - Modern, fast Python web framework

* **Pydantic Models** - Data validation and serialization
* **In-Memory Storage** - Simple `TaskStorage` class for demo purposes
* **CORS Middleware** - Configured for frontend integration
* **Structured Logging** - Request and operation logging

### Frontend Architecture

* **Component-Based** - Modular React components

* **Custom Hooks** - `useTasks` for centralized state management
* **Service Layer** - Abstracted API communication
* **Tailwind CSS** - Utility-first styling approach
* **Modern Build Tools** - Vite for fast development and building

---

## 🎨 UI Components

* **AddTaskForm** - Task creation with validation
* **TaskItem** - Individual task with toggle/delete actions
* **StatsCard** - Statistics display (total, completed, progress)
* **ProgressBar** - Visual progress indicator
* **EmptyState** - Friendly empty state display

---

## 🔧 Development

### Adding New Features

1. **Backend**: Add endpoints in `main.py`, update models as needed
2. **Frontend**: Create components in `src/components/`, update services
3. **Testing**: Add tests for both backend (`test/`) and frontend
4. **Documentation**: Update this README with new features

### Code Quality

* **ESLint** - JavaScript/React linting

* **Pytest** - Python testing framework
* **Type Hints** - Python type annotations
* **Error Handling** - Comprehensive error handling on both ends

---

## 🛡️ Security Notes

* **CORS**: Currently configured for development (`*` origin)
* **Input Validation**: Server-side validation with Pydantic
* **Error Handling**: No sensitive information exposed in errors
* **For Production**: Implement authentication, rate limiting, and database persistence

---

## 🔮 Future Enhancements

### Planned Features

* [ ] **Database Integration** (PostgreSQL/SQLite)

* [ ] **User Authentication** (JWT tokens)
* [ ] **Task Categories** and **Tags**
* [ ] **Due Dates** and **Priorities**
* [ ] **Task Search** and **Filtering**
* [ ] **Dark/Light Mode** toggle
* [ ] **Real-time Updates** (WebSockets)
* [ ] **Mobile App** (React Native)

### Technical Improvements

* [ ] **CI/CD Pipeline** (GitHub Actions)

* [ ] **Docker Containerization**
* [ ] **Database Migrations**
* [ ] **API Versioning**
* [ ] **Performance Monitoring**
* [ ] **Automated Testing** in CI
