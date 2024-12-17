import React from "react";
import { motion } from "framer-motion";
import { User } from 'lucide-react';

export const ExamHallIllustration: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Constants for better layout control
  const ROOM_START_X = 100;
  const ROOM_START_Y = 90;
  const DESK_WIDTH = 70;
  const DESK_HEIGHT = 35;
  const CHAIR_WIDTH = 30;
  const CHAIR_HEIGHT = 15;
  const SPACING_X = 100;
  const SPACING_Y = 70;

  return (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <motion.g variants={containerVariants} initial="hidden" animate="visible">
        {/* Room Background with enhanced perspective */}
        <path
          d="M100,150 L700,150 L750,80 L50,80 Z"
          fill="#f1f5f9"
          stroke="#475569"
          strokeWidth="2"
        />
        <path
          d="M100,150 L100,590 L700,590 L700,150 Z"
          fill="#f8fafc"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Floor Grid Pattern */}
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={`grid-h-${i}`}
            d="M100,${200 + i * 60} L700,${200 + i * 60}"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={`grid-v-${i}`}
            d="M${200 + i * 100},150 L${200 + i * 100},500"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Windows with enhanced light effect */}
        {[350].map((x, i) => (
          <motion.g key={`window-${i}`} variants={elementVariants}>
            <rect
              x={x}
              y="110"
              width="100"
              height="100"
              fill="#bfdbfe"
              stroke="#475569"
            />
            <rect
              x={x + 5}
              y="115"
              width="90"
              height="90"
              fill="#dbeafe"
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.5;0.7;0.5"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
          </motion.g>
        ))}

        {/* Teacher's Platform with enhanced details */}
        <motion.g variants={elementVariants}>
          <rect
            x="300"
            y="170"
            width="200"
            height="50"
            fill="#94a3b8"
            stroke="#475569"
          />
          {/* Teacher's Desk with details */}
          <rect
            x="350"
            y="175"
            width="100"
            height="40"
            fill="#64748b"
            stroke="#475569"
          />
          <rect
            x="360"
            y="180"
            width="80"
            height="5"
            fill="#475569"
            opacity="0.3"
          />
        </motion.g>

        {/* Student Seats with improved layout */}
        {Array.from({ length: 16 }, (_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const x = ROOM_START_X + 120 + col * SPACING_X;
          const y = ROOM_START_Y + 200 + row * SPACING_Y;
          const isEvenRow = row % 2 === 0;
          const departmentColor = isEvenRow
            ? col % 2 === 0
              ? "#93c5fd"
              : "#bfdbfe" // CSE colors
            : col % 2 === 0
            ? "#86efac"
            : "#bbf7d0"; // EEE colors

          return (
            <motion.g
              key={`seat-${i}`}
              variants={elementVariants}
              className="cursor-pointer hover:opacity-80"
            >
              {/* Desk with shadow */}
              <rect
                x={x}
                y={y}
                width={DESK_WIDTH}
                height={DESK_HEIGHT}
                fill={departmentColor}
                stroke="#475569"
                strokeWidth="1.5"
              />
              <rect
                x={x}
                y={y + DESK_HEIGHT - 2}
                width={DESK_WIDTH}
                height="4"
                fill="#475569"
                opacity="0.1"
              />

              {/* Chair with enhanced design */}
              <rect
                x={x + (DESK_WIDTH - CHAIR_WIDTH) / 2}
                y={y + DESK_HEIGHT + 5}
                width={CHAIR_WIDTH}
                height={CHAIR_HEIGHT}
                fill="#64748b"
                stroke="#475569"
              />

              {/* Seat Label */}
              <text
                x={x + DESK_WIDTH / 2}
                y={y + DESK_HEIGHT / 2 + 4}
                textAnchor="middle"
                fill="#1e293b"
                fontSize="12"
                fontWeight="bold"
              >
                {`${row + 1}-${col + 1}`}
              </text>
            </motion.g>
          );
        })}

        {/* Room Label with enhanced style */}
        <motion.g variants={elementVariants}>
          <foreignObject x="380" y="125" width="40" height="30">
            <User
              size={32}
              color="#64748B"
              style={{ margin: "0 auto" }}
            />
          </foreignObject>
        </motion.g>
      </motion.g>
    </svg>
  );
};
