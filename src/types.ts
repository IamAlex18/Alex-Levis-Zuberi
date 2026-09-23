/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: "mapping" | "inspection" | "cinematography";
  location: string;
  image: string;
  stats: Record<string, string>;
  description: string;
  technicalDetails?: string[];
}

export interface FleetAsset {
  id: string;
  name: string;
  type: string;
  flightTime: string;
  payload: string;
  range: string;
  description: string;
  image: string;
  features: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: "mapping" | "inspection" | "cinematography" | "other";
  description: string;
  features: string[];
  iconName: string; // Dynamic rendering map to Lucide icons
}

export interface LandscapeShot {
  id: string;
  title: string;
  location: string;
  description: string;
  category: string;
  image: string;
  coords: string;
  sensor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
