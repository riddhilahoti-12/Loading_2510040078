import React, { useState } from 'react';
import { User, Mail, Phone, Globe, Shield, Calendar, ArrowLeft, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function PassengerForm({
  passengerCount = 1,
  onBack,
  onContinue,
  initialData = []
}) {
  // Generate initial forms for each passenger
  const createEmptyPassenger = (idx) => ({
    id: idx + 1,
    title: 'Mr',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    nationality: 'India',
    passportNumber: '',
    email: idx === 0 ? '' : undefined,
    phone: idx === 0 ? '' : undefined
  });

  const [passengersData, setPassengersData] = useState(() => {
    if (initialData && initialData.length === passengerCount) return initialData;
    return Array.from({ length: passengerCount }, (_, i) => createEmptyPassenger(i));
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (idx, field, value) => {
    setPassengersData(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });

    // Clear inline error on change
    if (errors[`${idx}_${field}`]) {
      setErrors(prev => {
        const nextErrs = { ...prev };
        delete nextErrs[`${idx}_${field}`];
        return nextErrs;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    passengersData.forEach((p, i) => {
      if (!p.firstName || p.firstName.trim().length < 2) {
        newErrors[`${i}_firstName`] = 'First name must be at least 2 letters.';
      }
      if (!p.lastName || p.lastName.trim().length < 2) {
        newErrors[`${i}_lastName`] = 'Last name must be at least 2 letters.';
      }
      if (!p.dob) {
        newErrors[`${i}_dob`] = 'Date of birth is required.';
      }
      if (!p.passportNumber || p.passportNumber.trim().length < 6) {
        newErrors[`${i}_passportNumber`] = 'Valid passport number required (min 6 characters).';
      }

      // Lead passenger contact info checks
      if (i === 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!p.email || !emailRegex.test(p.email)) {
          newErrors[`${i}_email`] = 'Please enter a valid email address for e-ticket delivery.';
        }
        if (!p.phone || p.phone.trim().length < 8) {
          newErrors[`${i}_phone`] = 'Valid contact phone number required.';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onContinue(passengersData);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Bar */}
      <div className="glass-panel p-5 border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Seat Map</span>
          </button>

          <div>
            <h2 className="text-xl font-extrabold text-white font-['Inter_Tight']">
              Passenger Information
            </h2>
            <p className="text-xs text-slate-400">
              Provide passport & travel documentation details for {passengerCount} passenger(s)
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {passengersData.map((p, idx) => (
          <div key={idx} className="glass-panel p-6 border-sky-500/20 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center font-bold text-xs font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white font-['Inter_Tight']">
                  Passenger {idx + 1} {idx === 0 ? '(Primary Contact)' : ''}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-400/20">
                Adult Traveler
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Title
                </label>
                <select
                  value={p.title}
                  onChange={(e) => handleFieldChange(idx, 'title', e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              {/* First Name */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  First Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul"
                  value={p.firstName}
                  onChange={(e) => handleFieldChange(idx, 'firstName', e.target.value)}
                  className={`w-full bg-slate-950/60 border rounded-xl p-3 text-xs text-white focus:outline-none transition-all ${
                    errors[`${idx}_firstName`] ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10 focus:border-sky-400'
                  }`}
                />
                {errors[`${idx}_firstName`] && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors[`${idx}_firstName`]}</span>
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Last Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sharma"
                  value={p.lastName}
                  onChange={(e) => handleFieldChange(idx, 'lastName', e.target.value)}
                  className={`w-full bg-slate-950/60 border rounded-xl p-3 text-xs text-white focus:outline-none transition-all ${
                    errors[`${idx}_lastName`] ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10 focus:border-sky-400'
                  }`}
                />
                {errors[`${idx}_lastName`] && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors[`${idx}_lastName`]}</span>
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="md:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Date of Birth <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  value={p.dob}
                  onChange={(e) => handleFieldChange(idx, 'dob', e.target.value)}
                  className={`w-full bg-slate-950/60 border rounded-xl p-3 text-xs text-white focus:outline-none transition-all ${
                    errors[`${idx}_dob`] ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10 focus:border-sky-400'
                  }`}
                />
                {errors[`${idx}_dob`] && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors[`${idx}_dob`]}</span>
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="md:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Gender
                </label>
                <select
                  value={p.gender}
                  onChange={(e) => handleFieldChange(idx, 'gender', e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Nationality */}
              <div className="md:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  value={p.nationality}
                  onChange={(e) => handleFieldChange(idx, 'nationality', e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Passport Number */}
              <div className="md:col-span-6">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Passport Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Z9876543"
                  value={p.passportNumber}
                  onChange={(e) => handleFieldChange(idx, 'passportNumber', e.target.value.toUpperCase())}
                  className={`w-full bg-slate-950/60 border rounded-xl p-3 text-xs font-mono uppercase text-white focus:outline-none transition-all ${
                    errors[`${idx}_passportNumber`] ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10 focus:border-sky-400'
                  }`}
                />
                {errors[`${idx}_passportNumber`] && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors[`${idx}_passportNumber`]}</span>
                  </p>
                )}
              </div>

              {/* Lead Passenger Contact Info */}
              {idx === 0 && (
                <>
                  <div className="md:col-span-6">
                    <label className="block text-[11px] font-semibold text-sky-300 uppercase mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-sky-400" />
                      <span>Email (For E-Ticket Delivery) <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul.sharma@example.com"
                      value={p.email || ''}
                      onChange={(e) => handleFieldChange(idx, 'email', e.target.value)}
                      className={`w-full bg-slate-950/60 border rounded-xl p-3 text-xs text-white focus:outline-none transition-all ${
                        errors[`${idx}_email`] ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10 focus:border-sky-400'
                      }`}
                    />
                    {errors[`${idx}_email`] && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors[`${idx}_email`]}</span>
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-6">
                    <label className="block text-[11px] font-semibold text-sky-300 uppercase mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>Mobile Phone Number <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={p.phone || ''}
                      onChange={(e) => handleFieldChange(idx, 'phone', e.target.value)}
                      className={`w-full bg-slate-950/60 border rounded-xl p-3 text-xs text-white focus:outline-none transition-all ${
                        errors[`${idx}_phone`] ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10 focus:border-sky-400'
                      }`}
                    />
                    {errors[`${idx}_phone`] && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors[`${idx}_phone`]}</span>
                      </p>
                    )}
                  </div>
                </>
              )}

            </div>
          </div>
        ))}

        {/* Action Button Row */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-semibold"
          >
            Back to Seat Map
          </button>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-sky-500/25 transition-all cursor-pointer"
          >
            <span>Continue to Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
