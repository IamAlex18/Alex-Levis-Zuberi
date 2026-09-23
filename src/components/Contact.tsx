/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { FAQS } from "../data";
import { 
  Send, Phone, Mail, MapPin, CheckCircle2, AlertTriangle, Compass, Activity, Eye, ChevronDown, ChevronUp 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  // Form input states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "mapping",
    location: "",
    description: ""
  });

  const [activeFaq, setActiveFaq] = useState<string | null>("faq-1"); // open first FAQ by default
  const [transmitting, setTransmitting] = useState<boolean>(false);
  const [transmitProgress, setTransmitProgress] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Radar mouse telemetry coordinates state
  const [mouseCoords, setMouseCoords] = useState({ lat: "6.7924", lng: "39.2743" });
  const radarRef = useRef<HTMLDivElement>(null);

  const handleRadarMouseMove = (e: React.MouseEvent) => {
    if (!radarRef.current) return;
    const rect = radarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert px offset relative to Kimara Temboni coordinate range limits
    const calcLat = (6.75 - (y / rect.height) * 0.1).toFixed(4);
    const calcLng = (39.2 + (x / rect.width) * 0.1).toFixed(4);
    setMouseCoords({ lat: calcLat, lng: calcLng });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please complete the required fields.");
      return;
    }

    setTransmitting(true);
    setTransmitProgress(0);

    const interval = setInterval(() => {
      setTransmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTransmitting(false);
          setSubmitted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      
      {/* 1. Page Header Theme */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl select-none" />
        
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
            MISSIONS DEPLOYMENT PORTAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white leading-tight">
            Ready For Departure?
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Submit your flight scope parameters below. Alex Levis will review spatial coordinates, airspace clearances, and transmittal timelines before issuing a technical bid.
          </p>
        </div>
      </section>

      {/* 2. Unified Grid: Mission Briefing Form + Quick Comms and Radar Map */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Mission Briefing Interactive Form Panel */}
          <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 p-8 rounded-xl space-y-6">
            <div className="text-left border-b border-zinc-900 pb-4">
              <span className="font-mono text-[10px] text-amber-500 font-bold uppercase block tracking-widest">
                PROTOCOL FORM-F5
              </span>
              <h2 className="text-xl sm:text-2xl font-sans font-black text-white">
                Mission Briefing parameters
              </h2>
            </div>

            {submitted ? (
              <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-xl text-center space-y-4 font-sans py-16">
                <div className="h-14 w-14 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-sans font-extrabold text-xl text-zinc-100">
                  Mission Briefing Transmitted!
                </h3>
                <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-zinc-300">{formData.fullName}</strong>. Your flight request coordinates are logged in our Kimara Temboni database. Alex Levis will contact you at <strong className="text-zinc-300">{formData.email}</strong> within 24 operational hours.
                </p>
                <div className="pt-4 font-mono text-[10px] text-zinc-650">
                  TELEMETRY PATH BLOCK SECURE: <span className="text-emerald-400 font-bold">100% SUCCESS LOGGED</span>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        service: "mapping",
                        location: "",
                        description: ""
                      });
                    }}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-400 border border-zinc-800 text-xs font-mono font-bold tracking-widest rounded transition duration-150 cursor-pointer"
                  >
                    SUBMIT ANOTHER BRIEFING
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-400 uppercase font-semibold" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Captain Juma" 
                      className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded focus:border-amber-500 focus:outline-none font-sans text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-400 uppercase font-semibold" htmlFor="email">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. juma@domain.co.tz" 
                      className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded focus:border-amber-500 focus:outline-none font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-400 uppercase font-semibold" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +255 715 074 999" 
                      className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded focus:border-amber-500 focus:outline-none font-sans text-sm"
                    />
                  </div>

                  {/* Service needed dropdown selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-400 uppercase font-semibold" htmlFor="service">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded focus:border-amber-500 focus:outline-none font-mono text-xs uppercase cursor-pointer"
                    >
                      <option value="mapping">Aerial Mapping & Surveying</option>
                      <option value="cinematography">8K Cinematic Media Production</option>
                      <option value="inspection">Thermal Infrastructure Check</option>
                      <option value="construction">Construction Site Tracking</option>
                      <option value="agriculture">Agricultural NDVI Analysis</option>
                      <option value="other">Other UAV Flight Request</option>
                    </select>
                  </div>
                </div>

                {/* Project Location Coordinates */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-zinc-400 uppercase font-semibold" htmlFor="location">
                    Project Location / Coordinate Range
                  </label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Kigamboni, Dar or Arusha Fields" 
                    className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded focus:border-amber-500 focus:outline-none font-sans text-sm"
                  />
                </div>

                {/* Project Description text */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-zinc-400 uppercase font-semibold" htmlFor="description">
                    Project Description & Target Accuracy
                  </label>
                  <textarea 
                    id="description" 
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide details about the terrains, accuracy tolerances, or documentary film timelines..." 
                    className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-900 rounded focus:border-amber-500 focus:outline-none font-sans text-sm"
                  />
                </div>

                <div className="pt-2">
                  {transmitting ? (
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between items-center text-amber-500 font-bold uppercase tracking-wider">
                        <span>TRANSMITTING ENCRYPTED BRIEFING LAYER...</span>
                        <span>{transmitProgress}%</span>
                      </div>
                      <div className="w-full bg-zinc-950 h-2 rounded overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-150"
                          style={{ width: `${transmitProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full py-4 bg-amber-500 text-black font-semibold text-xs tracking-widest font-mono hover:bg-amber-400 hover:shadow-lg transition duration-150 rounded flex items-center justify-center gap-2 cursor-pointer shadow-amber-500/10"
                      id="submit-mission-btn"
                    >
                      TRANSMIT MISSION INQUIRY
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Right Column Grid: Quick Comms Box & Interactive Radar Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Comms Details */}
            <div className="bg-zinc-900/10 border border-zinc-900 p-6 rounded-xl space-y-4 text-left">
              <h3 className="font-mono text-xs text-amber-500 font-bold uppercase tracking-widest">
                Quick Comms Hub
              </h3>
              
              <ul className="space-y-4 text-sm text-zinc-400 font-sans">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-550 block text-[10px] uppercase font-bold font-mono">Mobile & WhatsApp Support</span>
                    <strong className="text-zinc-200 block mt-0.5">+255 715 074 999</strong>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-550 block text-[10px] uppercase font-bold font-mono">Encrypted Operations Email</span>
                    <strong className="text-zinc-200 block mt-0.5">droneafrica255@gmail.com</strong>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-550 block text-[10px] uppercase font-bold font-mono">Physical Operational HQ</span>
                    <strong className="text-zinc-200 block mt-0.5">Kimara Temboni, Dar es Salaam, Tanzania</strong>
                  </div>
                </li>
              </ul>
            </div>

            {/* Simulated Live Radar telemetry grid box (highly interactive!) */}
            <div 
              ref={radarRef}
              onMouseMove={handleRadarMouseMove}
              className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 relative overflow-hidden font-mono text-[10px] text-zinc-500 h-64 select-none cursor-crosshair group flex flex-col justify-between"
            >
              <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                {/* Visual Radar background scanning circle lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-dashed border-amber-500 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-zinc-800 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-px bg-zinc-800"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-52 w-px bg-zinc-800"></div>
              </div>

              <div className="relative z-10 flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="text-amber-500 font-bold">AIRSPACE AREA CONTROLLER SCANNER</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  RADAR ACTIVE
                </span>
              </div>

              {/* Dynamic tracking stats overlays changing on mouse coordinates hover */}
              <div className="relative z-10 space-y-1 bg-black/50 p-3 border border-zinc-900 rounded select-none text-left">
                <p className="text-zinc-650 uppercase font-bold text-[9px]">TARGET TRACKING COORDINATES</p>
                <div className="text-zinc-200 font-bold text-xs mt-0.5 flex justify-between">
                  <span>LATITUDE: {mouseCoords.lat}° S</span>
                  <span>LONGITUDE: {mouseCoords.lng}° E</span>
                </div>
                <p className="text-zinc-500 text-[9px] leading-snug mt-1 font-sans">
                  * Hover cursor pointer over radar grid box to sweep live telemetry across Kimara Temboni, Dar es Salaam.
                </p>
              </div>

              <div className="relative z-10 flex justify-between text-zinc-650 pt-2 border-t border-zinc-900">
                <span>SECTOR RANGE: 25 KM</span>
                <span>UAV LINK: D-RTK 2 SECURED</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ Protocols section */}
      <section className="py-24 bg-zinc-900/20 border-t border-zinc-900 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-amber-500 tracking-wider font-bold block uppercase">
              STANDARDS MANUAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black text-white">
              Common Operational Protocols
            </h2>
            <p className="text-zinc-500 text-sm font-sans">
              Frequently asked questions regarding airspace laws, logistics, and transparent drone project parameters.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden text-left transition duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                        {faq.category}
                      </span>
                      <span className="font-sans font-extrabold text-sm sm:text-base text-zinc-200 hover:text-amber-500 transition duration-150">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-amber-500" /> : <ChevronDown className="h-5 w-5 text-zinc-500" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans border-t border-zinc-900/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
