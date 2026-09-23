/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PROJECTS, LANDSCAPE_SHOTS } from "../data";
import { Project } from "../types";
import { 
  ArrowRight, Download, Eye, Compass, Calendar, User, Activity, CheckCircle, Flame, MapPin, X, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(-1); // -1 means idle, >-1 means downloading
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // Filter projects by category
  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === "all") return true;
    return proj.category === activeFilter;
  });

  // Handle simulated PDF download with progression
  const startDownloadWhitepaper = () => {
    if (downloaded) return;
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      
      {/* 1. Cinematic Hero Banner */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-zinc-950 to-zinc-900 border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl select-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-left">
            <span className="font-mono text-xs text-amber-500 tracking-widest font-bold uppercase block">
              OPERATIONAL COMPENDIUM
            </span>
            <h1 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white leading-tight">
              Visual Intelligence & Cinematic Mastery
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              Our archive catalog chronicles certified high-resolution orthomosaics, volumetric infrastructure logs, and custom documentary footage produced with sub-cm spatial precision.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-zinc-900 text-left font-mono">
              <div>
                <p className="text-[10px] text-zinc-600 block uppercase font-bold">FLIGHT REC</p>
                <h4 className="text-xl font-bold text-amber-500 mt-1">4,800 HRS</h4>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 block uppercase font-bold">MISSIONS</p>
                <h4 className="text-xl font-bold text-zinc-100 mt-1">310+ OK</h4>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 block uppercase font-bold">DATA POOL</p>
                <h4 className="text-xl font-bold text-zinc-100 mt-1">1.2 TB+</h4>
              </div>
            </div>
          </div>

          {/* Quick interactive side widget mapping sensor status stats overlay */}
          <div className="bg-zinc-950/80 border border-zinc-900 p-6 rounded-xl font-mono text-xs text-zinc-400 space-y-4">
            <h3 className="font-bold text-[10px] text-amber-500 tracking-wider">PAYLOAD ACTIVE INTEGRITY CHECK</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span>Zenmuse X9-8K Air Cine</span>
                <span className="text-emerald-400 font-bold">CALIBRATED (CINE)</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span>Zenmuse L2 LiDAR + RGB</span>
                <span className="text-emerald-400 font-bold">PPK READY (MAPPING)</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span>Zenmuse H20N Thermal LWIR</span>
                <span className="text-emerald-400 font-bold">DIAG COMPLETED (THERMAL)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>D-RTK 2 High-Precision Base</span>
                <span className="text-emerald-400 font-bold">LINK LOCKED (GPS)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Archive Index / Project Ecosystem with Category Filter Tabs */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2 text-left">
            <span className="font-mono text-xs text-amber-500 tracking-wider font-bold block uppercase">MISSIONS REGISTER</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white">Project Ecosystem</h2>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "mapping", label: "Mapping & GIS" },
              { id: "inspection", label: "Thermal & Inspection" },
              { id: "cinematography", label: "Cinematography" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 font-mono text-xs tracking-widest transition duration-150 rounded border cursor-pointer ${
                  activeFilter === tab.id 
                    ? "bg-amber-500 border-amber-500 text-black font-semibold" 
                    : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-zinc-900/40 border border-zinc-900 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-zinc-800 transition duration-300"
              >
                <div>
                  <div className="relative h-48 bg-black">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur text-zinc-400 font-mono text-[9px] uppercase tracking-wider border border-zinc-800 rounded">
                      {proj.location}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-amber-500 tracking-wider block font-bold uppercase mb-1">
                        {proj.category}
                      </span>
                      <h3 className="font-sans font-bold text-lg text-zinc-100 group-hover:text-amber-500 transition duration-150">
                        {proj.title}
                      </h3>
                      <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    {/* Stats List */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-900 font-mono text-[10px]">
                      {Object.entries(proj.stats).slice(0, 2).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-zinc-600 block uppercase font-bold">{key}</span>
                          <span className="text-zinc-300 font-medium block mt-0.5">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button 
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-semibold tracking-wider transition duration-150 flex items-center justify-center gap-2 rounded cursor-pointer"
                  >
                    VIEW TECHNICAL CASE STUDY
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Featured Operation Banner with Interactive PDF download */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Featured Master Operation
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white">
                Infrastructure Inspection of Power Grids
              </h3>
              <p className="text-zinc-400 text-sm font-sans leading-relaxed max-w-2xl">
                Partnered with the <strong className="text-zinc-300">Tanzania Electric Supply Company (TANESCO)</strong> to scan over 140 kilometers of high-voltage transmission lines. We operated thermal Zenmuse H20N payloads to identify dynamic electrical bottlenecks and mechanical friction fatigue hotspots with zero incident hours.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                <div>
                  <span className="block uppercase text-[10px] text-zinc-600 font-bold">Accuracy</span>
                  <strong className="text-white mt-0.5 block">99.8% Certified</strong>
                </div>
                <div>
                  <span className="block uppercase text-[10px] text-zinc-600 font-bold">Duration</span>
                  <strong className="text-white mt-0.5 block">45 Days</strong>
                </div>
                <div>
                  <span className="block uppercase text-[10px] text-zinc-600 font-bold">Sensor Payload</span>
                  <strong className="text-white mt-0.5 block">Zenmuse H20N Thermal</strong>
                </div>
                <div>
                  <span className="block uppercase text-[10px] text-zinc-600 font-bold">Status</span>
                  <strong className="text-emerald-400 mt-0.5 block uppercase">100% Completed</strong>
                </div>
              </div>
            </div>

            {/* Interactive Download Action Block */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-xl border border-zinc-900 space-y-4 w-full">
              <div className="h-12 w-12 bg-amber-500/10 rounded-full text-amber-500 flex items-center justify-center border border-amber-500/20">
                <Download className="h-5 w-5" />
              </div>
              <div className="text-center">
                <h5 className="font-mono text-xs text-zinc-200 font-semibold uppercase tracking-wider">PROJECT WHITEPAPER</h5>
                <p className="text-[10px] text-zinc-500 mt-0.5">SOP-TANESCO-H20N.pdf (14.2 MB)</p>
              </div>

              {downloadProgress === -1 ? (
                <button
                  onClick={startDownloadWhitepaper}
                  className="w-full py-3 bg-amber-500 text-black hover:bg-amber-400 font-semibold hover:shadow-lg transition duration-150 font-mono text-xs tracking-widest cursor-pointer rounded"
                >
                  DOWNLOAD DETAILED REPORT
                </button>
              ) : downloadProgress < 100 ? (
                <div className="w-full space-y-2 font-mono text-[10px]">
                  <div className="flex justify-between text-zinc-400 font-bold">
                    <span>PROGRESS:</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full transition-all duration-150" 
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-mono rounded w-full">
                  ✓ TRANSMITTAL COMPLETED cached
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Landscape & Wildlife Optics Masonry Grid */}
      <section className="py-24 bg-zinc-900/10 border-t border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-left space-y-2">
            <span className="font-mono text-xs text-amber-500 tracking-widest font-bold block uppercase">HIGH VELOCITY IMAGERY</span>
            <h2 className="text-3xl font-sans font-black tracking-tight text-white">Landscape & Wildlife Optics</h2>
            <p className="text-zinc-400 text-sm max-w-xl font-sans">
              High-altitude scenery depicting active volcanic valleys, glacier caps, and wildlife migrations across East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDSCAPE_SHOTS.map((shot) => (
              <div 
                key={shot.id} 
                className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden group hover:border-zinc-800 transition duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-black">
                  <img 
                    src={shot.image} 
                    alt={shot.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Coords absolute overlay */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur border border-zinc-800 text-zinc-400 font-mono text-[9px] tracking-wider rounded">
                    COORD: {shot.coords}
                  </span>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 tracking-wider font-semibold block uppercase">
                      {shot.category}
                    </span>
                    <h4 className="font-sans font-bold text-base text-zinc-100 mt-1">
                      {shot.title}
                    </h4>
                    <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">
                      {shot.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono border-t border-zinc-900 pt-3 text-zinc-500">
                    <span>ACTIVE SENSOR</span>
                    <span className="text-zinc-300 font-medium">{shot.sensor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Case Study Drawer Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            {/* Modal Body Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-850 rounded-xl overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Close pin */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-md z-30 cursor-pointer"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-60 relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20 space-y-1">
                  <span className="text-[10px] font-mono text-amber-500 tracking-wider font-bold block uppercase">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-sans font-black text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2 text-zinc-400 text-sm leading-relaxed font-sans border-b border-zinc-900 pb-4">
                  <h4 className="font-mono text-xs text-zinc-200 font-bold uppercase tracking-wider">PROJECT EXECUTIVE OVERVIEW</h4>
                  <p>{selectedProject.description}</p>
                </div>

                {/* Technical specifications */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs text-zinc-200 font-bold uppercase tracking-wider">TECHNICAL SPECIFICATIONS</h4>
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs text-zinc-500 bg-zinc-900/30 p-4 border border-zinc-900 rounded">
                    {Object.entries(selectedProject.stats).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-[10px] text-zinc-600 uppercase font-bold">{k}</span>
                        <strong className="text-zinc-200 mt-0.5 block">{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step milestones list */}
                {selectedProject.technicalDetails && (
                  <div className="space-y-3 font-sans">
                    <h4 className="font-mono text-xs text-zinc-200 font-bold uppercase tracking-wider">EXECUTION & DEPLOYMENT MILESTONES</h4>
                    <ul className="space-y-2.5 text-xs text-zinc-400">
                      {selectedProject.technicalDetails.map((det, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                          <span>{det}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
