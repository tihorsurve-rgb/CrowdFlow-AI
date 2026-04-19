# CrowdFlow AI - Product Requirements Document (PRD)

## 1. Product Overview
**Name:** CrowdFlow AI
**Summary:** A web-based Minimum Viable Product (MVP) designed for large sporting venues. It improves the physical event experience by reducing crowd congestion, minimizing wait times, and improving coordination between attendees and venue staff in real time.
**Target Audience:**
1. Fans attending the event.
2. Venue operations staff.

## 2. Core Features & Requirements

### 2.1 Fan-Side Features
*   **Live Venue Map:** Visual representation of the venue with crowd density overlaid by zone.
*   **Queue Time Estimates:** Real-time waiting time estimates for concessions, gates, and washrooms.
*   **Best Route Recommendation:** Turn-by-turn or zone-based routing from the user's current location to their destination avoiding heavy crowd traffic.
*   **Smart Concession Recommendation:** Suggesting the nearest, least-crowded concessions based on current density logic.
*   **Real-time Alerts:** Push notifications or prominent banner alerts alerting fans to sudden congestion or gate changes.

### 2.2 Operations-Side Features
*   **Operations Dashboard:** A centralized, live view showing all venue zones and their current crowd status/density.
*   **Alert Generation:** Automated alerts for when zones cross congestion thresholds, wait times become exceptionally long, or when incidents are reported.
*   **AI Recommendations:** Using Gemini API to analyze current congestion data and recommend staff deployments or fan rerouting strategies in real time.
*   **Incident Logging Panel:** Interface for operations staff to log, track, and resolve physical incidents.

### 2.3 Non-Functional Requirements
*   **Aesthetics:** Premium, highly-polished UI suitable for a hackathon demo, using rich colors, sleek dark modes, and dynamic animations.
*   **Real-time Capabilities:** Since this is a demo, real-time data will be generated via a mock data generator loop that simulates crowd movements.
*   **Responsiveness:** Fans will predominantly use mobile devices; operations will use desktops/tablets. UI must be fully responsive.

---

# Architecture Proposal

## 1. Technology Stack
*   **Framework:** Next.js (App Router) – Enables building both the frontend React components and backend API endpoints within the same repository.
*   **Styling:** Tailwind CSS + Framer Motion (for smooth micro-animations and layout transitions). Lucide React for modern icons.
*   **Database:** Mock in-memory database with realistic data generator script. (Easily swappable with Firebase Firestore if needed post-MVP).
*   **AI Integration:** Gemini API (Google Gen AI SDK) for processing crowd data and generating actionable insights for operations.
*   **State Management:** React Context or Zustand for global UI state; SWR/React Query for data fetching.

## 2. High-Level Architecture Diagram

```mermaid
graph TD
    Client_Mobile[Fan Mobile Client] -->|HTTP Requests| NextJS_API[Next.js API Routes]
    Client_Desktop[Ops Desktop Client] -->|HTTP Requests| NextJS_API
    
    subgraph "Backend (Next.js Edge / Node.js)"
        NextJS_API
        DataGen[Mock Data Generator Service]
        AI_Service[Gemini API Client]
    end
    
    NextJS_API <--> DataGen
    NextJS_API <--> AI_Service
    AI_Service -->|Prompt: "Analyze congestion and suggest actions"| Gemini[Gemini LLM]
```

## 3. Project Folder Structure

```text
crowdflow-ai/
├── src/
│   ├── app/
│   │   ├── api/             # Backend endpoints (crowd data, Gemini AI)
│   │   ├── ops/             # Operations dashboard pages
│   │   ├── fan/             # Fan application pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page / Role selector
│   ├── components/
│   │   ├── map/             # Interactive venue map components
│   │   ├── shared/          # Reusable UI components (buttons, cards)
│   │   ├── typography/      # Typography components
│   │   └── ui/              # Base design system components
│   ├── lib/
│   │   ├── gemini.ts        # Gemini API helper
│   │   ├── utils.ts         # Utility functions
│   │   └── mockData.ts      # Data generator logic
│   └── styles/
│       └── globals.css      # Custom styling, Tailwind directives, dark mode tokens
├── public/                  # Assets (icons, mock map images)
├── README.md                # Documentation and demo setup
└── package.json
```
