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
  Pisces: "Your intuition is strong - you'll sense a team building exercise coming. Quick, schedule a dentist appointment!"
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
    <main className="min-h-screen bg-[#0a0a1f] text-blue-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text mb-4">
          ASTRO SLAVE
        </h1>
        <p className="text-blue-300 text-xl">
          Your corporate destiny, written in the fluorescent lights above
        </p>
      </div>

      {/* Zodiac Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.name}
            onClick={() => openHoroscope(sign.name)}
            className="p-6 rounded-lg bg-[#1a1a3a] hover:bg-blue-900/50 transition-all duration-300 text-center group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              {sign.symbol}
            </div>
            <div className="text-xl font-semibold">{sign.name}</div>
            <div className="text-sm text-blue-300">{sign.period}</div>
          </button>
        ))}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
