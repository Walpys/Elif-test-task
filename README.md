# 🛒 Elif-test-task

A full-stack delivery application with multi-shop support, persistent cart, and order history tracking.

## 🚀 Live Links
* **Frontend App:** [https://elif-test-task-site.onrender.com/](https://elif-test-task-site.onrender.com/)
* **Backend API:** [https://elif-test-task.onrender.com/api](https://elif-test-task.onrender.com/api)

## 🛠️ Tech Stack
* **Frontend:** React 19, TypeScript, Vite, Axios, Lucide React
* **Backend:** Node.js (Express 5), Prisma ORM, Zod, Swagger
* **Database:** PostgreSQL (hosted on Render)

---

## ⚙️ How to Run Locally

### 1. Clone the repository
```bash
git clone [https://github.com/Walpys/Elif-test-task.git](https://github.com/Walpys/Elif-test-task.git)
cd Elif-test-task

2. Install dependencies
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

3. Environment Variables
Backend: Create a .env file in the backend/ directory:
DATABASE_URL="your_postgresql_connection_string"
API_KEY="your_secret_api_key"

Frontend: Create a .env file in the frontend/ directory:
VITE_API_URL="http://localhost:10000/api"
VITE_API_KEY="your_secret_api_key"

Start the development server
Bash
# Run Backend (from backend folder)
npx prisma generate
npm run dev

# Run Frontend (from frontend folder)
npm run dev

This project is licensed under the ISC License.
