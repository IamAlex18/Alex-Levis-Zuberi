/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, FleetAsset, ServiceDetail, LandscapeShot, FAQItem } from "./types";

// @ts-ignore
import matrice400Img from "./assets/images/matrice_400_rtk_1779740118884.png";
// @ts-ignore
import inspire3Img from "./assets/images/inspire_3_drone_1779740756939.png";
// @ts-ignore
import mavic3EnterpriseImg from "./assets/images/mavic_3_enterprise_1779741481617.png";

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Construction Monitoring",
    category: "mapping",
    location: "Arusha, Tanzania",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    stats: {
      "Altitude (ALT)": "90M",
      "Resolution (GSD)": "1.2cm/px",
      "Progress Reports": "Continuous",
      "Sensor Payload": "Zenmuse P1 & L2"
    },
    description: "Continuous volumetric earthwork tracking, structural alignment auditing, and high-resolution weekly progress imaging for a major highway and bridge infrastructure corridor.",
    technicalDetails: [
      "Conducted weekly automated mapping flights to calculate accurate cut-and-fill earthwork volumes.",
      "Compared real-world spatial structures against architectural BIM designs down to centimeter-level tolerances.",
      "Produced ultra-high-resolution orthomosaics for stakeholder visual safety inspections."
    ]
  },
  {
    id: "proj-2",
    title: "Wildlife & Nature Photography",
    category: "cinematography",
    location: "Serengeti, Tanzania",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800",
    stats: {
      "Format": "8K ProRes RAW",
      "Sensor": "Zenmuse X9-8K Air",
      "Active Days": "18 Days",
      "Focal Lengths": "DL 24/35/50mm"
    },
    description: "Pristine high-definition cinematic aerial cinematography capturing the migratory patterns and untamed landscapes of Serengeti National Park for international wildlife documentaries.",
    technicalDetails: [
      "Utilized specialized low-noise propeller profiles to approach herds without causing ecological acoustic distress.",
      "Leveraged dual-frequency RTK flight path repeaters to execute pixel-perfect, time-lapse seasonal transitions.",
      "Filmed high-speed action and animal runs using active-tracking gimbal stabilizing algorithms."
    ]
  },
  {
    id: "proj-3",
    title: "Green Heart Conservation",
    category: "cinematography",
    location: "Usambara Mountains, Tanzania",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800",
    stats: {
      "Format": "8K ProRes RAW",
      "Sensor": "Zenmuse X9-Air",
      "Frame Rate": "60 fps",
      "Active Days": "12 Days"
    },
    description: "Cinematic drone capture of forest canopies and cloud forests in the eastern Usambara Mountains for a premier international documentary agency.",
    technicalDetails: [
      "Operated under demanding micro-climates, mist, and variable high winds.",
      "Created ultra-smooth, slow-altitude terrain sweeps utilizing custom 100mm telephoto optics.",
      "Accomplished near-silent approaches to wildlife niches utilizing bespoke low-noise prop configs."
    ]
  },
  {
    id: "proj-4",
    title: "Great Rift Valley Geo-Grid",
    category: "mapping",
    location: "Lake Manyara Escarpment, Tanzania",
    image: "https://images.unsplash.com/photo-1589553461126-3e0079b5c2c5?auto=format&fit=crop&q=80&w=800",
    stats: {
      "ALT": "150M",
      "Resolution": "5.2cm/px",
      "Flight Time": "8.5 Hours",
      "Output": "3D Mesh Model"
    },
    description: "A topographic and structural survey of unstable rock faces along the Rift Valley highway to assist engineers with rockfall hazard risk assessments.",
    technicalDetails: [
      "Acquired over 12,000 oblique and nadir high-definition aerial images.",
      "Reconstructed highly detailed 3D photorealistic textured models using Pix4D.",
      "Detected vertical shear cracks and localized geological shifts with sub-2cm resolution."
    ]
  },
  {
    id: "proj-5",
    title: "Solar Grid Thermography",
    category: "inspection",
    location: "Dodoma, Tanzania",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    stats: {
      "Accuracy": "99.8%",
      "Sensor": "Zenmuse H20N Thermal",
      "Hotspots Located": "42 Panels",
      "Output": "Radiometric Report"
    },
    description: "Thermal infrastructure checkup tracking anomalies across a 50 Megawatt solar power station. Rapid mapping localized defective bypass diodes instantly.",
    technicalDetails: [
      "Captured continuous high-resolution radiometric thermal data stream.",
      "Isolated specific failing micro-inverters and electrical hotspots with GPS coordinates.",
      "Bypassed physical scaffolding checks, slashing inspection overheads by 75%."
    ]
  }
];

