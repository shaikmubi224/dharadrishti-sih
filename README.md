# 🌿 DharaDrishti (धारा दृष्टि)
### AI-Based Spring Revival & Sustainable Recharge Planning for Tribal Areas
**Smart India Hackathon (SIH 2026) | Problem Statement ID: 26240**  
**Ministry / Department:** Ministry of Tribal Affairs  
**Theme:** Agriculture, FoodTech & Rural Development | **Category:** Software  

---

## 📌 Executive Summary
In India's hilly and tribal regions, natural mountain springs (*Dhara, Jharna, Chasma, Naula*) are the lifeline for drinking water, domestic use, and agro-forestry. However, thousands of these springs are critically drying up or becoming seasonal due to climate variability, deforestation, and changing land use.

Identifying the subterranean **Springshed (Recharge Zone)** and selecting technically sound, landslide-safe intervention sites has historically required expensive, slow, manual hydrogeological trekking.

**DharaDrishti** is an AI/ML-enabled Geospatial Decision Support System (DSS) that:
1. **Delineates the subterranean Springshed Catchment** using satellite DEM, fracture lineaments, and lithology.
2. **Generates Recharge Suitability & Infiltration Heatmaps** via Multi-Criteria Decision Analysis (AHP-MCDA).
3. **Prescribes Targeted Civil & Bio-Interventions** (Staggered Contour Trenches, Check Dams, Infiltration Pits) with automated MGNREGA cost & labor estimates.
4. **Enforces Landslide & Geological Hazard Guardrails** to prevent slope failure in fragile mountainous terrain.
5. **Provides a Closed-Loop Ground Truth Feedback Mechanism** allowing field officers to log discharge measurements and recalibrate the AI model.
6. **Produces One-Click Government Detailed Project Reports (DPR)** compliant with Central Ground Water Board (CGWB) & PM-JANMAN norms.

---

## 🏛️ System Architecture

