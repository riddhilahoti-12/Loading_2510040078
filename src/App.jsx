import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import AirplaneCursor from './components/AirplaneCursor';
import HeroVideo from './components/HeroVideo';
import DestinationGallery from './components/DestinationGallery';
import SearchPanel from './components/SearchPanel';
import FlightResults from './components/FlightResults';
import ComparisonDrawer from './components/ComparisonDrawer';
import ProgressStepper from './components/ProgressStepper';
import SeatMap from './components/SeatMap';
import PassengerForm from './components/PassengerForm';
import BookingSummary from './components/BookingSummary';
import ConfirmationScreen from './components/ConfirmationScreen';
import MyTrips from './components/MyTrips';
import { MOCK_FLIGHTS } from './data/mockFlights';
import { ShieldCheck, Clock, Award, Plane } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [viewState, setViewState] = useState('search'); // 'search' | 'results' | 'seat' | 'passenger' | 'review' | 'confirmation'
  const [searchParams, setSearchParams] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengersDetails, setPassengersDetails] = useState([]);
  const [comparedFlights, setComparedFlights] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);
  const [savedBookings, setSavedBookings] = useState([]);

  // Load saved bookings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aerovaBookings');
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Error reading aerovaBookings:', e);
    }
  }, []);

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
    setViewState('results');
  };

  const handleToggleCompare = (flight) => {
    if (comparedFlights.some(f => f.id === flight.id)) {
      setComparedFlights(comparedFlights.filter(f => f.id !== flight.id));
    } else {
      if (comparedFlights.length >= 4) {
        alert('You can compare a maximum of 4 flights at once.');
        return;
      }
      const updated = [...comparedFlights, flight];
      setComparedFlights(updated);
      if (updated.length >= 2) {
        setIsComparisonOpen(true);
      }
    }
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setSelectedSeats([]);
    setViewState('seat');
  };

  const handlePassengerSubmit = (details) => {
    setPassengersDetails(details);
    setViewState('review');
  };

  const handleConfirmBooking = (bookingData) => {
    const bookingRef = 'AVR' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const finalRecord = {
      ...bookingData,
      bookingRef,
      bookingDate: new Date().toISOString()
    };

    setConfirmedBookingData(finalRecord);
    setViewState('confirmation');

    // Save into localStorage
    const updatedBookings = [finalRecord, ...savedBookings];
    setSavedBookings(updatedBookings);
    try {
      localStorage.setItem('aerovaBookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.log('Error saving to localStorage:', e);
    }
  };

  const passengerCount = (searchParams?.passengers?.adults || 1) + (searchParams?.passengers?.children || 0);

  const scrollToSearch = () => {
    setActiveTab('search');
    setViewState('search');
    const el = document.getElementById('flight-search-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 bg-[#000000] relative selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Aerodynamic Airplane Custom Motion Cursor */}
      <AirplaneCursor />

      {/* Main Shell */}
      <div className="relative z-10 flex-grow flex flex-col">
        
        {/* 1. Full-Screen Raw Background Video Hero (No dimming, exact spec) */}
        {activeTab === 'search' && viewState === 'search' && (
          <HeroVideo
            onStartChat={scrollToSearch}
            onExploreNow={scrollToSearch}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              if (tab === 'search') setViewState('search');
            }}
          />
        )}

        {/* 2. Main Page Header (For inner booking views) */}
        {(activeTab !== 'search' || viewState !== 'search') && (
          <Header 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              if (tab === 'search') setViewState('search');
            }} 
            savedBookingsCount={savedBookings.length}
          />
        )}

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 md:pb-20">
          
          {/* Progress Stepper Bar for Active Booking Flow */}
          {activeTab === 'search' && viewState !== 'search' && (
            <ProgressStepper
              currentStep={
                viewState === 'results' ? 2 :
                viewState === 'seat' ? 3 :
                viewState === 'passenger' ? 4 :
                viewState === 'review' ? 5 : 6
              }
            />
          )}

          {/* SEARCH LANDING VIEW & DESTINATIONS */}
          {activeTab === 'search' && viewState === 'search' && (
            <div id="flight-search-container" className="space-y-16 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Liquid-Glass Flight Search Form */}
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Inter'] tracking-tight">
                    Search & Reserve Your Flight
                  </h2>
                  <p className="text-xs text-gray-400 font-light">
                    Real-time flight discovery with interactive seat map reservation
                  </p>
                </div>

                <SearchPanel onSearch={handleSearchSubmit} />
              </div>

              {/* Pexels Featured Destination Gallery */}
              <DestinationGallery
                onSelectDestination={(code) => {
                  setSearchParams({
                    tripType: 'oneway',
                    fromAirport: 'HYD',
                    toAirport: code,
                    departureDate: '2026-09-15',
                    passengers: { adults: 1, children: 0, infants: 0 },
                    cabinClass: 'Economy'
                  });
                  setViewState('results');
                }}
              />

              {/* Highlights Grid */}
              <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl liquid-glass border border-white/20">
                  <ShieldCheck className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">Transparent Pricing</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Zero hidden baggage fees or surprise surcharges. What you see is exactly what you pay.
                  </p>
                </div>

                <div className="p-6 rounded-2xl liquid-glass border border-white/20">
                  <Clock className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">Interactive Seat Selector</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Choose your exact seat in real-time with our 3D-styled interactive aircraft cabin layout.
                  </p>
                </div>

                <div className="p-6 rounded-2xl liquid-glass border border-white/20">
                  <Award className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">Live Fare Comparison</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Compare up to 4 flights side-by-side on layovers, baggage limits, aircraft model, and refundability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FLIGHT RESULTS VIEW */}
          {activeTab === 'search' && viewState === 'results' && (
            <FlightResults
              searchParams={searchParams}
              flights={MOCK_FLIGHTS}
              onSelectFlight={handleSelectFlight}
              onModifySearch={() => setViewState('search')}
              comparedFlights={comparedFlights}
              onToggleCompare={handleToggleCompare}
              onOpenComparison={() => setIsComparisonOpen(true)}
            />
          )}

          {/* SEAT MAP SELECTION VIEW */}
          {activeTab === 'search' && viewState === 'seat' && selectedFlight && (
            <SeatMap
              flight={selectedFlight}
              passengerCount={passengerCount}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              onBack={() => setViewState('results')}
              onContinue={() => setViewState('passenger')}
            />
          )}

          {/* PASSENGER DETAILS FORM VIEW */}
          {activeTab === 'search' && viewState === 'passenger' && selectedFlight && (
            <PassengerForm
              passengerCount={passengerCount}
              initialData={passengersDetails}
              onBack={() => setViewState('seat')}
              onContinue={handlePassengerSubmit}
            />
          )}

          {/* BOOKING REVIEW & DYNAMIC SUMMARY VIEW */}
          {activeTab === 'search' && viewState === 'review' && selectedFlight && (
            <BookingSummary
              flight={selectedFlight}
              searchParams={searchParams}
              selectedSeats={selectedSeats}
              passengersDetails={passengersDetails}
              onBack={() => setViewState('passenger')}
              onConfirmBooking={handleConfirmBooking}
            />
          )}

          {/* CONFIRMATION SCREEN VIEW */}
          {activeTab === 'search' && viewState === 'confirmation' && confirmedBookingData && (
            <ConfirmationScreen
              bookingData={confirmedBookingData}
              onGoHome={() => setViewState('search')}
              onViewTrips={() => setActiveTab('trips')}
            />
          )}

          {/* MY TRIPS TAB VIEW */}
          {activeTab === 'trips' && (
            <MyTrips
              onSelectBookFlight={() => {
                setActiveTab('search');
                setViewState('search');
              }}
            />
          )}

          {/* OTHER TABS */}
          {activeTab !== 'search' && activeTab !== 'trips' && (
            <div className="py-20 text-center space-y-4">
              <Plane className="w-12 h-12 text-sky-400 mx-auto" />
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab} View</h2>
              <p className="text-xs text-gray-400">
                Integrated into AEROVA booking system. Switch to Flights tab to search and select flights.
              </p>
            </div>
          )}

        </main>

        {/* Fare Comparison Drawer */}
        <ComparisonDrawer
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
          comparedFlights={comparedFlights}
          onRemoveCompare={(id) => setComparedFlights(comparedFlights.filter(f => f.id !== id))}
          onSelectFlight={handleSelectFlight}
        />

        {/* Mobile Bottom Bar Navigation */}
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'search') setViewState('search');
          }}
          savedBookingsCount={savedBookings.length}
        />

        <Footer />
      </div>
    </div>
  );
}
