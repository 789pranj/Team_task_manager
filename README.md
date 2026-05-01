# 🗂️ Team Task Manager (MERN Stack)

A full-stack Task Management System built using the MERN stack with authentication, project management, task tracking, and role-based access control.

---

## 🚀 Live Demo
[https://your-deployed-link.onrender.com](https://team-task-manager-1-899j.onrender.com/)

---

## 📌 Features

### 🔐 Authentication
- User Signup / Login
- JWT-based authentication
- Secure cookie-based sessions

### 👥 Users & Roles
- Admin (Project creator)
- Members (Joined users)

### 📁 Project Management
- Create projects
- Add members to project (by user ID/email logic extension)
- View all user projects

### ✅ Task Management
- Create tasks inside projects
- Assign tasks to users
- Update task status:
  - To Do
  - In Progress
  - Done
- Set priority (Low / Medium / High)
- Add due date

### 🔄 Task Workflow
- Move tasks between statuses
- Track assigned user
- Project-wise task segregation

### 📊 Dashboard
- Total tasks
- Tasks by status
- Project-wise filtering

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Zustand (State Management)
- Tailwind CSS
- Lucide React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser
- CORS

---

## 📁 Project Structure
Team_task_manager/
│
├── backend/
│ ├── controller/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── store/
│ └── pages/


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/Team_task_manager.git
cd Team_task_manager
```

## Backend setup
cd backend
npm install
npm run dev

## Fronted Setup
cd frontend
npm install
npm run dev
