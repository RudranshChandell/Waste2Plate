# Waste2Plate - Sustainable Food Redistribution Platform

## Project Rationale and Executive Summary
**Waste2Plate** is a mission-driven full-stack web application designed to combat food waste by bridging the gap between surplus food providers and communities in need. By leveraging real-time geolocation services and a seamless user interface, the platform facilitates the efficient redistribution of excess food from restaurants, events, and individuals to consumers who can utilize it.

The primary objective of this initiative is to create a decentralized, community-powered ecosystem that promotes sustainability and social welfare. By digitizing the food donation process, Waste2Plate minimizes logistical friction, ensures timely consumption of perishable goods, and fosters a culture of sharing and responsibility.

---

## Core Functional Components
The platform integrates several advanced functionalities to ensure a smooth and reliable user experience:

- **Dynamic Food Alert System**  
  Providers can instantly broadcast "Food Alerts" or giveaways, detailing essential information such as food type (Veg/Non-Veg), quantity (slots), pickup location, and availability windows. This real-time data ingestion ensures that the marketplace of available food is always current.

- **Geolocation-based Discovery**  
  The application utilizes the browser's Geolocation API and `geolib` to calculate the precise distance between the user and available food sources. This hyper-local approach prioritizes nearby options, reducing travel time and carbon footprint for collection.

- **Automated Lifecycle Management via Cloud Functions**  
  To maintain platform integrity, Firebase Cloud Functions operate as a background service, executing scheduled cron jobs (every 10 minutes). These functions automatically transition alert statuses from "available" to "expired" or "unavailable" based on the defined time windows, ensuring users never encounter stale listings.

- **Secure & Scalable Architecture**  
  Built on **Next.js 15**, the application benefits from server-side rendering and static generation for optimal performance. Data persistence and real-time updates are handled by **Firebase Firestore**, while **Descope** provides robust, passwordless authentication for secure user onboarding.

---

## System Architecture Diagram
The system is architected for high availability and low latency, leveraging serverless components where possible to reduce maintenance overhead.

```text
+-----------------------------------------------------------------+
|                          User Devices                           |
|                  (Browsers / Mobile Web)                        |
+-----------------------------------------------------------------+
          |                                     |
          | HTTP / WebSocket                    | Geolocation API
          v                                     v
+-----------------------------------------------------------------+
|                      Next.js Frontend                           |
|              (App Router, React 19, Tailwind v4)                |
|                                                                 |
|   +-------------------+    +-----------------------------+      |
|   |   Public Pages    |    |   Protected Dashboard       |      |
|   | (Landing, Login)  |    | (Post Alert, Claim Food)    |      |
|   +-------------------+    +-----------------------------+      |
|             |                            |                      |
+-------------|----------------------------|----------------------+
              |                            |
              v                            v
+-----------------------------------------------------------------+
|                       Backend Services                          |
|                                                                 |
|  +---------------------+      +-----------------------------+   |
|  |     Authentication  |      |      Firebase Platform      |   |
|  |      (Descope)      |<---->|                             |   |
|  +---------------------+      |  +-----------------------+  |   |
|                               |  |       Firestore       |  |   |
|                               |  | (NoSQL Real-time DB)  |  |   |
|                               |  +-----------------------+  |   |
|                               |             ^               |   |
|                               |             |               |   |
|                               |  +-----------------------+  |   |
|                               |  |   Cloud Functions     |  |   |
|                               |  | (Scheduled Cron Jobs) |  |   |
|                               |  +-----------------------+  |   |
|                               +-----------------------------+   |
+-----------------------------------------------------------------+
```

---

## 🛠️ Technology Stack

### 💻 Framework & Core
- ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white) **Next.js 15 (App Router)**
- ![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white) **React 19**
- ![Node](https://img.shields.io/badge/Node.js-v20-green?logo=node.js&logoColor=white) **Runtime Environment**

### 🎨 Styling & UI
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white) **Tailwind CSS v4**
- ![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-Component_Library-black?logo=shadcnui&logoColor=white) **radix-ui Primitives**
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?logo=framer&logoColor=white) **TW-Animate-CSS**

### ☁️ Cloud & Backend
- ![Firebase](https://img.shields.io/badge/Firebase-Backend_as_a_Service-FFCA28?logo=firebase&logoColor=black) **Firestore & Cloud Functions**
- ![Descope](https://img.shields.io/badge/Descope-Auth-blueviolet) **Authentication**

### 🔧 Tools & Utilities
- ![Zod](https://img.shields.io/badge/Zod-Schema_Validation-3E67B1?logo=zod&logoColor=white) **React Hook Form Validation**
- ![Geolib](https://img.shields.io/badge/Geolib-Geospatial-orange) **Distance Calculation**

---

## Build and Deployment Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Firebase Account (for Firestore and Functions)
- Descope Project ID (for Authentication)

---

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/RudranshChandell/Waste2Plate.git
cd Waste2Plate
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory and add your environment variables:

```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_descope_project_id
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Local Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### 4. Firebase Functions Deployment

To deploy the scheduled status update function:

```bash
cd functions
npm install
firebase login
firebase deploy --only functions
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
