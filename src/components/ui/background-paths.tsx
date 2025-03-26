"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  // Safe defaults for SSR; updated on client
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tweakable parameters:
  const totalLines = 50;           // number of individual wave lines
  const horizontalStep = 10;       // how far horizontally each line shifts
  const verticalStep = 12;         // how far vertically each line shifts
  const verticalFactor = 0.6;      // flattens the wave shape
  const offsetX = dimensions.width * 0.4; // shift wave horizontally
  const offsetY = dimensions.height * 0.4; // shift wave vertically

  // Generate wave lines
  const paths = Array.from({ length: totalLines }, (_, i) => {
    // Start point
    const startX = -(700 - i * horizontalStep * position);
    const startY = (200 + i * verticalStep) * verticalFactor;

    // Control points for first curve
    const cp1X = startX;
    const cp1Y = startY;
    const cp2X = -(700 - i * horizontalStep * position);
    const cp2Y = (150 - i * verticalStep) * verticalFactor;

    // Midpoint where first curve ends and second curve starts
    const midX = 400 - i * horizontalStep * position;
    const midY = (620 - i * verticalStep) * verticalFactor;

    // Control point for the smooth second curve
    const cp3X = 500 - i * horizontalStep * position;
    const cp3Y = (350 - i * verticalStep) * verticalFactor;

    // End point
    const endX = 1100 - i * horizontalStep * position;
    const endY = (80 - i * verticalStep) * verticalFactor;

    // Smooth curve: C ... S ...
    const d = `M ${startX} ${startY}
               C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${midX} ${midY}
               S ${cp3X} ${cp3Y}, ${endX} ${endY}`;

    return { id: i, d };
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full text-white"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {/* Translate to position the wave in the viewport */}
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={0.8}
            strokeOpacity={0.1 + path.id * 0.03}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: 1,
              // Fade in from 0 to 1, then fade out to 0
              opacity: [0, 1, 0],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </g>
    </svg>
  );
}

export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}