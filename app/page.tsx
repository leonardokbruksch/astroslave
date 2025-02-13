"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import StarryBackground from "./components/StarryBackground";

const zodiacSigns = [
  { name: "Aries", symbol: "♈", period: "Mar 21 - Apr 19" },
  { name: "Taurus", symbol: "♉", period: "Apr 20 - May 20" },
  { name: "Gemini", symbol: "♊", period: "May 21 - Jun 20" },
  { name: "Cancer", symbol: "♋", period: "Jun 21 - Jul 22" },
  { name: "Leo", symbol: "♌", period: "Jul 23 - Aug 22" },
  { name: "Virgo", symbol: "♍", period: "Aug 23 - Sep 22" },
  { name: "Libra", symbol: "♎", period: "Sep 23 - Oct 22" },
  { name: "Scorpio", symbol: "♏", period: "Oct 23 - Nov 21" },
  { name: "Sagittarius", symbol: "♐", period: "Nov 22 - Dec 21" },
  { name: "Capricorn", symbol: "♑", period: "Dec 22 - Jan 19" },
  { name: "Aquarius", symbol: "♒", period: "Jan 20 - Feb 18" },
  { name: "Pisces", symbol: "♓", period: "Feb 19 - Mar 20" },
];

const corporateHoroscopes = {
  Aries:
    "Your assertiveness will be mistaken for 'not being a team player'. Mercury retrograde suggests it's time to write more emails with 'per my last email' to assert dominance.",
  Taurus:
    "The alignment of Venus indicates your standing desk budget request will finally be approved. Unfortunately, Saturn's position means it's actually a cardboard box.",
  Gemini:
    "Your multitasking skills will peak this week - perfect timing for when your boss assigns you three people's jobs with no pay increase.",
  Cancer:
    "The moon's position suggests excellent emotional intelligence this week. Use it to decode what 'let's circle back' really means in your meetings.",
  Leo: "Jupiter aligns perfectly for leadership opportunities! Translation: You'll be voluntold to lead the office birthday committee.",
  Virgo:
    "Your attention to detail will save a major project! But Mars in retrograde means someone else will take credit in the all-hands meeting.",
  Libra:
    "The stars suggest great balance this week - between your actual job and your side hustle because inflation is hitting hard.",
  Scorpio:
    "Your mysterious aura will serve you well when you need to hide from impromptu Zoom calls. Pro tip: 'Internet issues' is still a classic.",
  Sagittarius:
    "Your optimism will be tested when you realize 'unlimited PTO' actually means 'never take a vacation'.",
  Capricorn:
    "Your career path is clear as day: straight up the corporate ladder... Oh wait, that's just the emergency exit sign.",
  Aquarius:
    "Innovation is your strength this week! Perfect timing for suggesting revolutionary ideas that will be shut down for being 'too outside the box'.",
  Pisces:
    "Your intuition is strong - you'll sense a team-building exercise coming. Quick, schedule a dentist appointment!",
};

