# CrowdFlow AI 🏟️

**Smart Stadium Experience Platform**

## 💡 The Problem
Large-scale sporting events consistently face systemic bottlenecks: sudden congestion at gates, excessive wait times for concessions, and overcrowded washrooms. This lack of real-time crowd visibility diminishes the attendee experience and forces venue operations teams into reactive, uncoordinated responses.

## 🚀 The Solution
CrowdFlow AI is a real-time, AI-driven crowd management platform. It empowers **Fans** with live venue maps and smart routing to avoid long lines, while providing **Operations Staff** with a centralized command dashboard that predicts surges and uses Google's Gemini AI to deploy staff effectively.

## ✨ Features
*   **Live Venue Heatmap:** Real-time visibility into crowd density across the stadium.
*   **Wait Time Predictor:** Accurate queue estimates for concessions and gates.
*   **Gemini AI Recommendations:** Automated deployment strategies generated for staff when congestion reaches critical levels.
*   **Smart Detour Routing:** Recommends the nearest, least-crowded alternative to fans avoiding heavy traffic.

## 🛠️ Tech Stack
*   **Frontend:** React, Tailwind CSS, Vite, Lucide React
*   **Backend:** FastAPI (Python), Uvicorn
*   **AI Engine:** Google Gemini API (`@google/genai`)
*   **Data:** In-memory Mock Simulator Loop (Hackathon MVP)

## 🏎️ Running Locally

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or `.\venv\Scripts\activate` on Windows
pip install -r requirements.txt
export GEMINI_API_KEY="your_api_key_here"  # Optional: Fallbacks exist if omitted
uvicorn main:app --reload
```
*The API will be available at `http://localhost:8000`*

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*The app will be available at `http://localhost:5173`*
*   **Fan Dashboard:** `/`
*   **Operations Dashboard:** `/ops`

## 🔮 What's Next
*   Integration with physical IoT turnstile sensors.
*   Persistent state management using Firebase Firestore.
*   Push Notification integration for attendees via Service Workers.
