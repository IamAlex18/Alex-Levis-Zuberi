/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import GoogleChatWidget from "./components/GoogleChatWidget";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Automatically scroll to top when navigation tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Render correct page view according to active navigation state
  const renderView = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
      case "services":
        return <Services onNavigate={(tab) => setActiveTab(tab)} />;
      case "portfolio":
        return <Portfolio />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      
      {/* 1. Technical navigation header bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Interactive page slot with Framer Motion slide-in fade animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            id={`page-wrapper-${activeTab}`}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Coordinates footer */}
      <Footer setActiveTab={setActiveTab} />
      
      {/* 4. Google Chat Floating Popup Console */}
      <GoogleChatWidget />
      
    </div>
  );
}
