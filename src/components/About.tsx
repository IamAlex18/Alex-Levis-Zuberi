/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FLEET } from "../data";
import { ShieldCheck, Award, Zap, Cpu, Compass, CheckCircle } from "lucide-react";
import FleetStatsConsole from "./FleetStatsConsole";

// @ts-ignore
import pilotImg from "../assets/images/alex_levis_pilot_1779739452635.png";

export default function About() {
  const certifications = [
    { name: "TCAA UAV Remote Pilot License (RPL)", issuer: "Tanzania Civil Aviation Authority" },
    { name: "Class 1 Commercial Airspace Flight Permits", issuer: "Tanzania Civil Aviation Authority" },
    { name: "Advanced Photogrammetry & LiDAR Classification Certificate", issuer: "Enterprise UAV Academy" },
    { name: "Offshore Helicopter & Water Rescue SOPs", issuer: "Safety Division Africa" },
    { name: "National Parks Filming Permit (TANAPA Authorized)", issuer: "Tanzania National Parks Authority" }
  ];

  const partners = [
    { code: "TANZANIA_MINING", label: "TAN-MINING CORP" },
    { code: "BUILD_EAST", label: "BUILD-EAST CIVIL" },
    { code: "AGRO_TECH", label: "AGRO-TECH ARUSHA" },
    { code: "SURVEY_CO", label: "SURVEY-CO TANZANIA" }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      
      {/* 1. Profile Bio / "Precision beyond proximity" */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Photos split column (two overlapped frames) */}
          <div className="lg:col-span-5 relative h-[500px]">
            {/* Backdrop pilot frame */}
            <div className="absolute top-0 left-0 w-4/5 h-[420px] rounded-2xl overflow-hidden border border-zinc-805 bg-zinc-90 w">
              <img 
                src={pilotImg} 
                alt="Alex Levis UAV Pilot Profile" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />
            </div>

            {/* Overlapping micro-shaping landscape frame */}
            <div className="absolute bottom-0 right-0 w-2/3 h-64 rounded-2xl overflow-hidden border-2 border-zinc-950 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800"
                alt="Serengeti Sunset Landscape"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Description biography text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="font-mono text-xs text-amber-500 tracking-wider font-bold block uppercase">
                THE PILOT PROFILE
              </span>
              <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white leading-none">
                Precision Beyond Proximity
              </h1>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              I am <strong className="text-zinc-200">Alex Levis</strong>, a professional drone pilot and geospatial analyst certified by the <strong className="text-zinc-200">Tanzania Civil Aviation Authority (TCAA)</strong>. With over 4,800 logged hours flying industrial heavy-lift multi-payload aircraft, my mission has always been connecting modern remote sensing technology to the vast and complex environments of East Africa.
            </p>
            
            <p className="text-zinc-500 text-sm leading-relaxed font-sans">
              Whether conducting thermal micro-defect scans across extensive national grids, stitching millimeter-precise multispectral maps in high-altitude plantations, or piloting silent drone sweeps next to delicate wildlife prides, each flight prioritizes rigorous safety protocols and absolute clarity.
            </p>

            {/* Micro stats banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl font-mono text-[11px] text-zinc-400">
              <div>
                <span className="text-zinc-600 block uppercase font-bold text-[10px]">PILOT PERMIT</span>
                <span className="text-zinc-200 font-bold block mt-0.5">TCAA-RPL-0943</span>
              </div>
              <div>
                <span className="text-zinc-600 block uppercase font-bold text-[10px]">CUMULATIVE FLT</span>
                <span className="text-zinc-200 font-bold block mt-0.5">4,800 HOURS+</span>
              </div>
              <div>
                <span className="text-zinc-600 block uppercase font-bold text-[10px]">INSURANCE LIMIT</span>
                <span className="text-zinc-200 font-bold block mt-0.5">$1M USD LIABILITY</span>
              </div>
              <div>
                <span className="text-zinc-600 block uppercase font-bold text-[10px]">SOP PROTOCOL</span>
                <span className="text-emerald-500 font-bold block mt-0.5 flex items-center gap-1">
                  SF-G5 SAFE
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Official Certifications list */}
      <section className="py-20 bg-zinc-900/20 border-y border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
              COMPLIANCE AUDIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white leading-tight">
              Aviation Accreditations
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-sans leading-relaxed">
              We operate strictly under the civil aviation rules of Tanzania, sustaining zero incidents over half a decade. Our systems are approved for standard mapping blocks.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                    <ShieldCheck className="h-5.5 w-5.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-zinc-150">
                      {cert.name}
                    </h4>
                    <p className="text-zinc-500 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider rounded-full">
                  Verified SECURE
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. The Fleet inventory assets panel */}
      <section className="py-24 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-amber-500 tracking-wider font-bold block uppercase">
            AIRCRAFT COMPENDIUM
          </span>
          <h2 className="text-3xl font-sans font-black tracking-tight text-white">
            The Drone Africa Fleet
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto font-sans font-medium">
            Deploying specialised enterprise UAV hardware depending on target accuracy, payload constraints, and climate factors.
          </p>
        </div>

        {/* Dynamic Telemetry Stats Console */}
        <FleetStatsConsole />

        <div className="text-left pt-12 border-t border-zinc-900/60 font-sans">
          <h4 className="text-sm font-mono uppercase text-zinc-400 font-bold tracking-widest mb-2">
            PHYSICAL DIMENSIONS & FLEET SPECIFICATIONS:
          </h4>
          <p className="text-xs text-zinc-500 max-w-2xl leading-relaxed">
            Review detailed physical chassis limits, peak hover limits, and pre-packaged core features for our primary fleet vehicles deployed on the ground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLEET.map((drone) => (
            <div 
              key={drone.id} 
              className="bg-zinc-90 w bg-zinc-900/30 border border-zinc-900 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-800 transition duration-300"
            >
              <div>
                {/* Photo */}
                <div className="h-56 bg-black relative">
                  <img 
                    src={drone.image} 
                    alt={drone.name} 
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-85" />
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur border border-zinc-900 text-zinc-400 font-mono text-[9px] uppercase tracking-wider rounded-md">
                    {drone.type}
                  </span>
                </div>

                {/* Body details */}
                <div className="p-6 space-y-4 text-left">
                  <h3 className="font-sans font-extrabold text-xl text-zinc-100 mb-1">
                    {drone.name}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                    {drone.description}
                  </p>

                  <div className="space-y-2 font-mono text-[10px] text-zinc-400 border-t border-zinc-900 pt-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-650 uppercase font-bold">FLIGHT ENDURANCE</span>
                      <strong className="text-zinc-200">{drone.flightTime}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-650 uppercase font-bold">MAX PAYLOAD CAPACITY</span>
                      <strong className="text-zinc-200">{drone.payload}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-650 uppercase font-bold">TRANSMISSION RANGE</span>
                      <strong className="text-zinc-200">{drone.range}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bullet Features bottom banner */}
              <div className="px-6 pb-6 pt-2 text-left">
                <span className="text-[9px] font-mono text-zinc-650 uppercase font-bold block mb-2">Key Core Features</span>
                <ul className="space-y-1">
                  {drone.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-450 font-sans">
                      <CheckCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Strategic Vision & Commitment */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-mono text-xs text-amber-500 tracking-widest uppercase font-bold block">
            OUR STRATEGIC COMMITMENT
          </span>
          <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white leading-normal">
            Empowering Regional African Industries with Sub-Centimeter Intelligence
          </h3>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Our goal transcends simple piloting. We strive to provide engineering-grade data products, aiding infrastructure construction, crop yields analysis, and nature habitat monitoring across East Africa with impeccable technical standards and safety protocols.
          </p>
        </div>
      </section>

      {/* 5. Proudly Partnered With / Client Corporate Grid */}
      <section className="py-16 bg-zinc-900/10 border-t border-zinc-900 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest text-center uppercase font-bold mb-8">
            PROUDLY PARTNERED WITH LEADING AFRICAN WORKFORCES
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((pt, i) => (
              <div 
                key={i}
                className="p-6 bg-zinc-950 rounded-xl border border-zinc-900 flex flex-col items-center justify-center font-mono hover:border-zinc-800 transition duration-300"
              >
                <span className="text-zinc-700 text-[9px] block uppercase tracking-[0.3em] font-semibold mb-1">
                  SECURE PARTNER
                </span>
                <span className="text-zinc-300 text-sm font-black tracking-widest font-mono">
                  {pt.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
