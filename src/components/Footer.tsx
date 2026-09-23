/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Globe, Mail, Phone, MapPin, Activity } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as UTC or East Africa Time (EAT is UTC+3)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Dar_es_Salaam",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options) + " EAT (UTC+3)");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: Brand & Intel */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CompanyLogo className="h-9 w-9 text-white" />
              <div>
                <span className="font-sans font-extrabold text-base tracking-widest text-white block">
                  DRONE AFRICA
                </span>
                <span className="font-mono text-[9px] text-amber-500 tracking-widest block -mt-1 font-semibold">
                  YOUR VISION, OUR SKIES
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed font-sans mt-2">
              High-fidelity aerial mapping, surveying telemetry, and dramatic documentaries across East Africa. TCAA Certified, fully insured, and operating with centimeter accuracy.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-mono text-amber-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                TCAA CERTIFICATE: RPL-0943
              </span>
            </div>
          </div>

          {/* Section 2: Services Quick Navigation */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-zinc-200 font-bold mb-4 uppercase">
              Operational Portals
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button 
                  onClick={() => setActiveTab("home")} 
                  className="hover:text-amber-500 text-zinc-400 font-medium transition duration-150 cursor-pointer block"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-amber-500 text-zinc-400 font-medium transition duration-150 cursor-pointer block"
                >
                  Our Capabilities
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("portfolio")} 
                  className="hover:text-amber-500 text-zinc-400 font-medium transition duration-150 cursor-pointer block"
                >
                  Project Ecosystem
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("about")} 
                  className="hover:text-amber-500 text-zinc-400 font-medium transition duration-150 cursor-pointer block"
                >
                  Biography & Fleet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("contact")} 
                  className="hover:text-amber-500 text-zinc-400 font-medium transition duration-150 cursor-pointer block"
                >
                  Mission Briefing Form
                </button>
              </li>
            </ul>
          </div>

          {/* Section 3: Technical HQ details */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-zinc-200 font-bold mb-4 uppercase">
              Aviation Operations HQ
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  Kimara Temboni,<br />
                  Dar es Salaam, Tanzania
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span>+255 715 074 999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span>droneafrica255@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Telemetry Monitor Grid */}
          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-900 space-y-3 font-mono">
            <h4 className="text-[10px] tracking-widest text-amber-500 font-bold uppercase block">
              Live HQ Telemetry
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-600 font-semibold text-[10px]">COORDINATES:</span>
                <span className="text-zinc-300 font-medium">6.7924° S, 39.2743° E</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-600 font-semibold text-[10px]">LOCAL TIME:</span>
                <span className="text-zinc-300 font-medium">{currentTime || "Loading..."}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 font-semibold text-[10px]">AIRSPACE ENG:</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block animate-ping"></span>
                  GSD 100% SECURE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower copyright row */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono">
          <div>
            © {new Date().getFullYear()} DRONE AFRICA / YOUR VISION, OUR SKIES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">FLIGHT SAFETY STANDARD SOP-G5</span>
            <span className="hover:text-zinc-400 cursor-pointer">TCAA UAV MANUAL COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
