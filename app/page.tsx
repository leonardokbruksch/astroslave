'use client'

import React, { useState, useRef } from 'react'

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', period: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: '♉', period: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: '♊', period: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: '♋', period: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: '♌', period: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: '♍', period: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: '♎', period: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: '♏', period: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: '♐', period: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', symbol: '♑', period: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: '♒', period: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: '♓', period: 'Feb 19 - Mar 20' },
]

const corporateHoroscopes = {
  Aries: "Your assertiveness will be mistaken for 'not being a team player'. Mercury retrograde suggests it's time to write more emails with 'per my last email' to assert dominance.",
  Taurus: "The alignment of Venus indicates your standing desk budget request will finally be approved. Unfortunately, Saturn's position means it's actually a cardboard box.",
  Gemini: "Your multitasking skills will peak this week - perfect timing for when your boss assigns you three people's jobs with no pay increase.",
  Cancer: "The moon's position suggests excellent emotional intelligence this week. Use it to decode what 'let's circle back' really means in your meetings.",
  Leo: "Jupiter aligns perfectly for leadership opportunities! Translation: You'll be voluntold to lead the office birthday committee.",
  Virgo: "Your attention to detail will save a major project! But Mars in retrograde means someone else will take credit in the all-hands meeting.",
  Libra: "The stars suggest great balance this week - between your actual job and your side hustle because inflation is hitting hard.",
  Scorpio: "Your mysterious aura will serve you well when you need to hide from impromptu Zoom calls. Pro tip: 'Internet issues' is still a classic.",
  Sagittarius: "Your optimism will be tested when you realize 'unlimited PTO' actually means 'never take a vacation'.",
  Capricorn: "Your career path is clear as day: straight up the corporate ladder... Oh wait, that's just the emergency exit sign.",
  Aquarius: "Innovation is your strength this week! Perfect timing for suggesting revolutionary ideas that will be shut down for being 'too outside the box'.",
  Pisces: "Your intuition is strong - you'll sense a team-building exercise coming. Quick, schedule a dentist appointment!"
}

export default function Home() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openHoroscope = (sign: string) => {
    setSelectedSign(sign)
    dialogRef.current?.showModal()
  }

  const closeHoroscope = () => {
    dialogRef.current?.close()
    setSelectedSign(null)
  }

  return (
    <main className="min-h-screen bg-[#0a0a1f] text-blue-100 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text mb-4">
          ASTRO SLAVE
        </h1>
        <p className="text-blue-300 text-xl">
          Your corporate destiny, written by spiritually ascended stakeholders
        </p>
      </div>

{/* Zodiac Donut Wheel */}
<div className="relative w-[400px] h-[400px]">
        <svg viewBox="0 0 200 200" className="absolute left-0 top-0 w-full h-full">
          {zodiacSigns.map((sign, index) => {
            const totalSigns = zodiacSigns.length
            const angle = (index / totalSigns) * 2 * Math.PI
            const nextAngle = ((index + 1) / totalSigns) * 2 * Math.PI

            const outerRadius = 80
            const innerRadius = 40
            const textRadius = (outerRadius + innerRadius) / 2 + 5 // Center text better

            // Calculate outer arc points
            const x1 = 100 + outerRadius * Math.cos(angle)
            const y1 = 100 + outerRadius * Math.sin(angle)
            const x2 = 100 + outerRadius * Math.cos(nextAngle)
            const y2 = 100 + outerRadius * Math.sin(nextAngle)

            // Calculate inner arc points
            const x3 = 100 + innerRadius * Math.cos(nextAngle)
            const y3 = 100 + innerRadius * Math.sin(nextAngle)
            const x4 = 100 + innerRadius * Math.cos(angle)
            const y4 = 100 + innerRadius * Math.sin(angle)

            // Calculate symbol positioning
            const textX = 100 + textRadius * Math.cos((angle + nextAngle) / 2)
            const textY = 100 + textRadius * Math.sin((angle + nextAngle) / 2)

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

                {/* Zodiac Symbol (Centered Correctly) */}
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
              </g>
            )
          })}
        </svg>
      </div>

      {/* Horoscope Dialog */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-transparent p-0 rounded-xl max-w-2xl w-full mx-auto open:animate-fade-in"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeHoroscope()
        }}
      >
        {selectedSign && (
          <div className="bg-[#1a1a3a] p-8 rounded-xl shadow-lg border border-blue-500/20 relative">
            <button
              onClick={closeHoroscope}
              className="absolute top-4 right-4 text-blue-300 hover:text-blue-100 transition-colors"
            >
              ✖
            </button>
            <div className="text-center mb-6">
              <span className="text-5xl block mb-3">
                {zodiacSigns.find(s => s.name === selectedSign)?.symbol}
              </span>
              <h2 className="text-2xl font-bold text-blue-300">{selectedSign}</h2>
              <div className="text-sm text-blue-400 mt-1">
                {zodiacSigns.find(s => s.name === selectedSign)?.period}
              </div>
            </div>
            <p className="text-lg leading-relaxed text-blue-100">
              {corporateHoroscopes[selectedSign as keyof typeof corporateHoroscopes]}
            </p>
          </div>
        )}
      </dialog>

      {/* Footer */}
      <footer className="text-center mt-12 text-blue-400/60 text-sm">
        <p>Alignment of corporate stars may vary. Past performance is not indicative of future micromanagement.</p>
      </footer>
    </main>
  )
}
