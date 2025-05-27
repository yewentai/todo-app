# 📝 To-Do App (FastAPI + React + Vite)

A minimal full-stack To-Do List application built with:

* **Backend:** FastAPI (Python)
* **Frontend:** React + Vite
* **Styling:** Tailwind-inspired utility classes + custom CSS
* **Testing:** pytest (FastAPI) & Vitest + React Testing Library (React)

---

## 🚀 Features

* Create, read, update, delete (CRUD) tasks
* Mark tasks as completed
* Task statistics endpoint (`/tasks/stats`)
* In-memory storage (ephemeral)
* Simple CORS setup for local development

---

## 📦 Project Structure

```
.
├── backend
│   ├── main.py           # FastAPI app
│   ├── requirements.txt  # Python dependencies
│   ├── render.yaml       # Render.com deploy config
│   └── tests
│       └── test_main.py  # pytest tests
└── frontend
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.jsx
    │   ├── TaskItem.jsx
    │   ├── App.test.jsx
    │   ├── setupTests.js
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Prerequisites

* **Node.js** ≥ 16 & **npm**
* **Python** ≥ 3.9 & **pip**
* (Optional) [WSL2](https://docs.microsoft.com/windows/wsl/) or a Unix-like shell

---

## 🛠️ Setup & Run

### 1. Backend

```bash
cd backend
python3 -m venv .venv          # optional
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

* **Health check:** `GET http://localhost:8000/`
* **Tasks API:**

  * `GET  /tasks`
  * `POST /tasks`
  * `GET  /tasks/{id}`
  * `PUT  /tasks/{id}`
  * `DELETE /tasks/{id}`
  * `GET  /tasks/stats`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

* Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Tests

### Backend (pytest)

```bash
cd backend
python -m pytest -q
```

### Frontend (Vitest)

```bash
cd frontend
npm test
```

---

## 📈 Deployment

* **Backend:**

  * Configured for [Render.com](https://render.com) via `render.yaml`.
* **Frontend:**

  * Deploy to Netlify, Vercel, or any static-hosting service.
  * Build with `npm run build`, then publish the `dist/` folder.

---

## 🔮 Next Steps

* Swap in a real database (SQLite/PostgreSQL) for persistence
* Add user authentication
* Implement task due dates, priorities, and filters
* Enhance UI with dark/light mode toggle and animations
* Add CI pipeline to run tests on every push

---

> **Note:** This is a demo project—data is **not** persisted across server restarts.
