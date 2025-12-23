# Branch International – CS Messaging Web App

## 📌 Overview
This project is a Customer Support Messaging Web Application built for Branch International.  
It is designed to help support agents efficiently manage high volumes of customer inquiries, prioritize urgent issues, and respond quickly using a clean and scalable interface.

---

## ✨ Key Features
- Agent dashboard for handling customer messages
- Automatic urgency detection (HIGH / LOW priority)
- Search functionality across messages and customers
- Message status lifecycle (NEW → RESOLVED)
- Canned replies for faster agent responses
- Customer context panel for better decision-making
- Light and Dark mode support
- Smooth animations and real-time feel
- Messages persist in MongoDB database

---

## 🛠 Tech Stack
**Frontend**
- React.js
- CSS (custom styling & animations)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas

---

## 🏗 Architecture
- Customer messages are ingested via REST APIs
- Messages are stored in MongoDB
- Frontend fetches messages and displays them in the agent dashboard
- Agents can respond to messages and mark them as resolved

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm
- MongoDB Atlas account (or local MongoDB)

---

### Backend Setup
```bash
cd backend
npm install
npx nodemon index.js
