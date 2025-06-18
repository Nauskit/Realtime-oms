Realtime Order Management System (OMS)
A fullstack Realtime Order Management System built with React, Express.js, MongoDB, and Socket.io. This project includes user authentication, role-based access (admin & user), and real-time communication for live order updates.

🚀 Features
🔐 Authentication & Authorization
JWT-based authentication

Role-based access control (RBAC): Admin & User

📦 Order Management
Create, update, and view orders

Admin dashboard to manage all user orders

Real-time order status updates via Socket.io

🛍️ Product Management
Admin: create, update, delete products

Users: view product list

🧑 User Features
Register / Login

View personal order history

Get real-time updates when order status changes

🛠️ Tech Stack
Layer	Tech
Frontend	React, Vite, TailwindCSS
Backend	Express.js, Node.js, Socket.io, Mongoose
Database	MongoDB
Realtime	WebSocket with Socket.io
Auth	JWT (JSON Web Token)
DevOps	Docker, Docker Compose

📁 Project Structure
bash
Copy
Edit
Realtime-oms/
├── backend/           # Node.js + Express API
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── sockets/
├── frontend/          # React App (Vite + Tailwind)
│   ├── components/
│   ├── pages/
│   └── services/
├── docker-compose.yml
└── README.md

* Getting Started
Prerequisites
Node.js >= 18

Docker & Docker Compose

MongoDB Atlas or local MongoDB

* Clone the Repository
bash
Copy
Edit
git clone https://github.com/Nauskit/Realtime-oms.git
cd Realtime-oms
2️⃣ Environment Variables
Create a .env file inside the /backend folder:

bash
Copy
Edit
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

* Run with Docker Compose
bash
Copy
Edit
docker-compose up --build
This will start:

Frontend on http://localhost:5173

Backend API on http://localhost:3000

👥 User Roles
Admin

Manage products

View & update all orders

User

Place orders

View own order status

📷 Screenshots
(Add screenshots of login page, admin dashboard, real-time order updates, etc.)

* Future Improvements
Add notifications

Payment integration (e.g. Stripe)

Unit & integration tests

Admin analytics dashboard

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License.

