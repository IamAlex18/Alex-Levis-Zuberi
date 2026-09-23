/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { FLEET } from "../data";
import { 
  Zap, Cpu, ShieldCheck, Gauge, Eye, Wind, Thermometer, 
  Settings2, Activity, Play, CheckCircle2, RotateCw, AlertTriangle
} from "lucide-react";

interface Diagnostic {
  id: string;
  name: string;
  status: "idle" | "running" | "success" | "warning";
  desc: string;
}

export default function FleetStatsConsole() {
  const [selectedDroneId, setSelectedDroneId] = useState<string>("fleet-1");
  const [payloadWeight, setPayloadWeight] = useState<number>(0.5); // in kg
  const [windSpeed, setWindSpeed] = useState<number>(12); // in km/h
  const [temperature, setTemperature] = useState<number>(26); // in °C
  const [activePayload, setActivePayload] = useState<string>("default");

  // Diagnostic checklist state
  const [diagnosticsList, setDiagnosticsList] = useState<Diagnostic[]>([
    { id: "dg-1", name: "Redundant IMU Alignment", status: "idle", desc: "Checking gyroscopes & accelerometer offsets" },
    { id: "dg-2", name: "RTK GNSS Constellation Match", status: "idle", desc: "Verifying multi-frequency L1/L2 carrier locking (> 18 satellites)" },
    { id: "dg-3", name: "Electronic Speed Controller (ESC) Link", status: "idle", desc: "Querying active closed-loop feedback and rotor thermal states" },
    { id: "dg-4", name: "Secure Digital Payload Encryption", status: "idle", desc: "Validating AES-250 security keys and gimbal direct link" },
    { id: "dg-5", name: "TCAA Local Airspace Safety Clearances", status: "idle", desc: "Checking national registry flight coordinates authorization" }
  ]);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState<boolean>(false);
  const [systemAlertMessage, setSystemAlertMessage] = useState<string>("System Idle. Ready for pre-flight checklist verification.");

  // Retrieve current active drone data
  const currentDrone = FLEET.find(d => d.id === selectedDroneId) || FLEET[0];

  // Specific limits based on the UAV model specifications
  const getDroneLimits = (id: string) => {
    switch (id) {
      case "fleet-1": // DJI Matrice 400 RTK
        return { maxPayload: 3.2, baselineMin: 62, sensorChoices: ["Zenmuse L2 LiDAR", "Zenmuse H20N Thermal", "RedEdge-P Multispectral"] };
      case "fleet-2": // DJI Inspire 3
        return { maxPayload: 1.5, baselineMin: 28, sensorChoices: ["ProRes 8K Cinema Prime", "100mm Telephoto DL Optics"] };
      case "fleet-3": // DJI Mavic 3 Enterprise
        return { maxPayload: 0.5, baselineMin: 45, sensorChoices: ["Integrated 20MP RGB Mapping", "CORS RTK Latency Core"] };
      default:
        return { maxPayload: 2.0, baselineMin: 45, sensorChoices: ["Default RGB"] };
    }
  };

  const limits = getDroneLimits(selectedDroneId);

  // Set default payload weight slider maximum automatically on drone change
  useEffect(() => {
    setPayloadWeight(Math.round((limits.maxPayload / 2) * 10) / 10);
    setActivePayload(limits.sensorChoices[0]);
  }, [selectedDroneId]);

  // Physics simulation math formulas (realistic responsive curves)
  const calculateStats = () => {
    // 1. Flight time degrades with payload weight, wind speed, and high temperatures
    const payloadFraction = payloadWeight / limits.maxPayload;
    const windPenalty = (windSpeed / 60) * 0.18;
    const tempPenalty = Math.abs(temperature - 22) > 10 ? (Math.abs(temperature - 22) / 100) * 0.08 : 0;
    const payloadPenalty = payloadFraction * 0.38;
    const totalDegradation = 1 - (payloadPenalty + windPenalty + tempPenalty);
    const estFlightTime = Math.max(10, Math.round(limits.baselineMin * totalDegradation));

    // 2. Control link margin degrades as wind causes drone tilt, and electronic noise
    const baseLink = 98;
    const linkMargin = Math.max(45, Math.round(baseLink - (windSpeed * 0.6) - (payloadFraction * 5)));

    // 3. Rotor RPM duty cycle goes up as load, wind increase to keep altitude stable
    const minRpmDuty = 42;
    const rotorRpmDuty = Math.min(100, Math.round(minRpmDuty + (payloadFraction * 40) + (windSpeed / 60) * 15));

    // 4. Thermodynamic Stress index based on temperature and high speed hover corrections
    const thermoStress = Math.min(100, Math.round(20 + (temperature * 1.6) + (payloadFraction * 12)));

    return { estFlightTime, linkMargin, rotorRpmDuty, thermoStress };
  };

  const { estFlightTime, linkMargin, rotorRpmDuty, thermoStress } = calculateStats();

  // Run async sequential dynamic simulation diagnostics
  const executeDiagnostics = async () => {
    if (isRunningDiagnostics) return;
    setIsRunningDiagnostics(true);
    setSystemAlertMessage("SYSTEM BOOT: Initializing closed-loop telemetry checkout standard...");

    // Reset list state
    setDiagnosticsList(prev => prev.map(item => ({ ...item, status: "running" })));

    for (let i = 0; i < diagnosticsList.length; i++) {
      const targetId = diagnosticsList[i].id;
      
      // Delay to simulate a realistic sensor calibration cycle
      await new Promise(resolve => setTimeout(resolve, 800));

      // Simulate a small chance of a safe warning block if temperature/wind is too extreme
      let outcomeStatus: "success" | "warning" = "success";
      if (targetId === "dg-3" && (windSpeed > 45 || temperature > 42)) {
        outcomeStatus = "warning";
      }

      setDiagnosticsList(prev => prev.map(item => 
        item.id === targetId ? { ...item, status: outcomeStatus } : item
      ));

      // Update feedback lines
      if (targetId === "dg-1") setSystemAlertMessage("IMU telemetry synced. Aligning triple redundancy channels...");
      if (targetId === "dg-2") setSystemAlertMessage(`RTK precision active. Carrier lock holds at ${Math.min(32, 18 + Math.floor(windSpeed / 5))} active satellites.`);
      if (targetId === "dg-3") setSystemAlertMessage(outcomeStatus === "warning" ? "WARNING: High atmospheric drag is placing load on ESC channels." : "All motor power channels test green. Active voltage consistent.");
      if (targetId === "dg-4") setSystemAlertMessage("Direct secure fiber feed verified with payload gimbal interface.");
      if (targetId === "dg-5") setSystemAlertMessage("Aviation clearance matches with Tanzania Civil Aviation registry.");
    }

    setSystemAlertMessage("PRE-FLIGHT DIAGNOSIS COMPLETED. AIRCRAFT IS SECURE AND APPROVED FOR IMMEDIATE DISPATCH.");
    setIsRunningDiagnostics(false);
  };

  return (
    <div className="w-full bg-zinc-950/20 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-8" id="uav-telemetry-panel">
      
      {/* Mini Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-90 w border-zinc-900/60 pb-6">
        <div className="text-left">
          <span className="font-mono text-amber-500 text-[10px] uppercase tracking-widest font-black flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            TELEMETRY & FLIGHT SIMULATIONS
          </span>
          <h3 className="text-2xl font-sans font-black tracking-tight text-white mt-1">
            UAV Mission Planner Console
          </h3>
          <p className="text-zinc-500 text-xs mt-0.5 max-w-xl">
            Simulate realistic hardware stress levels, expected flight envelopes, and sensor diagnostics corresponding to physical atmospheric pressures and payloads.
          </p>
        </div>

        {/* Dynamic status chip indicators */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 text-[10px] font-mono flex items-center gap-1.5">
            <span className="text-zinc-500">ATC COMMS:</span>
            <span className="text-emerald-400 font-bold uppercase">SECURED</span>
          </div>
          <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 text-[10px] font-mono flex items-center gap-1.5">
            <span className="text-zinc-500">RTK CORRECTIONS:</span>
            <span className="text-amber-500 font-bold uppercase">GNSS LATENCY 12ms</span>
          </div>
        </div>
      </div>

      {/* Grid Layout of Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: UAV SELECT & IMAGE PREVIEW (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-bold text-left block">
            SELECT AIRCRAFT HARDWARE:
          </span>

          <div className="space-y-3">
            {FLEET.map((drone) => {
              const isSelected = drone.id === selectedDroneId;
              return (
                <button
                  key={drone.id}
                  onClick={() => setSelectedDroneId(drone.id)}
                  id={`select-drone-btn-${drone.id}`}
                  className={`w-full p-4 rounded-xl text-left transition duration-300 border flex gap-3 items-center cursor-pointer ${
                    isSelected 
                      ? "bg-gradient-to-r from-zinc-900 to-zinc-900/60 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.08)]" 
                      : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-zinc-800 relative bg-black">
                    <img 
                      src={drone.image} 
                      alt={drone.name} 
                      className={`w-full h-full object-cover transition duration-300 ${isSelected ? "grayscale-0 scale-105" : "grayscale opacity-60"}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow select-none">
                    <h4 className={`text-xs font-mono tracking-tight font-black transition ${isSelected ? "text-amber-500" : "text-zinc-300"}`}>
                      {drone.name}
                    </h4>
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-wider mt-0.5">
                      {drone.type.split(" ")[0]} {drone.type.split(" ")[1] || ""} Platform
                    </span>
                  </div>
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${isSelected ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" : "bg-zinc-800"}`} />
                </button>
              );
            })}
          </div>

          {/* Aircraft Render Visual Frame */}
          <div className="relative group rounded-2xl overflow-hidden border border-zinc-900 bg-black shadow-lg">
            <div className="h-44 relative overflow-hidden bg-zinc-900">
              <img 
                src={currentDrone.image} 
                alt={currentDrone.name} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-3 left-4 text-left">
                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[9px] uppercase tracking-wider rounded">
                  {currentDrone.type}
                </span>
                <p className="font-mono text-[10px] text-zinc-400 mt-1 uppercase font-bold">
                  Operational Status: <strong className="text-emerald-400">NOMINAL</strong>
                </p>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/40 text-left border-t border-zinc-900">
              <p className="text-zinc-400 text-xs italic leading-relaxed">
                "{currentDrone.description}"
              </p>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: ENTIRELY DYNAMIC SIMULATIONS & DYNAMIC CHARTS (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 space-y-6 text-left">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-bold">
              Mission Parameters:
            </span>
            <Settings2 className="h-4 w-4 text-zinc-500" />
          </div>

          <div className="space-y-5">
            {/* Slider 1: Payload Selection & Weight */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400 uppercase font-black">PAYLOAD WEIGHT</span>
                <span className="text-amber-500 font-bold">{payloadWeight.toFixed(1)} kg</span>
              </div>
              <input 
                id="payload-weight-slider"
                type="range" 
                min="0.1" 
                max={limits.maxPayload} 
                step="0.1"
                value={payloadWeight}
                onChange={(e) => setPayloadWeight(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500" 
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-650">
                <span>0.1 kg (Clean Frame)</span>
                <span>Max Payload: {limits.maxPayload} kg</span>
              </div>
            </div>

            {/* Slider 2: Wind Speed */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400 uppercase font-black flex items-center gap-1">
                  <Wind className="h-3 w-3 text-sky-400" /> WIND VELOCITY
                </span>
                <span className={`${windSpeed > 35 ? "text-rose-500" : "text-sky-400"} font-bold`}>{windSpeed} km/h</span>
              </div>
              <input 
                id="wind-speed-slider"
                type="range" 
                min="0" 
                max="60" 
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500" 
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-650">
                <span>0 km/h (Calm)</span>
                <span>60 km/h (Limit)</span>
              </div>
            </div>

            {/* Slider 3: Ambient Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400 uppercase font-black flex items-center gap-1">
                  <Thermometer className="h-3 w-3 text-amber-500" /> AIR TEMPERATURE
                </span>
                <span className={`${temperature > 38 ? "text-rose-500" : "text-orange-400"} font-bold`}>{temperature}°C</span>
              </div>
              <input 
                id="temperature-slider"
                type="range" 
                min="5" 
                max="50" 
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-600" 
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-650">
                <span>5°C (Cool)</span>
                <span>50°C (Extreme Sahara)</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC READOUTS CARDS */}
          <div className="space-y-3 pt-4 border-t border-zinc-900">
            <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase font-bold block">
              Calculated Real-Time Telemetry:
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Dynamic Flight Time Box */}
              <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-[8px] font-mono text-zinc-500 block uppercase font-bold">EST FLIGHT TIME</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-sans font-black text-amber-500 tracking-tight">{estFlightTime}</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">MINS</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${estFlightTime < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (estFlightTime / limits.baselineMin) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Link Margin Box */}
              <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-[8px] font-mono text-zinc-500 block uppercase font-bold">SIGNAL INTERFACE</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-sans font-black text-sky-400 tracking-tight">{linkMargin}%</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">MARGIN</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-sky-400 rounded-full transition-all duration-300"
                    style={{ width: `${linkMargin}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Motor RPM stress */}
              <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-[8px] font-mono text-zinc-500 block uppercase font-bold">ROTOR RPM DUTY</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-sans font-black text-white tracking-tight">{rotorRpmDuty}%</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">LOAD</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${rotorRpmDuty > 85 ? 'bg-rose-500' : 'bg-zinc-600'}`}
                    style={{ width: `${rotorRpmDuty}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Thermal stress block */}
              <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-[8px] font-mono text-zinc-500 block uppercase font-bold">THERMAL PROFILE</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-2xl font-sans font-black tracking-tight ${thermoStress > 60 ? 'text-rose-500' : 'text-zinc-200'}`}>{thermoStress}°C</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">SYS CORE</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${thermoStress > 60 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${thermoStress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Environmental Safety Indicator */}
            <div className={`p-3 rounded-lg border flex gap-3 items-center ${
              windSpeed > 45 || temperature > 44 
                ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
            }`}>
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-bold block text-xs uppercase">
                  {windSpeed > 45 || temperature > 44 ? "FLIGHT DISPATCH HAZARD WARNING" : "ENVIRONMENT APPROVAL GREEN"}
                </span>
                <p className="text-zinc-400 mt-0.5">
                  {windSpeed > 45 || temperature > 44 
                    ? "Atmospheric criteria limits violated. Postpone operations until wind falls below 45 km/h."
                    : "Wind, thermal metrics, and payload configuration align strictly under TCAA Section safe bounds."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECURRING PRE-FLIGHT CHECKLOGS TERMINAL (4 cols) */}
        <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between h-full space-y-6 text-left">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-bold">
                Pre-Flight Hardware Check:
              </span>
              <Activity className="h-4 w-4 text-amber-500 animate-pulse" />
            </div>

            {/* Sequence steps */}
            <div className="space-y-3.5">
              {diagnosticsList.map((step) => (
                <div key={step.id} className="text-left font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300 font-bold flex items-center gap-2">
                      {/* Interactive indicator dot */}
                      {step.status === "idle" && <span className="h-2 w-2 rounded-full bg-zinc-700" />}
                      {step.status === "running" && <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />}
                      {step.status === "success" && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                      {step.status === "warning" && <span className="h-2 w-2 rounded-full bg-orange-500" />}
                      {step.name}
                    </span>
                    
                    <span className={`text-[10px] font-bold uppercase ${
                      step.status === 'idle' ? 'text-zinc-600' :
                      step.status === 'running' ? 'text-amber-500 animate-pulse' :
                      step.status === 'success' ? 'text-emerald-400' : 'text-orange-400'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 ml-4 pl-0.5 italic">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core dispatch logger terminal */}
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 font-mono text-[10px] space-y-1.5 overflow-hidden h-24">
              <div className="flex gap-1.5 items-center text-zinc-600">
                <span className="text-amber-500">SYSTEM FEED &gt;&gt;</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-zinc-300 leading-relaxed font-mono tracking-tight text-left">
                {systemAlertMessage}
              </p>
            </div>

            <button
              onClick={executeDiagnostics}
              disabled={isRunningDiagnostics}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 font-sans font-bold text-xs text-black uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              {isRunningDiagnostics ? (
                <>
                  <RotateCw className="h-4 w-4 animate-spin" />
                  <span>CALIBRATING MULTI-GIMBALS...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" fill="black" />
                  <span>RUN TELEMETRY DIAGNOSTICS</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Sensor Attachments / Selected Sub-Payload Specifications */}
      <div className="pt-6 border-t border-zinc-900 text-left">
        <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase font-bold block mb-4">
          Integrated Real-Time Payload Options for current selection:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {limits.sensorChoices.map((payload) => (
            <button
              key={payload}
              onClick={() => setActivePayload(payload)}
              className={`p-4 rounded-xl border text-left transition duration-300 cursor-pointer ${
                activePayload === payload
                  ? "bg-zinc-900 border-amber-500 text-white"
                  : "bg-zinc-900/10 border-zinc-900 text-zinc-400 hover:border-zinc-805"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Cpu className={`h-4.5 w-4.5 shrink-0 ${activePayload === payload ? "text-amber-500" : "text-zinc-500"}`} />
                <h5 className="font-mono text-[11px] font-black uppercase tracking-tight text-white mb-0.5 leading-none">
                  {payload}
                </h5>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans mt-2">
                {payload.includes("LiDAR") && "Active solid-state mapping laser capturing dynamic 120,000 pts/sec return pulses."}
                {payload.includes("Thermal") && "Radiometric thermal sensor with dynamic spot metering and Delta-T detection margins."}
                {payload.includes("Multispectral") && "Discrete lens array analyzing customized chlorophyll index maps across multiple light bands."}
                {payload.includes("Cinema") && "X9-8K full frame system with dual native ISO limits (800 / 4000) for pristine golden hour footage."}
                {payload.includes("Telephoto") && "High optical zoom camera tracking distant targets with steady 3-axis stabilization support."}
                {payload.includes("RGB") && "24 Megapixel sub-millimeter surveying payload for Orthomosaic flights with standard mechanical trigger."}
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
