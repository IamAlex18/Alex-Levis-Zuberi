/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface CompanyLogoProps {
  className?: string;
  colorClass?: string;
}

export default function CompanyLogo({ className = "h-8 w-8", colorClass = "text-white" }: CompanyLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${colorClass} transition duration-300`}
    >
      {/* 
        Stylized monogram SVG based on the user's uploaded logo design:
        - A graceful leaf-style loop on the left.
        - Two classic parallel vertical central pillar lines.
        - A sweeping outer letter 'D' arc wrapping around the right side.
      */}
      
      {/* Dynamic glow filter to coordinate with the ambient tactical HUD design */}
      <defs>
        <filter id="glow-logo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Group reflecting outline style */}
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Left curve (leaf/wing loop): starts on the first vertical column, sweeps left, curves down, loops back in, and sweeps diagonally up-right across central pillars */}
        <path d="M 45,28 C 30,28 15,38 15,53 C 15,70 30,75 35,71 C 42,65 30,55 58,40" />

        {/* Outer classic D curve wraps on the right side */}
        <path d="M 52,24 C 75,24 90,38 90,56 C 90,74 75,88 52,88 M 52,78 C 70,78 80,68 80,56 C 80,44 70,34 52,34" />

        {/* Central parallel vertical stems (monogram struts) */}
        <path d="M 45,24 L 45,88" />
        <path d="M 52,24 L 52,88" />

        {/* Diagonal link crossing and sweeping upwards inside D as shown in the mockup */}
        <path d="M 58,40 C 68,34 76,42 76,54 C 76,68 66,74 58,78" />
      </g>
    </svg>
  );
}
