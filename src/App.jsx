import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import CursorGlow from './components/CursorGlow';
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
import { Plane, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 bg-[#040811] relative selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Interactive Cursor Glow Spotlight */}
      <CursorGlow />

      {/* Background Atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-sky-600/15 via-blue-900/10 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none z-0" />

      {/* Main Shell */}
      <div className="relative z-10 flex-grow flex flex-col">
        <Header 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'search') setViewState('search');
          }} 
          savedBookingsCount={savedBookings.length}
        />

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

          {/* SEARCH LANDING VIEW */}
          {activeTab === 'search' && viewState === 'search' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Hero Banner */}
              <div className="text-center pt-4 sm:pt-8 pb-4 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg shadow-sky-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Next-Gen Liquid-Glass Flight Booking</span>
                </div>

                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Inter_Tight'] leading-[1.08]">
                  Fly farther.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-blue-400">
                    Experience more.
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-xl font-light leading-relaxed max-w-2xl mx-auto px-2">
                  Search thousands of flights and find the journey that fits you with interactive seat selection, real-time comparison, and dynamic pricing.
                </p>
              </div>

              {/* Glass Search Panel */}
              <SearchPanel onSearch={handleSearchSubmit} />

              {/* Highlights */}
              <div className="pt-8 sm:pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-sky-400/30 transition-all">
                  <ShieldCheck className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">Transparent Pricing</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero hidden baggage fees or surprise surcharges. What you see is exactly what you pay.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-sky-400/30 transition-all">
                  <Clock className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">Interactive Seat Selector</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Choose your exact seat in real-time with our 3D-styled interactive aircraft cabin layout.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-sky-400/30 transition-all">
                  <Award className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-semibold text-white mb-1">Live Fare Comparison</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
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
              <p className="text-xs text-slate-400">
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