export default function Home() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openHoroscope = (sign: string) => {
    setSelectedSign(sign);
    dialogRef.current?.showModal();
  };

  const closeHoroscope = () => {
    dialogRef.current?.close();
    setSelectedSign(null);
  };

  // Function to pick a random sign and open the dialog
  const openRandomSign = () => {
    const randomIndex = Math.floor(Math.random() * zodiacSigns.length);
    const randomSign = zodiacSigns[randomIndex];
    openHoroscope(randomSign.name);
  };

  // The actual center for a 220x220 viewBox is (110, 110)
  const cx = 110;
  const cy = 110;

  return (
    <main className="min-h-screen text-blue-100 flex flex-col items-center justify-center p-8 relative">
      <StarryBackground />

      {/* Content with higher z-index */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center w-full text-center">
          {/* Text Content - Centered */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              ASTRO SLAVE
            </motion.h1>
            <motion.p
              className="text-blue-300 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your corporate destiny, written by spiritually ascended
              stakeholders
            </motion.p>
          </div>

          {/* Circular GIF - Aligned to Right */}
          <motion.img
            src="/chains.gif"
            alt="Animated GIF"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        {/* Zodiac Donut Wheel */}
        <motion.div
          className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] mx-auto mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 220 220"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          >
            <defs>
              {zodiacSigns.map((sign, index) => {
                const totalSigns = zodiacSigns.length;
                const startAngle = (index / totalSigns) * 2 * Math.PI;
                const endAngle = ((index + 1) / totalSigns) * 2 * Math.PI;

                const textArcRadius = 85;

                // Use cx, cy instead of 100, 100
                const x1 = cx + textArcRadius * Math.cos(startAngle);
                const y1 = cy + textArcRadius * Math.sin(startAngle);
                const x2 = cx + textArcRadius * Math.cos(endAngle);
                const y2 = cy + textArcRadius * Math.sin(endAngle);

                const largeArcFlag = 0;

                return (
                  <path
                    key={`text-path-${sign.name}`}
                    id={`arc-${index}`}
                    d={`M ${x1} ${y1} A ${textArcRadius} ${textArcRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                    fill="none"
                    stroke="transparent"
                  />
                );
              })}
            </defs>

            {zodiacSigns.map((sign, index) => {
              const totalSigns = zodiacSigns.length;
              const angle = (index / totalSigns) * 2 * Math.PI;
              const nextAngle = ((index + 1) / totalSigns) * 2 * Math.PI;

              const outerRadius = 80;
              const innerRadius = 40;
              const textRadius = (outerRadius + innerRadius) / 2 + 5;

              // Donut arcs
              const x1 = cx + outerRadius * Math.cos(angle);
              const y1 = cy + outerRadius * Math.sin(angle);
              const x2 = cx + outerRadius * Math.cos(nextAngle);
              const y2 = cy + outerRadius * Math.sin(nextAngle);
              const x3 = cx + innerRadius * Math.cos(nextAngle);
              const y3 = cy + innerRadius * Math.sin(nextAngle);
              const x4 = cx + innerRadius * Math.cos(angle);
              const y4 = cy + innerRadius * Math.sin(angle);

              // Symbol position
              const textX = cx + textRadius * Math.cos((angle + nextAngle) / 2);
              const textY = cy + textRadius * Math.sin((angle + nextAngle) / 2);

              return (
                <g
                  key={sign.name}
                  className="group cursor-pointer transition-all duration-300"
                  onClick={() => openHoroscope(sign.name)}
                >
                  {/* Donut Segment */}
                  <path
                    d={`M ${x1},${y1}
                        A ${outerRadius},${outerRadius} 0 0,1 ${x2},${y2}
                        L ${x3},${y3}
                        A ${innerRadius},${innerRadius} 0 0,0 ${x4},${y4}
                        Z`}
                    fill="rgba(26,26,58,0.8)"
                    stroke="rgba(0, 102, 255, 0.5)"
                    strokeWidth="0.5"
                    className="group-hover:fill-blue-900 transition-all duration-300"
                  />

                  {/* Zodiac Symbol */}
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    fontSize="18"
                    fill="white"
                    dominantBaseline="middle"
                    className="pointer-events-none"
                  >
                    {sign.symbol}
                  </text>

                  {/* Zodiac Name (Warped on Outer Arc) */}
                  <text fill="white" fontSize="6.5">
                    <textPath
                      href={`#arc-${index}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {sign.name}
                    </textPath>
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center "?" Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={openRandomSign}
              className="w-28 h-28 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white rounded-full text-2xl font-bold flex items-center justify-center hover:scale-105 transition-transform"
            >
              ?
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-12 text-blue-400/60 text-sm w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p>
            Alignment of corporate stars may vary. Past performance is not
            indicative of future micromanagement.
          </p>
          <p>
            Breaking the shackles of corporate imprisonment may result in
            benefitial side effects.
          </p>
        </motion.footer>
      </div>

      {/* Horoscope Dialog */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-transparent p-0 rounded-xl max-w-2xl w-full mx-auto"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeHoroscope();
        }}
      >
        {selectedSign && (
          <motion.div
            className="bg-[#1a1a3a] p-8 rounded-xl shadow-lg border border-blue-500/20 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeHoroscope}
              className="absolute top-4 right-4 text-blue-300 hover:text-blue-100 transition-colors"
            >
              ✖
            </button>
            <div className="text-center mb-6">
              <span className="text-5xl block mb-3">
                {zodiacSigns.find((s) => s.name === selectedSign)?.symbol}
              </span>
              <h2 className="text-2xl font-bold text-blue-300">
                {selectedSign}
              </h2>
              <div className="text-sm text-blue-400 mt-1">
                {zodiacSigns.find((s) => s.name === selectedSign)?.period}
              </div>
            </div>
            <p className="text-lg leading-relaxed text-blue-100">
              {
                corporateHoroscopes[
                  selectedSign as keyof typeof corporateHoroscopes
                ]
              }
            </p>
          </motion.div>
        )}
      </dialog>
    </main>
  );
}