export const FLEET: FleetAsset[] = [
  {
    id: "fleet-1",
    name: "DJI Matrice 400 RTK",
    type: "Heavy Industrial Multi-Payload UAV Platform",
    flightTime: "62 Minutes",
    payload: "Up to 3.2 kg (Triple Gimbal, LiDAR, Gas sniff, Thermal)",
    range: "24 km Max (O3 Enterprise Hybrid Transmission)",
    description: "The advanced generation of heavy-lift industrial aviation. Backed by automated pre-flight checklists, superior high-wind tolerances, modular triple payload bays, and dynamic sensor hot-swaps.",
    image: matrice400Img,
    features: [
      "Dual-Horizon RTK & GNSS multi-constellation backups",
      "Modular triple-payload interface with dynamic power supply control",
      "IP56 Certified ingress protection against extreme dust and downpours",
      "Omni-Directional ESA Radar with active threat collision bypass"
    ]
  },
  {
    id: "fleet-2",
    name: "DJI Inspire 3",
    type: "Cinema Cinematic UAV Masterpiece",
    flightTime: "28 Minutes",
    payload: "Integrated Full-Frame 8K Zenmuse X9 Gimbal",
    range: "15 km Dedicated (O3 Pro Crystal-Clear Feed)",
    description: "An elite creative aerial platform featuring an integrated full-frame 8K Zenmuse X9-8K Air camera. Delivers flawless ProRes RAW and CinemaDNG files with dual-antenna centimetre RTK.",
    image: inspire3Img,
    features: [
      "8K Full-Frame Cinema-Grade Sensor Suite with DL lens options",
      "Dual-Antenna RTK for centimeter-precise repeat flights",
      "Continuous 360-degree pan & pitch aerial camera flexibility",
      "ProRes RAW & CinemaDNG hardware licenses natively active"
    ]
  },
  {
    id: "fleet-3",
    name: "DJI Mavic 3 Enterprise",
    type: "Dedicated Photogrammetry Mapping & Surveying drone",
    flightTime: "45 Minutes",
    payload: "Built-in 20MP 4/3 CMOS Wide & RTK Module",
    range: "15 km (O3 Enterprise Transmission)",
    description: "Specialized mapping platform integrated with a high-accuracy GNSS RTK receiver and a mechanical shutter to completely prevent rolling-shutter spatial skew.",
    image: mavic3EnterpriseImg,
    features: [
      "Mechanical global shutter eliminating flight speed motion blur",
      "Direct live syncing with CORS network and localized GNSS RTK reference bases",
      "Optimized 2.2 cm Ground Sample Distance (GSD) at 100 meters altitude",
      "Automated photogrammetry grid missions with high-density point collection"
    ]
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    id: "srv-1",
    title: "Aerial Mapping & Surveying",
    category: "mapping",
    description: "Acquire millimeter-accurate 2D Orthomosaics, topographical contours, Digital Terrain Models (DTM), and 3D terrain models to expedite structural and agricultural layout engineering.",
    features: [
      "2D/3D Orthomosaic High-res Stitching",
      "Topographic Contour Mapping with XYZ layers",
      "Volumetric stockpile computations",
      "GIS compatible imports (SHP, KML, CAD, GeoTIFF)"
    ],
    iconName: "Map"
  },
  {
    id: "srv-2",
    title: "Cinematic Videography",
    category: "cinematography",
    description: "Elevate your visual storytelling with breathtaking aerial vistas in spectacular 8K ProRes and CinemaDNG formats, capturing the raw geometry of Africa's diverse topography.",
    features: [
      "8K and 4K cinema pipelines",
      "Dual pilot and gimbal station controls",
      "Stunning daylight and sunset golden hour sweeps",
      "Post-production stabilization & color grading"
    ],
    iconName: "Video"
  },
  {
    id: "srv-3",
    title: "Industrial Asset Inspection",
    category: "inspection",
    description: "Examine vertical and high-voltage structure status safely. Thermal infrared hot-spot diagnostics and close-range optical integrity checks without scaffolding hazards.",
    features: [
      "High sensitivity FLIR Radiometric Thermal logs",
      "Sub-millimeter crack and fatigue structural views",
      "Automated inspection flights for wind and solar grids",
      "Tanzania Electric Supply safe operations compliant"
    ],
    iconName: "ShieldCheck"
  },
  {
    id: "srv-4",
    title: "Construction Progress Monitoring",
    category: "inspection",
    description: "Receive routine overhead timelines detailing precise grading progress, structure elevations, materials volume tracking, and safety buffer zones on active sites.",
    features: [
      "Weekly/Bi-weekly structural progress logs",
      "3D volumetric changes analytics",
      "Time-lapse footage compile pipelines",
      "Interactive 3D structural model portals"
    ],
    iconName: "HardHat"
  },
  {
    id: "srv-5",
    title: "Agricultural Crop Analytics (NDVI)",
    category: "mapping",
    description: "Analyze dynamic crop canopy reflectance profiles. Target field inputs on localized pest infestations, hydration indices, and general dry-stress regions immediately.",
    features: [
      "Multispectral crop stress indexing (NDVI, NDRE)",
      "High resolution tree and crop population logs",
      "Topographic layout calculations for drainage systems",
      "Prescription map outputs for smart tractors"
    ],
    iconName: "Sprout"
  },
  {
    id: "srv-6",
    title: "Documentary and Natural History Films",
    category: "cinematography",
    description: "Provide dedicated, field-tested wildlife and nature filming units for documentaries. Expertise in remote Tanzanian regions tracking migrations and volcanic geology.",
    features: [
      "Silent propulsion units for minimal wildlife disturbance",
      "Ultra-long zoom tracking setups for deep valleys",
      "Off-grid base stations for rapid daily workflow backups",
      "TCAA-certified operators experienced with national parks"
    ],
    iconName: "Camera"
  }
];

