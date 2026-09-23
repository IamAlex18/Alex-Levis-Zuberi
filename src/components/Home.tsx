/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Activity, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import tanzaniteBridgeImg from "../assets/images/tanzanite_bridge_1779742864194.png";
// @ts-ignore
import kigomaFloodedBridgeImg from "../assets/images/kigoma_flooded_bridge_1779743069035.png";

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Mini showcase for "Featured Intelligence"
  const intelligenceShowcase = [
    {
      id: "AG-24-01",
      title: "Arusha Smart Agriculture",
      area: "480 Hectares",
      type: "Multispectral NDVI",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "TR-24-08",
      title: "Zanzibar Coastal Topography",
      area: "120 Hectares",
      type: "High-Res Orthomosaic",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "INF-24-05",
      title: "Kigoma Bridge Inspection",
      area: "Structural Core",
      type: "Radiometric Thermal",
      image: kigomaFloodedBridgeImg
    }
  ];

  const steps = [
    { num: "01", name: "Initial Consultation", desc: "Understanding survey specifications, accuracy tolerances, and spatial format targets." },
    { num: "02", name: "Permit Acquisition & Pathing", desc: "Acquiring TCAA authorizations, lodging coordinate safety requests, and building automated flight paths." },
    { num: "03", name: "Execution (Precision Flight)", desc: "Setting local RTK reference base systems and capturing aerial high-resolution RAW or LiDAR streams." },
    { num: "04", name: "Telemetry Post-Processing", desc: "Injecting differential RTK data, orthomosaic calculations, and creating detailed 3D/2D layers." },
    { num: "05", name: "Output Transmittal", desc: "Securing final CAD / TIFF files for immediate client integration with absolute satisfaction." }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4">
        
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-zinc-950/80 to-zinc-950 z-10" />
          <img 
            src={tanzaniteBridgeImg} 
            alt="Tanzanite Bridge Dar es Salaam"
            className="w-full h-full object-cover scale-105 filter brightness-75 select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Dynamic Telemetry Particles on Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-25">
          <div className="absolute bottom-1/4 left-1/12 text-zinc-500 font-mono text-[10px] space-y-1">
            <p>CRUISE HEIGHT: 120M / AGL</p>
            <p>WIND COMP: 2.1 KTS / SECURE</p>
            <p>GPS STATE: RTK FIX DUAL</p>
          </div>
          <div className="absolute top-1/4 right-1/10 text-zinc-500 font-mono text-[10px] space-y-1 text-right">
            <p>SYS REF: DAR ES SALAAM</p>
            <p>BATTERY: 98% DIAG STANDARD</p>
            <p>LINK: O3 ENHANCED OPERATIONAL</p>
          </div>
        </div>

        {/* Hero Copy Panel */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Top Pill Diagnostic */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 bg-black/75 border border-zinc-800 rounded-full text-xs font-mono backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>TCAA LICENSE OPERATIONAL</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="text-zinc-400">
              FLEET STATUS: <span className="text-amber-500">100% DEPLOYABLE</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="text-zinc-400">
              WEATHER INDEX: <span className="text-amber-500">K-2 (OPTIMAL)</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-tight max-w-4xl mx-auto text-white">
              Drone Mapping, Aerial Surveying & Professional Photography Solutions
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
              Deploying enterprise UAV flight operations across Africa. We deliver millimeter-accurate LiDAR data, high-fidelity agricultural maps, and high-altitude 8K cinematic documentaries.
            </p>
          </div>

          {/* Navigation Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-semibold text-sm tracking-wider font-mono hover:bg-amber-400 transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 rounded"
              id="hero-request-quote-btn"
            >
              REQUEST A CUSTOM QUOTE
              <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onNavigate("portfolio")}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm tracking-wider font-mono transition duration-150 flex items-center justify-center gap-2 cursor-pointer rounded"
              id="hero-view-portfolio-btn"
            >
              EXPLORE PORTFOLIO CARD
            </button>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-zinc-900/40 text-left font-mono">
            <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-lg">
              <p className="text-[10px] text-zinc-500">SPATIAL PRECISION</p>
              <h4 className="text-lg font-bold text-amber-500 font-mono">SUB-CENTIMETER</h4>
            </div>
            <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-lg">
              <p className="text-[10px] text-zinc-500">COMPLETED MISSIONS</p>
              <h4 className="text-lg font-bold text-white font-mono">310+ PROJECTS</h4>
            </div>
            <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-lg">
              <p className="text-[10px] text-zinc-500">AERIAL DATA STREAM</p>
              <h4 className="text-lg font-bold text-white font-mono">1.2 TERABYTES+</h4>
            </div>
            <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-lg">
              <p className="text-[10px] text-zinc-500">SAFETY FLIGHT HOURS</p>
              <h4 className="text-lg font-bold text-emerald-500 font-mono">4,800 HOURS</h4>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Specialized Drone Services / Expertise */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
            OUR FIELD EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white">
            Specialized Drone Services
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-zinc-500 font-sans">
            Centimeter-accurate aerial sensors paired with raw creative cinematography capability. We cover the entire UAV workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-amber-500/40 transition duration-300 group">
            <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 mb-6 group-hover:bg-amber-500/20">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="font-sans font-bold text-xl text-zinc-100 mb-3">
              Precision Mapping & GIS
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-sans">
              Generate Orthomosaics, contours, DTMs, and volumetric indexes. Fully aligned to local coordinate datums with absolute spatial accuracy.
            </p>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                2D/3D Photogrammetry
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                LiDAR Point Cloud Classification
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                CAD & GIS Compatibility Output
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-amber-500/40 transition duration-300 group">
            <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 mb-6 group-hover:bg-amber-500/20">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="font-sans font-bold text-xl text-zinc-100 mb-3">
              Cinematic Media & Documentaries
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-sans">
              Acquiring high-altitude scenery with premium DJI Inspire 3 full-frame sensor suites operating up to 8K, capturing wildlife and volcanic textures.
            </p>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                ProRes RAW and CinemaDNG Integration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Anti-Disturbance Wildlife Mode
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Elite Sunset & Golden Hour Scenic Sweeps
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-amber-500/40 transition duration-300 group">
            <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 mb-6 group-hover:bg-amber-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-sans font-bold text-xl text-zinc-100 mb-3">
              Industrial Utility Inspections
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-sans">
              Conduct safe evaluations of pipelines, wind generators, telecom structures, and solar panels. Identify hidden heat spots utilizing FLIR optics.
            </p>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Radiometric InfraRed Reporting
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                Close-Up Optical Fatigue Checks
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                100% Zero Scaffold Risk Protocol
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button 
            onClick={() => onNavigate("services")}
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 border border-zinc-800 text-xs tracking-wider font-mono transition duration-150 flex items-center gap-2 rounded cursor-pointer"
          >
            EXPLORE THE FULL CAPABILITIES INDEX
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Featured Intelligence Showcase */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2 text-left">
              <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
                ACTIVE TELEMETRY CAPTURES
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white">
                Featured Intelligence
              </h2>
              <p className="text-zinc-500 text-sm max-w-xl font-sans font-medium">
                Live field outputs proving our high-fidelity data resolution standards across different Tanzanian regions.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("portfolio")}
              className="px-5 py-2.5 text-xs text-amber-500 hover:text-amber-400 border border-amber-500/20 hover:border-amber-400/40 font-mono tracking-widest transition duration-150 flex items-center gap-1.5 self-start md:self-auto cursor-pointer rounded bg-amber-500/5"
            >
              PROJECT ACCESS PORTAL <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {intelligenceShowcase.map((intel) => (
              <div 
                key={intel.id} 
                className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden group hover:border-zinc-700 transition duration-300"
              >
                {/* Photo container */}
                <div className="h-56 relative overflow-hidden bg-black">
                  <span className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-black/80 backdrop-blur border border-zinc-800 text-emerald-400 font-mono text-[10px] uppercase tracking-widest rounded flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ID: {intel.id}
                  </span>
                  <img
                    src={intel.image}
                    alt={intel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Details layout */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 tracking-wider font-semibold block uppercase">
                      {intel.type}
                    </span>
                    <h4 className="font-sans font-bold text-lg text-zinc-100 group-hover:text-amber-500 transition duration-150">
                      {intel.title}
                    </h4>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-mono border-t border-zinc-900 pt-3">
                    <span className="text-zinc-600 uppercase">SPECS TARGETED</span>
                    <span className="text-zinc-300 font-medium">{intel.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Details */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text block */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
                COMPLIANCE & PRECISION
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white leading-tight">
                Why Enterprises Partner With Drone Africa
              </h2>
              <p className="text-zinc-500 text-sm font-sans leading-relaxed">
                Operating a commercial drone flight program in Tanzania requires exceptional spatial standards, aviation compliance certificates, and technical hardware reliability.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-base text-zinc-200">
                    TCAA Certified Pilots & Operations
                  </h4>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                    100% authorized under local civil aviation legal guidelines. We guarantee fast clearance protocols across restricted regions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-base text-zinc-200">
                    Sub-Centimeter Spatial Accuracy
                  </h4>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                    By combining DGPS base stations, PPK systems, and standard RTK pipelines, we supply absolute surveying accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-base text-zinc-200">
                    Fully Insured Commercial Cover
                  </h4>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                    Deploying with a robust public liability coverage package, maintaining safety standards of zero accidents over active sectors.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Graphics block simulating altitude vector tracking screen */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 relative overflow-hidden font-mono text-zinc-400">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
              <span className="text-xs text-amber-500 font-bold tracking-widest">UAV SENSOR RANGE-FINDER DIAGNOSTIC</span>
              <span className="text-[10px] text-zinc-600">SOP-G5</span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-black/60 border border-zinc-800/80 rounded">
                <p className="text-[10px] text-zinc-500">PAYLOAD IDENTIFICATION</p>
                <p className="text-zinc-200 font-bold text-sm mt-0.5">ZENMUSE L2 LIDAR & PHOTOGRAMMETRY</p>
                <div className="w-full bg-zinc-950 h-1.5 mt-2 rounded overflow-hidden">
                  <div className="bg-amber-500 h-full w-4/5"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black/60 border border-zinc-800/80 rounded">
                  <p className="text-[10px] text-zinc-500">K-INDEX STABILITY</p>
                  <p className="text-emerald-400 font-bold mt-0.5">0.14 - EXCELLENT</p>
                </div>
                <div className="p-3 bg-black/60 border border-zinc-800/80 rounded">
                  <p className="text-[10px] text-zinc-500">IMU SYNC STATUS</p>
                  <p className="text-emerald-400 font-bold mt-0.5">CALIBRATED 100%</p>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded space-y-1.5">
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Aviation Warning Radar System</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  No near airspace conflicts reported within Dar es Salaam, Kilimanjaro, or Zanzibar coastlines. High visibility coverage established.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Mission Workflow Timeline */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-20">
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
              OPERATIONAL BLUEPRINT
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white animate-pulse-slow">
              Our Professional Mission Workflow
            </h2>
            <p className="max-w-xl mx-auto text-sm text-zinc-500 font-sans">
              From the initial mapping call to the final transmittal log, we focus on safety and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="space-y-4 text-left relative group">
                {/* Visual marker line */}
                <div className="hidden md:block absolute top-6 left-12 right-0 h-px bg-zinc-800 z-0"></div>
                
                <div className="h-12 w-12 rounded-lg bg-zinc-90 w bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 font-mono font-bold text-sm relative z-10 group-hover:border-amber-500 group-hover:bg-amber-500/10 transition duration-300">
                  {step.num}
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-base text-zinc-200 group-hover:text-amber-500 transition duration-150">
                    {step.name}
                  </h4>
                  <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ready for Takeoff CTA card */}
      <section className="py-16 px-4 max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-900 border border-zinc-800 p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
          
          <div className="space-y-3 relative z-10 text-left">
            <span className="font-mono text-xs text-amber-500 tracking-widest font-bold block uppercase">
              READY FOR TAKEOFF?
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white">
              Launch Your Next Aerial Survey Mission
            </h3>
            <p className="text-zinc-400 text-sm max-w-xl font-sans">
              Connect directly with Alex Levis to coordinate flight logistics, safety clearance details, and project scoping coordinates.
            </p>
          </div>

          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <button 
              onClick={() => onNavigate("contact")}
              className="w-full md:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-widest font-mono transition duration-150 rounded flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              id="cta-depart-btn"
            >
              LAUNCH MISSION BRIEFING
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