```
                                  [ Satellite & Remote Sensing Data ]
                                 (SRTM 30m DEM, ISRO Bhuvan Lineaments,
                                   GSI Lithology, CHIRPS Rainfall)
                                                  │
                                                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      DharaDrishti AI & Hydrogeological Engine                          │
│                                                                                        │
│   ┌──────────────────────────┐  ┌──────────────────────────┐  ┌─────────────────────┐ │
│   │ Topographic Flow & Slope │  │ AHP Multi-Criteria Model │  │ Slope Failure Audit │ │
│   │ (Hydraulic Gradient)     │  │ (Infiltration Spectrum)  │  │ (>35° Hazard Check) │ │
│   └─────────────┬────────────┘  └─────────────┬────────────┘  └──────────┬──────────┘ │
└─────────────────┼─────────────────────────────┼──────────────────────────┼────────────┘
                  │                             │                          │
                  ▼                             ▼                          ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     Interactive Geospatial Command Center                              │
│                                                                                        │
│   • 3-Tier Dynamic Basemaps (Esri Satellite, Carto Dark, Standard Topo)                │
│   • Springshed Catchment Boundary with AI Confidence Scoring                           │
│   • Subterranean Fault Lineament Tracing                                               │
│   • Prescriptive Interventions Matrix (SCT, Boulder Dams, Plantation)                  │
│   • 12-Month Predictive Hydrograph Sandbox (Rainfall Anomaly Sliders)                  │
│   • Official DPR (Detailed Project Report) Generator for MGNREGA Sanctions             │
│   • Role-Based Access Control (Ministry Admin / Hydrogeologist / Field Officer)        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & Innovations

### 1. 🎯 Subterranean Springshed Delineation (AI-Driven)
* Calculates the subterranean recharge polygon feeding any mountain spring based on DEM aspect, slope, rock lineaments, and hydraulic gradient.
* Computes an **AI Reliability / Confidence Score** (e.g., 89.2%) based on remote sensing data resolution.

### 2. 🎨 Recharge Suitability & Infiltration Heatmaps
* Classifies terrain into **High**, **Moderate**, and **Low** absorption zones using AHP weights:
  $$\text{Suitability Index} = 0.35 \times \text{Slope} + 0.25 \times \text{Lineament Density} + 0.25 \times \text{Lithology} + 0.15 \times \text{LULC}$$

### 3. ⚠️ Geological Hazard & Landslide Guardrails
* Mountain terrain is vulnerable to slope failure. If water harvesting trenches are dug on slopes $>35^\circ$ or along shear zones, it can trigger catastrophic landslides.
* DharaDrishti automatically flags high-risk slopes and **prohibits trenching**, directing engineers to safer, gentle ridges.

### 4. 📈 12-Month Predictive Revival Sandbox
* An interactive simulation sandbox allowing engineers to model:
  * **Rainfall Anomaly:** From $-40\%$ (Severe Drought) to $+40\%$ (Excess Monsoon).
  * **Intervention Completion:** From $0\%$ to $100\%$ project execution.
  * Real-time projection of monthly discharge, showing whether the spring achieves **year-round perennial status (12/12 months)**.

### 5. 📄 One-Click Government DPR Generator
* Generates an official, print-ready **Detailed Project Report (DPR)** compliant with:
  * Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan (**PM-JANMAN**)
  * Mahatma Gandhi National Rural Employment Guarantee Act (**MGNREGA**)
  * Central Ground Water Board (**CGWB**) guidelines.

### 6. 📱 Ground-Truth Field Verification Loop
* Field officers and Gram Rozgar Sahayaks can log physical bucket flow measurements, water quality ($\text{pH}$, turbidity), community observations, and geotagged photographs.
* Submissions automatically recalibrate the AI model weights for the geological belt.

---

## 👥 Role-Based Access Control (RBAC)

| Persona | Role | Primary Capabilities |
| :--- | :--- | :--- |
| 🏛️ **Ministry & District Admin** | `admin` | Macro-level KPIs, district drying percentages, MGNREGA budget sanctioning, inter-agency reporting. |
| 🔬 **Lead Hydrogeologist & GIS Specialist** | `hydro` | Lineament extraction, raw raster layers, catchment geometry tuning, slope risk audits. |
| 📱 **Field Verification Officer** | `field` | Mobile field surveys, bucket flow measurement logging, geotagged photo capture, Gram Sabha feedback. |

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 19 + Vite 8
* **Styling & Design System:** Modern Vanilla CSS Design Tokens (Dark-mode glassmorphism, responsive drawer, glowing map markers)
* **GIS & Mapping Engine:** Leaflet & React-Leaflet with Esri Satellite, CartoDB Dark Matter, and OpenStreetMap tiles
* **Geospatial Simulation Engine:** In-browser hydrogeological calculator (AHP, Darcy infiltration, Rational runoff formula)
* **Icons & Visuals:** Lucide React
* **Confetti & Micro-interactions:** Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended; tested on v24)
* **npm** (v9 or higher)
* **Git**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/sih-hackathon.git
   cd sih-hackathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
   Production assets will be generated in the `dist/` directory.

---

## 🗺️ Tested Tribal Study Belts

* **Odisha (Kandhamal & Koraput):** Daringbadi, Burdi GP, Belghar (Kondh & Kutia Kondh PVTG tribal belts)
* **Himachal Pradesh (Kinnaur):** Kalpa, Chini Khas (Kinnaura scheduled tribe, high-altitude cold desert springshed)
* **Meghalaya (East Khasi Hills):** Pynursla, Mawlynnong (Khasi indigenous community, karst aquifer springshed)

---

## 📜 Alignment with National Initiatives
* **PM-JANMAN** (Particularly Vulnerable Tribal Groups Development Mission)
* **Jal Jeevan Mission (Har Ghar Jal)**
* **MGNREGA** (Water Conservation & Groundwater Recharge Works)
* **UN Sustainable Development Goals (SDG 6):** Clean Water and Sanitation

---

## 📄 License
This project is open-source under the MIT License for the Smart India Hackathon (SIH 2026).
