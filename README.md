# Radio-Base: AI-Powered Satellite Tracking & Radio Intelligence Platform

## Project Rationale and Executive Summary
Radio-Base represents the convergence of orbital mechanics, amateur radio operations, and modern full-stack software engineering. It is designed as a premier platform for real-time satellite tracking, specifically tailored for the radio enthusiast community. The system leverages a decoupled architecture, orchestrating a high-performance Java Spring Boot backend with a reactive Next.js frontend to deliver sub-second orbital data processing and visualization.

The principal objective of this initiative was to engineer a system that transcends standard tracking tools by offering a seamless, highly aesthetic, and computationally efficient interface for predicting satellite passes. Unlike conventional monoliths, Radio-Base employs a modular design that ensures scalability, robust data integrity, and a premium user experience reminiscent of enterprise-grade aerospace software.

---

## Core Functional Components
The Radio-Base ecosystem incorporates the following high-level functionalities, engineered for precision and reliability:

- **Real-Time Orbit Data Aggregation**  
  The backend integrates directly with the N2YO satellite telemetry service, performing complex data normalization to translate raw orbital elements into human-readable pass predictions. This abstraction layer shields the client from the volatility of external API structures.

- **Geospatial & Temporal Calculation Engine**  
  Utilizing advanced location-based algorithms within the Java backend, the system calculates precise azimuth and elevation data for satellite passes relative to the user's geodetic coordinates. This ensures that radio operators receive actionable pointing data for their antennas.

- **Immersive, Reactive User Interface**  
  The frontend is constructed using Next.js 15 and React 19, rendering a high-fidelity environment. It features a "glassmorphism" design language, hardware-accelerated CSS animations for orbital visualization, and a state-managed architecture (via Zustand) that ensures fluid transitions and zero-latency feedback loops.

- **Secure API Interoperability**  
  The system employs strict CORS policies and validation layers to manage communication between the browser-based client and the secure backend server, ensuring compliance with modern web security standards while allowing for flexible deployment topologies.

---

## System Architecture Diagram
The architecture is meticulously architected to separate concerns between data acquisition, processing, and presentation. The Spring Boot application serves as the authoritative source of truth for orbital data, while the Next.js client handles presentation logic.

```text
+-------------------------------------------------------------------------+
|                              User Interface                             |
|  +-------------------------------------------------------------------+  |
|  |                           Browser Client                          |  |
|  |  (Next.js 15 / React 19 / Tailwind CSS)                           |  |
|  |                                                                   |  |
|  |   +----------------+       +-----------------+                    |  |
|  |   | Visualization  |       |  State Manager  |                    |  |
|  |   | (CSS Orbits)   | <---> |    (Zustand)    |                    |  |
|  |   +----------------+       +-----------------+                    |  |
|  +-----------------------------------|-------------------------------+  |
|                                      | HTTP / JSON                      |
|                                      v                                  |
+-------------------------------------------------------------------------+
|                           Backend Infrastructure                        |
|  +-------------------------------------------------------------------+  |
|  |                    Java Spring Boot Application                   |  |
|  |                                                                   |  |
|  |   +----------------+       +-----------------+                    |  |
|  |   |  REST Contllr  | ----> | Satellite       |                    |  |
|  |   |  (Location)    |       | Service         |                    |  |
|  |   +----------------+       +---|-------------+                    |  |
|  |                                |                                  |  |
|  |                                v                                  |  |
|  |                        +----------------+                         |  |
|  |                        |   N2YO Client  |                         |  |
|  |                        +-------|--------+                         |  |
|  +--------------------------------|----------------------------------+  |
|                                   | HTTPS                               |
|                                   v                                     |
+-------------------------------------------------------------------------+
|                         External Telemetry Data                         |
|                       (N2YO Satellite API)                              |
+-------------------------------------------------------------------------+
```

## 🛠️ Technology Stack

### 🚀 Frontend Architecture
- ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white) **Server-Side Rendering & Routing**
- ![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white) **Component Library**
- ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white) **Utility-First Styling**
- ![Zustand](https://img.shields.io/badge/Zustand-State_Management-764ABC?logo=redux&logoColor=white) **Global State Management**

### ☕ Backend Services
- ![Java](https://img.shields.io/badge/Java-17-orange?logo=java&logoColor=white) **Amazon Corretto JDK 17**
- ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?logo=spring-boot&logoColor=white) **Application Framework**
- ![Lombok](https://img.shields.io/badge/Lombok-Boilerplate_Reduction-red?logo=lombok&logoColor=white) **Compile-time Annotation Library**
- ![Jackson](https://img.shields.io/badge/Jackson-JSON_Processing-gold?logo=json&logoColor=black) **Serialization Engine**

### 🔧 Build & CI/CD
- ![Maven](https://img.shields.io/badge/Maven-Build_Automation-C71A36?logo=apachemaven&logoColor=white) **Dependency Management**
- ![npm](https://img.shields.io/badge/npm-Package_Manager-CB3837?logo=npm&logoColor=white) **Node Package Manager**

---

# Build and Deployment Instructions

## Prerequisites
- **Java Development Kit (JDK 17+)**
- **Node.js (v18+) & npm**
- **Maven (v3.8+)**
- **N2YO API Key** (configured in `application.properties`)

---

## 1. Backend Service Initialization

### Configuration
Navigate to the backend resources directory:
```bash
cd Backend/src/main/resources
```
Ensure `application.properties` contains your valid API credentials:
```properties
API_KEY=YOUR_N2YO_API_KEY
N2YO_BASE_URL=https://api.n2yo.com/rest/v1/satellite/
```

### Compilation & Execution
Navigate to the backend root and serve the application:
```bash
cd Backend
mvn clean install
mvn spring-boot:run
```
*The backend server will initialize on port `8080`. Validate status at `http://localhost:8080/actuator/health`.*

---

## 2. Frontend Client Initialization

### Dependency Installation
Navigate to the frontend directory and hydrate the dependency tree:
```bash
cd radiobase
npm install
```

### Development Server
Launch the Next.js development environment:
```bash
npm run dev
```
*The user interface will be accessible at `http://localhost:3000`.*

---

## 3. Operational Verification
1.  **Launch Backend**: Ensure the Spring Boot service is active/listening.
2.  **Launch Frontend**: Open the web application.
3.  **Interact**: The landing page should render the WebGL-style orbit animation.
4.  **Data Flow**: Navigating to the dashboard will trigger calls to the backend `/api/location` endpoint, which proxies requests to N2YO and returns normalized satellite telemetry.
