import React from 'react';

interface PerkWiseLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

const SIZE_MAP = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
  xl: 'w-14 h-14'
};

export const PerkWiseLogo: React.FC<PerkWiseLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  animated = true
}) => {
  const sizeClass = SIZE_MAP[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className} group`}>
      {/* Brand Icon SVG */}
      <div 
        className={`relative ${sizeClass} rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-0.5 shadow-md shadow-emerald-950/20 flex items-center justify-center overflow-hidden transition-all duration-300 ${
          animated ? 'group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-emerald-700/30' : ''
        }`}
      >
        {/* Subtle Ambient Backlight */}
        <div className="absolute inset-0 bg-radial from-emerald-400/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full transition-transform duration-300 ${
            animated ? 'group-hover:rotate-1 group-hover:scale-[1.02]' : ''
          }`}
        >
          <defs>
            {/* Emerald Gradient */}
            <linearGradient id="pwCardGrad" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="0.5" stopColor="#047857" />
              <stop offset="1" stopColor="#0f766e" />
            </linearGradient>

            {/* Gold EMV Chip Gradient */}
            <linearGradient id="pwChipGrad" x1="9" y1="12" x2="16" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde047" />
              <stop offset="0.5" stopColor="#eab308" />
              <stop offset="1" stopColor="#ca8a04" />
            </linearGradient>

            {/* Gloss Highlight */}
            <linearGradient id="pwGloss" x1="6" y1="6" x2="34" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Background Card Base Frame */}
          <rect 
            x="3" 
            y="5" 
            width="34" 
            height="30" 
            rx="6" 
            fill="url(#pwCardGrad)" 
            stroke="rgba(255,255,255,0.22)" 
            strokeWidth="1"
          />

          {/* Diagonal Gloss Sweep */}
          <path 
            d="M3 14C3 8.477 7.477 5 13 5H27L7 35H3V14Z" 
            fill="url(#pwGloss)" 
          />

          {/* EMV Microchip (representing smart cards & banking) */}
          <g className={`transition-opacity duration-300 ${animated ? 'group-hover:brightness-110' : ''}`}>
            <rect 
              x="7.5" 
              y="10.5" 
              width="7" 
              height="6" 
              rx="1.5" 
              fill="url(#pwChipGrad)" 
              stroke="#a16207" 
              strokeWidth="0.5" 
            />
            <line x1="7.5" y1="13.5" x2="14.5" y2="13.5" stroke="#713f12" strokeWidth="0.5" />
            <line x1="11" y1="10.5" x2="11" y2="16.5" stroke="#713f12" strokeWidth="0.5" />
          </g>

          {/* Contactless Perks Waves (3 arcs indicating active wireless transmission & perks) */}
          <g className="text-emerald-200" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path 
              d="M30 11C31.5 12.5 31.5 15.5 30 17" 
              className={animated ? 'origin-center transition-all duration-300 group-hover:scale-110 group-hover:stroke-white' : ''} 
            />
            <path 
              d="M27 12.5C28 13.5 28 14.5 27 15.5" 
              className={animated ? 'origin-center transition-all duration-300 group-hover:stroke-emerald-100' : ''} 
            />
          </g>

          {/* Distinct Indian Rupee (₹) Symbol (Financial return & compounding perk math) */}
          <g 
            className={`transition-transform duration-300 ${
              animated ? 'group-hover:scale-105 group-hover:translate-x-0.5' : ''
            }`}
          >
            {/* Top Rupee Bar */}
            <path 
              d="M17 19.5H29" 
              stroke="#ffffff" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
            />
            {/* Second Rupee Bar */}
            <path 
              d="M17 23H27" 
              stroke="#ffffff" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
            />
            {/* Rupee Loop and Leg */}
            <path 
              d="M21 19.5V23M21 23C23.5 23 25 24 25 26C25 28 23 29 20.5 29H18.5L26 36.5" 
              stroke="#ffffff" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>

          {/* Bottom Security Hologram Accent */}
          <circle 
            cx="32" 
            cy="29" 
            r="3" 
            fill="#10b981" 
            fillOpacity="0.4" 
            stroke="#6ee7b7" 
            strokeWidth="0.8" 
          />
          <circle 
            cx="29" 
            cy="29" 
            r="3" 
            fill="#34d399" 
            fillOpacity="0.3" 
          />
        </svg>
      </div>

      {/* Brand Text (Optional) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-none">
              PerkWise
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 uppercase tracking-wider leading-none">
              India 🇮🇳
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-500 leading-none mt-1 hidden sm:block">
            Deals, Perks &amp; Daily Operations
          </span>
        </div>
      )}
    </div>
  );
};
