/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Activity, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CompanyLogo from "./CompanyLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "services", label: "SERVICES" },
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "about", label: "ABOUT" },
    { id: "contact", label: "CONTACT" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab("home");
              setIsOpen(false);
            }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-white rounded-full blur-md opacity-15 group-hover:opacity-30 transition duration-300"></div>
              <CompanyLogo className="h-10 w-10 text-white relative transform group-hover:scale-105 transition duration-500" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-wider block text-white">
                DRONE AFRICA
              </span>
              <span className="font-mono text-[9px] text-amber-500 tracking-[0.2em] block -mt-1 font-semibold">
                YOUR VISION, OUR SKIES
              </span>
            </div>
          </div>

          {/* Tactical telemetry middle stats (desktop) */}
          <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 bg-zinc-900/60 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-zinc-300">SYSTEMS: SECURE</span>
            </div>
            <div className="h-4 w-px bg-zinc-800"></div>
            <div>
              <span className="text-zinc-500">TCAA PERMIT:</span>{" "}
              <span className="text-zinc-300 font-semibold">UAV-RPL/0943</span>
            </div>
            <div className="h-4 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-zinc-500 animate-spin-slow" />
              <span className="text-amber-500">OPERATIONAL 24/7</span>
            </div>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 font-mono text-xs tracking-widest font-medium transition duration-200 cursor-pointer ${
                    isActive ? "text-amber-400" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-amber-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 rounded"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (with slide transition) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-black/95 overflow-hidden"
            id="mobile-drawer"
          >
            <div className="px-4 py-3 space-y-2">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-zinc-400">TELEMETRY</span>
                <span className="text-zinc-300 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  GSD SUB-CM ACTIVE
                </span>
              </div>
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left block px-4 py-3 font-mono text-xs tracking-widest font-semibold rounded-md border ${
                      isActive 
                        ? "bg-amber-950/40 border-amber-800 text-amber-400" 
                        : "border-transparent text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
