/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SERVICES } from "../data";
import { 
  Map, Video, ShieldCheck, HardHat, Sprout, Camera, Award, Cpu, Eye, Check, ArrowRight
} from "lucide-react";

interface ServicesProps {
  onNavigate: (tab: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  // Map our dynamic icon string to real components
  const getIcon = (name: string) => {
    switch (name) {
      case "Map": return <Map className="h-6 w-6" />;
      case "Video": return <Video className="h-6 w-6" />;
      case "ShieldCheck": return <ShieldCheck className="h-6 w-6" />;
      case "HardHat": return <HardHat className="h-6 w-6" />;
      case "Sprout": return <Sprout className="h-6 w-6" />;
      case "Camera": return <Camera className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  const sectors = [
    { name: "Construction & Infrastructure", desc: "Weekly orthophotos, volumetric measurements, and progress tracking files for commercial site managers." },
    { name: "Real Estate & Land Survey", desc: "Topographic baseline maps, contour files, and dramatic high-density promotional videos showcasing large boundaries." },
    { name: "Agriculture & Forestry", desc: "Dynamic multispectral NDVI layouts logging water stress levels and canopy density checks across dense plantation blocks." },
    { name: "Tourism & Wildlife Conservation", desc: "Bespoke silent flight units designed for documentary capture + thermal counting support in national parks." },
    { name: "Environmental Monitoring", desc: "Assisting researchers with tidal erosion, forest fires tracking, and glacial retreats modeling." }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      
      {/* 1. Hero / Header Banner */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 border-b border-zinc-900 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
            AERIAL TACTICAL PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white">
            Our Professional Capabilities
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Deploying high-precision UAV solutions across agricultural fields, industrial complexes, and dramatic nature conservation sectors.
          </p>
        </div>
      </section>

      {/* 2. Capabilties 6-Grid Index */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-amber-500 tracking-wider block uppercase font-bold">OPERATIONAL EXCELLENCE</span>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-zinc-100">Specialized Fleet Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv) => (
            <div 
              key={srv.id} 
              className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-xl flex flex-col justify-between hover:border-zinc-800 transition duration-300 group"
            >
              <div className="space-y-6">
                <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500 group-hover:bg-amber-500/20 transition duration-300">
                  {getIcon(srv.iconName)}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-lg text-zinc-100 group-hover:text-amber-500 transition duration-150">
                    {srv.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>
              </div>

              {/* Dynamic Feature list details */}
              <div className="mt-6 pt-6 border-t border-zinc-900 space-y-2">
                <span className="text-[10px] font-mono text-zinc-600 block uppercase font-bold">Standard Deliverables</span>
                <ul className="space-y-1.5">
                  {srv.features.map((feat, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                      <span className="h-1 w-1 bg-amber-500 rounded-full"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Technological Superiority Suite */}
      <section className="py-24 bg-zinc-900/20 border-y border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
              HARDWARE & DATA STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white">
              Technological Superiority
            </h2>
            <p className="max-w-xl mx-auto text-sm text-zinc-500 font-sans">
              Our hardware pipeline fuses millimeter-precision sensors with cinema-grade optics, eliminating manual scanning variables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-sans">
            
            {/* Tech 1 */}
            <div className="space-y-4">
              <div className="h-10 w-10 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-sans font-bold text-lg text-zinc-200">
                LiDAR & Photogrammetry Fusion
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                By deploying both lasers (LiDAR) and mechanical shutters (Photogrammetry), we extract active elevations through thick vegetation canopy. Outputs integrate into Global Coordinates with centimeter vertical thresholds.
              </p>
            </div>

            {/* Tech 2 */}
            <div className="space-y-4">
              <div className="h-10 w-10 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-sans font-bold text-lg text-zinc-200">
                Radiometric Thermal Analysis (FLIR)
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                Our thermal mapping flights record structural heat indices continuously. Perfect for high-voltage electricity lines, manufacturing chimney exhausts, and identifying defective cells across wide solar panel configurations.
              </p>
            </div>

            {/* Tech 3 */}
            <div className="space-y-4">
              <div className="h-10 w-10 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-sans font-bold text-lg text-zinc-200">
                6K/8K Hollywood RAW Pipeline
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                Capturing natural details natively in Apple ProRes RAW or CinemaDNG. High stability cameras combined with custom lenses deliver cinematic clarity, ready for major documentary or commercial post-production.
              </p>
            </div>

          </div>

          {/* Futuristic Telemetry Graphic Overlay (Closeups / Digital grid frame) */}
          <div className="mt-16 p-6 bg-zinc-950 border border-zinc-900 rounded-xl relative overflow-hidden font-mono text-zinc-500">
            <div className="absolute top-2 right-2 text-[10px] text-zinc-700">SYS: RTK-CALIBRATOR</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 block uppercase">GNSS Constellations</span>
                <span className="text-emerald-500 font-bold block">GPS + GLONASS + GALILEO</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 block uppercase">Coordinate Datum</span>
                <span className="text-amber-500 font-bold block">WGS 84 / UTM ZONE 37S</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 block uppercase">Anti-distortion Lock</span>
                <span className="text-zinc-300 font-bold block">MECHANICAL GLOBAL SHUTTER</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-600 block uppercase">Signal Defense</span>
                <span className="text-zinc-300 font-bold block">DUAL-BAND O3-PRO SHIELD</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Target Sectors layout */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          <div className="space-y-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
              VERSATILE SECTORS
            </span>
            <h2 className="text-3xl font-sans font-black tracking-tight text-white leading-tight">
              Target Sectors & Strategic Verticals
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
              Our spatial UAV solutions adapt directly to complex civil engineering specifications, conservation parameters, and rural agricultural domains.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("contact")}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold font-mono tracking-widest transition duration-150 flex items-center gap-2 rounded cursor-pointer"
              >
                REQUEST MISSION BRIEFING <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {sectors.map((sec, i) => (
              <div 
                key={i} 
                className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-lg hover:border-zinc-800 transition duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 shrink-0 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center font-mono text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-zinc-200 group-hover:text-amber-500 transition duration-150">
                      {sec.name}
                    </h4>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-1 leading-relaxed font-sans">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
