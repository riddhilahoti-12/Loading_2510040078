# ✈️ AEROVA — Advanced Animated Flight Booking Experience

> **Your journey, beautifully planned.**

AEROVA is a futuristic premium flight-booking web application engineered for a hackathon. It combines a cinematic liquid-glass design system (dark midnight mode, specular reflections, translucent backdrop blurs, electric cyan accents) with deep functional capabilities: interactive aircraft seat maps, multi-city flight discovery, side-by-side fare comparisons, dynamic passenger details validation, and instant localStorage booking management.

---

## ✨ Features & Capabilities

- **🛸 Liquid-Glass UI & Motion Aesthetics**: Modern dark aviation interface built with backdrop blurs, specular glass sheens, smooth entrance micro-interactions, cursor spotlight glow, and custom typography (Inter & Inter Tight).
- **🔍 Advanced Flight Search**: Supports **Round Trip**, **One Way**, and **Multi-City** search (up to 5 flight legs) with origin/destination airport autocomplete, interactive date selectors, passenger counter, and swap controls.
- **✈️ Interactive Aircraft Seat Map**: Real-time 3D-styled interactive seat selector (Rows 1–20, Seats A–F) with seat states (*Available*, *Selected*, *Occupied*, *Premium*), hover tooltips, passenger seat allocation enforcement, and dynamic seat fee calculation (+₹1,500 / +₹1,800).
- **📊 Fare Comparison Drawer**: Select multiple flights to perform side-by-side comparisons of airlines, layovers, baggage allowances, cabin flexibilities, refundability, and total prices.
- **⚙️ Dynamic Filtering & Sorting**: Instant real-time filtering by stops (*Non-stop*, *1 stop*, *2+ stops*), airlines, departure/arrival windows, price ranges, and sorting by *Cheapest*, *Fastest*, *Earliest*, and *Recommended*.
- **📝 Passenger Information & Validation**: Sleek inline form validation for passenger details (Passport, DOB, Contact details) without intrusive browser alerts.
- **🎟️ Instant Confirmation & Ticket Generation**: Animated booking confirmation screen with celebration confetti, unique reference generation (e.g., `AVR8K2P`), printable ticket view, and local storage state persistence (`aerovaBookings`).
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
│   │   ├── Footer.jsx       # Brand signature & trust badges
│   │   ├── SearchPanel.jsx  # Flight search form & multi-city builder
│   │   ├── AirportSelector.jsx # Autocomplete airport picker
│   │   ├── PassengerSelector.jsx # Passenger count & cabin class selector
│   │   ├── FlightCard.jsx   # Animated flight result card
│   │   ├── FlightResults.jsx # Results container with multi-city bundle support
│   │   ├── FilterPanel.jsx  # Multi-faceted filter sidebar
│   │   ├── SortControl.jsx  # Sorting toolbar control
│   │   ├── ComparisonDrawer.jsx # Side-by-side fare matrix drawer
│   │   ├── ProgressStepper.jsx  # Booking flow wizard progress bar
│   │   ├── SeatMap.jsx      # Interactive 3D aircraft cabin seat map
│   │   ├── PassengerForm.jsx# Passenger details input with inline validation
│   │   ├── BookingSummary.jsx# Dynamic price calculation & review
│   │   ├── ConfirmationScreen.jsx # Animated ticket & confetti confirmation
│   │   ├── MyTrips.jsx      # Saved trips dashboard with localStorage
│   │   ├── MobileBottomNav.jsx # Responsive mobile navigation bar
│   │   └── CursorGlow.jsx   # Desktop spotlight cursor motion
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

## 📜 Incremental Git Commit Log

Development was performed through real incremental commits pushed to GitHub:

```text
- Phase 01: Initialize AEROVA project and design system
- Phase 01: Add README documentation and design system
- Phase 02: Build animated landing and flight search
- Phase 03: Implement flight results and animated flight cards
- Phase 04: Add functional flight filtering and sorting
- Phase 05: Add interactive flight fare comparison
- Phase 06: Implement interactive aircraft seat selection
- Phase 07: Create PassengerForm component structure and inputs
- Phase 07: Wire PassengerForm with App.jsx booking state wizard
- Phase 08: Create BookingSummary component with dynamic fare calculation
- Phase 08: Integrate BookingSummary into main App booking wizard
- Phase 09: Create ConfirmationScreen component with celebration confetti
- Phase 09: Create MyTrips component with localStorage persistence
- Phase 09: Connect confirmation and localStorage booking history in App.jsx
- Phase 10: Render specialized multi-city bundle itineraries in FlightResults
- Phase 11: Create MobileBottomNav component for responsive mobile navigation
- Phase 11: Integrate MobileBottomNav into App layout and refine mobile spacing
- Phase 12: Create CursorGlow spotlight component for desktop motion
- Phase 12: Integrate motion effects and reduced-motion accessibility in App layout
- Phase 13: Complete QA, accessibility and production optimization
- Phase 14: Prepare and finalize production deployment
```

---

## 🌐 Live GitHub Repository

GitHub Repository: [https://github.com/riddhilahoti-12/Loading_2510040078](https://github.com/riddhilahoti-12/Loading_2510040078)
