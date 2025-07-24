 🛡️ Trust Guard

**Track:** Future-Proof Information Security  
**Challenge:** The Enemy Within – Detecting Insider Threats Without Breaking Trust  
**Hackathon:** Wema Hackaholics 6.0  
**Live URL:** [Add if deployed]  
**Tech Stack:** Next.js (App Router), React, Tailwind CSS, TypeScript, Axios, Node.js/Mock API


## Team Members
- [Qasim Rokeeb]
- [Idowu Blessing]
- [Adekunle Bolaji]
- [Edore Precious]
- [Ogowale Covenant]
  
---

## 📌 Overview

**Trust Guard** is a privacy-conscious internal security tool designed to detect and prevent potential insider threats within organizations. Unlike traditional surveillance systems, Trust Guard respects employee privacy by tracking only behavioral metadata and offering non-intrusive anomaly detection.

---

## 🎯 Key Features

- 🧠 Behavioral baseline tracking per department/role
- 🔍 Real-time anomaly detection based on user behavior
- 📊 Admin dashboard to visualize users, logs, and alerts
- 👤 "Was this you?" confirmation prompts to users
- 🧭 Respectful alert system with no invasive monitoring
- 📱 Mobile-ready UI for seamless pitch and demo

---

## 🧠 How It Works

1. Behavior logs are collected or simulated (e.g., app usage, login time).
2. Logs are compared against a predefined per-role baseline.
3. If anomalies are detected, alerts are generated.
4. Admin can view alerts, inspect context, and resolve or escalate.
5. Users can optionally confirm suspicious activity via a soft prompt.

---

## 🧩 Tech Stack

### Frontend
- **Next.js (App Router)** – Routing and rendering
- **React** – Component-based UI
- **Tailwind CSS** – Rapid, utility-first styling
- **Axios** – For API communication
- **TypeScript** – Type safety and scalability
- **Chart.js or Recharts** – (Optional) for data visualization

---

## 🌐 Deployment

This project is deployed on [Vercel](https://vercel.com/) — [Live Link](https://w-trust-guard.vercel.app)

---

### Backend (Lightweight)
- **Mock API** (JSON files or in-memory logic via `/lib`)
- Optional: **Node.js + Express** if full backend is needed

---

## 📊 API Endpoints (Mock or Real)

| Endpoint         | Method | Description                                              |
| ---------------- | ------ | -------------------------------------------------------- |
| `/api/users`     | GET    | Fetch all users with roles and departments               |
| `/api/behaviors` | GET    | Get current user activity logs                           |
| `/api/baselines` | GET    | Baseline rules for different roles                       |
| `/api/anomalies` | POST   | Submit behavior data, receive anomaly analysis           |
| `/api/alerts`    | GET    | View all generated alerts                                |
| `/api/confirm`   | POST   | Submit user response to an alert (yes/no)                |

---

## 🔒 Privacy-Centric Design

- No keylogging, screenshots, or invasive surveillance
- Only metadata (e.g., app name, login time, IP) is tracked
- Alert messages are respectful, designed to build trust
- User participation is optional and can be mocked for demo

---

## 💼 Example Use Case

> A user in HR logs into a DevOps tool outside their approved work hours.  
> Trust Guard detects a deviation from the baseline.  
> An alert is generated and shown on the admin dashboard.  
> The user is softly asked: "This looks unusual — was this you?"  
> Admin can then decide whether to escalate, ignore, or investigate.

---

## 📁 Suggested Folder Structure

```
trust-guard/
├── app/                 # Next.js app directory (routing, pages)
├── components/          # Reusable React components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and mock API logic
├── public/              # Static assets (e.g., icons, logos)
├── styles/              # Global and component-level styles
├── .gitignore
├── components.json
├── next.config.mjs      # Next.js configuration
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⏭️ What's Next

- [x] Set up frontend layout and routing
- [x] Integrate mock API endpoints
- [ ] Add real-time updates with polling or WebSocket (optional)
- [ ] Implement role-based anomaly scoring (stretch goal)
- [ ] Prepare final pitch/demo walkthrough

---

## 👥 Acknowledgements

Special thanks to the organizers of **Wema Hackaholics 6.0** for this opportunity.  
Built with a focus on **trust, transparency, and privacy**.

```

