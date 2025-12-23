# Branch International – CS Messaging Web App

## 📌 Overview
This project is a **Customer Support Messaging Web Application** built for **Branch International**.  
It is designed to help customer support agents efficiently manage a high volume of customer inquiries, prioritize urgent issues, and respond quickly through a clean, scalable interface.

The application simulates Branch’s in-app chat system and focuses on **agent productivity, urgency handling, and workflow clarity**.

---

## ✨ Features

- Agent dashboard for handling customer messages
- Automatic **urgency detection** (HIGH / LOW priority)
- Message lifecycle management (NEW → RESOLVED)
- Search across customer messages
- Filters for **All**, **Urgent**, and **Resolved** messages
- Canned replies for faster agent responses
- Customer context panel for better decision-making
- Light & Dark mode toggle with persisted preference
- Smooth UI animations and transitions
- Messages stored and retrieved from a database

---

## 🛠 Tech Stack

### Frontend
- React.js
- JavaScript
- CSS (custom styling & animations)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

---

## 🏗 Architecture Overview

- Customer messages are ingested via REST API endpoints
- Messages are stored in MongoDB
- The frontend fetches messages and displays them in an agent dashboard
- Agents can respond to messages, which updates message status automatically
- The system is modular and designed to scale with increased message volume

---

## ⚙️ Setup Instructions

### Prerequisites
Ensure the following are installed on your system:
- Node.js (v16 or higher)
- npm
- MongoDB Atlas account (or local MongoDB)

---

### Backend Setup

```bash
cd backend
npm install
npx nodemon index.js