export const LANDSCAPE_SHOTS: LandscapeShot[] = [
  {
    id: "shot-1",
    title: "Serengeti Wildlife Tracking",
    location: "Serengeti Plains, Tanzania",
    description: "Aerial perspective of migration patterns with real-time drone telemetry simulation overlay.",
    category: "Wildlife & Nature",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
    coords: "2.154° S, 34.685° E",
    sensor: "8K RGB Visual Zoom"
  },
  {
    id: "shot-2",
    title: "Lake Natron Volcanic Geology",
    location: "Lake Natron, Tanzania",
    description: "Dynamic visual scan highlighting salt crust micro-fractures in deep crimson alkaline wetlands.",
    category: "Geological Survey",
    image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&q=80&w=800",
    coords: "2.518° S, 35.912° E",
    sensor: "Multispectral / LWIR Index"
  },
  {
    id: "shot-3",
    title: "Mt. Kilimanjaro Glacial Survey",
    location: "Kibo Cone Summit, Tanzania",
    description: "High altitude orthorectified terrain ridge rendering. Tracking glacier recession margins with sub-cm contours.",
    category: "Glaciology Landscape",
    image: "https://images.unsplash.com/photo-1589553461126-3e0079b5c2c5?auto=format&fit=crop&q=80&w=800",
    coords: "3.067° S, 37.355° E",
    sensor: "Zenmuse L2 Photogrammetry"
  },
  {
    id: "shot-4",
    title: "Stone Town Coastal Topology",
    location: "Zanzibar City, Tanzania",
    description: "Delineating coral stone structural parameters and erosion pathways at high tide.",
    category: "Coastal Ecology",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800",
    coords: "6.166° S, 39.189° E",
    sensor: "2D High-Res Orthomosaic"
  },
  {
    id: "shot-5",
    title: "Southern Highlands Forest Canopy",
    location: "Iringa, Tanzania",
    description: "Visual canopy density assessment and 3D timber volume metrics parsing local forestry lots.",
    category: "Topography Forestry",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
    coords: "7.773° S, 35.698° E",
    sensor: "LiDAR Vegetation Clutter Mode"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you have official TCAA permits to fly in Tanzania?",
    answer: "Yes. Alex Levis is fully licensed and certified by the Tanzania Civil Aviation Authority (TCAA). We hold operational authorization, valid RPLs (Remote Pilot Licenses), and secure commercial UAV operator permits including individual permits for restricted national airspace blocks. All flight coordinates are logged and validated with local Air Traffic Control.",
    category: "Safety & TCAA Compliance"
  },
  {
    id: "faq-2",
    question: "How long does it take to mobilize and arrive on location?",
    answer: "For general urban and agricultural zones (Dar Es Salaam, Arusha, Dodoma), we can mobilize within 3 to 5 business days after obtaining local airspace authorization. Remote geological and conservation flights (Serengeti, Usambara, Southern Highlands) require a safety buffer of 7 to 10 days for coordination of field logistics and safety protocols.",
    category: "Mobilization Timelines"
  },
  {
    id: "faq-3",
    question: "What is your pricing model for commercial surveys?",
    answer: "Pricing is calculated based on coverage area (hectares), spatial accuracy requirements (GSD resolution), terrain complexity, and target deliverables (e.g., RAW images vs classified CAD files or 3D point clouds). We offer transparent project-based bidding with zero hidden fees. Submit a Mission Briefing below, and we will transmit a custom technical bid within 24 hours.",
    category: "Pricing & Booking Protocols"
  },
  {
    id: "faq-4",
    question: "Are your UAV operations covered by liability insurance?",
    answer: "Absolutely. We are fully insured with a 10,000,000/= Tsh third-party hull and public liability insurance package. Our safety track record stands at 100% incident-free with over 4,800 operational hours compiled.",
    category: "Safety & TCAA Compliance"
  }
];
