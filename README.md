# ✈️ AEROVA — Advanced Animated Flight Booking Experience

> **Your journey, beautifully planned.**

AEROVA is a futuristic premium flight-booking web application engineered for a hackathon. It combines a cinematic liquid-glass design system (dark midnight mode, specular reflections, translucent backdrop blurs, electric cyan accents) with deep functional capabilities: interactive aircraft seat maps, multi-city flight discovery, side-by-side fare comparisons, dynamic passenger details validation, and instant localStorage booking management.

---

## ✨ Features & Capabilities

- **🛸 Liquid-Glass UI & Motion Aesthetics**: Modern dark aviation interface built with backdrop blurs, specular glass sheens, smooth entrance micro-interactions, and custom typography (Inter & Inter Tight).
- **🔍 Advanced Flight Search**: Supports **Round Trip**, **One Way**, and **Multi-City** search with origin/destination airport autocomplete, interactive date selectors, and passenger counter.
- **✈️ Interactive Aircraft Seat Map**: Real-time 3D-styled interactive seat selector (Rows 1–20, Seats A–F) with seat states (*Available*, *Selected*, *Occupied*, *Premium*), hover tooltips, passenger seat allocation enforcement, and dynamic seat fee calculation.
- **📊 Fare Comparison Drawer**: Select multiple flights to perform side-by-side comparisons of airlines, layovers, baggage allowances, cabin flexibilities, refundability, and total prices.
- **⚙️ Dynamic Filtering & Sorting**: Instant real-time filtering by stops (*Non-stop*, *1 stop*, *2+ stops*), airlines, departure/arrival windows, price ranges, and sorting by *Cheapest*, *Fastest*, *Earliest*, and *Recommended*.
- **📝 Passenger Information & Validation**: Sleek inline form validation for passenger details (Passport, DOB, Contact details) without intrusive browser alerts.
- **🎟️ Instant Confirmation & Ticket Generation**: Animated booking confirmation screen with unique reference generation (e.g., `AVR8K2P`), printable ticket view, and local storage state persistence (`aerovaBookings`).
- **📱 Fully Responsive Design**: Mobile-first adaptive layout featuring a bottom navigation bar, touch-friendly interactive seat map scrolling, and collapsible drawer filters.
- **♿ Accessibility & Motion Control**: Full support for `prefers-reduced-motion` media queries, disabling decorative animations for users with motion sensitivity.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18 + Vite
- **Styling**: Vanilla CSS Liquid-Glass Design Tokens + Tailwind CSS
- **Iconography**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Typography**: Google Fonts (Inter & Inter Tight)
- **Persistence**: Browser `localStorage` API

---

## 📁 Project Architecture

```
deploython/
├── index.html               # Main HTML entry & Google Fonts setup
├── package.json             # Dependencies & build scripts
├── vite.config.js           # Vite development server & build configuration
├── src/
│   ├── main.jsx             # React DOM root renderer
│   ├── App.jsx              # Core application layout & tab state shell
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Liquid-glass navbar & mobile drawer
│   │   ├── GlassCard.jsx    # Glassmorphism container wrapper
│   │   └── Footer.jsx       # Brand signature & trust badges
│   ├── data/                # Data layers
│   │   ├── airports.js      # Global airport dataset & search helper
│   │   └── mockFlights.js   # Flight schedules, seat availability & pricing
│   └── styles/
│       └── index.css        # Glass tokens, backdrop filters & keyframe animations
└── README.md                # Comprehensive documentation
```

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
The optimized production build output will be compiled into the `dist/` directory.

---

## 📜 Incremental Git Commit Strategy

Development follows a strict phase-by-phase incremental strategy with genuine Git commit history:

- `Phase 01: Initialize AEROVA project and design system`
- `Phase 02: Build animated landing and flight search`
- `Phase 03: Implement flight results and flight cards`
- `Phase 04: Add filtering and sorting`
- `Phase 05: Add flight comparison`
- `Phase 06: Add interactive seat selection`
- `Phase 07: Add passenger details and validation`
- `Phase 08: Add booking review and summary`
- `Phase 09: Add booking confirmation and localStorage`
- `Phase 10: Add multi-city search`
- `Phase 11: Complete responsive/mobile experience`
- `Phase 12: Final animation, accessibility and performance polish`
- `Phase 13: Complete QA, accessibility and production optimization`
- `Phase 14: Prepare and finalize production deployment`

---

## 🌐 Live Deployment

*Deployment URL will be linked here upon Phase 14 completion.*
