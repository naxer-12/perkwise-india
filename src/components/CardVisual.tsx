import React, { useState } from 'react';
import { Wifi, RotateCw } from 'lucide-react';
import type { CreditCard } from '../types';

interface CardVisualProps {
  card: CreditCard;
  variant?: 'thumbnail' | 'hero';
  interactive?: boolean;
}

// Brand-specific card styling presets
interface CardTheme {
  background: string;
  accent: string;
  textColor: string;
  chipColor: string;
  glowColor: string;
  lastDigits: string;
}

const CARD_THEMES: Record<string, CardTheme> = {
  'phonepe-sbi-select-black': {
    background: 'linear-gradient(135deg, #090614 0%, #170d38 50%, #291054 100%)',
    accent: '#8b5cf6',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    lastDigits: '9420'
  },
  'sbi-cashback': {
    background: 'linear-gradient(135deg, #081a2e 0%, #0d3859 50%, #0b5280 100%)',
    accent: '#38bdf8',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    lastDigits: '5001'
  },
  'amazon-pay-icici': {
    background: 'linear-gradient(135deg, #101828 0%, #1e293b 50%, #0f172a 100%)',
    accent: '#f59e0b',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    lastDigits: '8842'
  },
  'hdfc-millennia': {
    background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
    accent: '#06b6d4',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    lastDigits: '7219'
  },
  'hdfc-millennia-debit': {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
    accent: '#38bdf8',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    lastDigits: '4190'
  },
  'idfc-wealth-debit': {
    background: 'linear-gradient(135deg, #2b0314 0%, #4a0928 50%, #1f020f 100%)',
    accent: '#f43f5e',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    lastDigits: '9512'
  },
  'fi-federal-debit': {
    background: 'linear-gradient(135deg, #042940 0%, #005C53 50%, #042940 100%)',
    accent: '#9FC131',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(159, 193, 49, 0.3)',
    lastDigits: '6330'
  },
  'jupiter-csb-edge-debit': {
    background: 'linear-gradient(135deg, #181824 0%, #25283d 50%, #13141f 100%)',
    accent: '#f97316',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    lastDigits: '2804'
  },
  'indusind-exclusive-debit': {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1917 50%, #382405 100%)',
    accent: '#eab308',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    lastDigits: '7721'
  },
  'sbi-platinum-debit': {
    background: 'linear-gradient(135deg, #071e3d 0%, #1f4287 50%, #278ea5 100%)',
    accent: '#00adb5',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(0, 173, 181, 0.3)',
    lastDigits: '3499'
  },
  'airtel-axis': {
    background: 'linear-gradient(135deg, #3d0014 0%, #660022 50%, #24000c 100%)',
    accent: '#ef4444',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    lastDigits: '1925'
  },
  'hsbc-live-plus': {
    background: 'linear-gradient(135deg, #171717 0%, #262626 50%, #0f0f0f 100%)',
    accent: '#dc2626',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(220, 38, 38, 0.3)',
    lastDigits: '4682'
  },
  'tata-neu-infinity-rupay': {
    background: 'linear-gradient(135deg, #1b072c 0%, #3b145c 50%, #150424 100%)',
    accent: '#c084fc',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    lastDigits: '6015'
  },
  'tata-neu-infinity-hdfc': {
    background: 'linear-gradient(135deg, #1b072c 0%, #3b145c 50%, #150424 100%)',
    accent: '#c084fc',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    lastDigits: '6016'
  },
  'axis-atlas': {
    background: 'linear-gradient(135deg, #1e1b2e 0%, #3b3554 50%, #241f38 100%)',
    accent: '#c4b5fd',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(196, 181, 253, 0.3)',
    lastDigits: '8114'
  },
  'scapia-federal': {
    background: 'linear-gradient(135deg, #0d212b 0%, #163644 50%, #0a1922 100%)',
    accent: '#2dd4bf',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(45, 212, 191, 0.3)',
    lastDigits: '5920'
  },
  'au-ixigo': {
    background: 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #1e1b4b 100%)',
    accent: '#f97316',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    lastDigits: '9180'
  },
  'bpcl-sbi-octane': {
    background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #022c22 100%)',
    accent: '#eab308',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    lastDigits: '7023'
  },
  'kiwi-axis-rupay': {
    background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #052e16 100%)',
    accent: '#84cc16',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(132, 204, 22, 0.35)',
    lastDigits: '3310'
  },
  'hdfc-infinia-metal': {
    background: 'linear-gradient(135deg, #09090b 0%, #1c1917 50%, #292524 100%)',
    accent: '#d4af37',
    textColor: '#ffffff',
    chipColor: '#e5c07b',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    lastDigits: '1008'
  },
  'axis-olympus': {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
    accent: '#f59e0b',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    lastDigits: '9901'
  }
};

const DEFAULT_THEME: CardTheme = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  accent: '#10b981',
  textColor: '#ffffff',
  chipColor: '#e2b357',
  glowColor: 'rgba(16, 185, 129, 0.3)',
  lastDigits: '7742'
};

export const CardVisual: React.FC<CardVisualProps> = ({ 
  card, 
  variant = 'thumbnail',
  interactive = false 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const theme = CARD_THEMES[card.id] || DEFAULT_THEME;
  const isDebit = card.cardType === 'debit';
  const isHero = variant === 'hero';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 12;
    const rotateX = -(y / (rect.height / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`relative select-none perspective-1000 ${
        isHero ? 'w-full max-w-[380px] h-[230px] mx-auto' : 'w-full h-full min-h-[170px]'
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Container with Flip and Tilt */}
      <div 
        className="w-full h-full relative transition-transform duration-300 transform-style-3d rounded-2xl shadow-lg hover:shadow-xl"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
          boxShadow: `0 12px 30px -8px ${theme.glowColor}, 0 4px 12px rgba(0, 0, 0, 0.15)`
        }}
      >
        {/* FRONT OF THE CARD */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden backface-hidden border border-white/15"
          style={{ background: theme.background, color: theme.textColor }}
        >
          {/* Holographic Sheen Line */}
          <div 
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transform rotate-25"
          />

          {/* Top Row: Bank Name, Card Instrument, Contactless Waves */}
          <div className="relative z-10 flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase block opacity-90">
                {card.bank}
              </span>
              <span className="text-[9px] font-mono tracking-wider text-slate-300 block opacity-80 uppercase">
                {isDebit ? 'High-Yield Debit' : 'Platinum Credit'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 opacity-70 transform rotate-90" />
              {interactive && isHero && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Flip Card"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Middle Row: EMV Gold Chip & Card Name */}
          <div className="relative z-10 flex items-center justify-between gap-2 my-auto">
            {/* Realistic EMV Gold Chip */}
            <div 
              className="w-9 h-7 rounded-md border border-black/20 relative overflow-hidden flex flex-col justify-around p-0.5 shadow-xs"
              style={{ backgroundColor: theme.chipColor }}
            >
              <div className="w-full h-0.5 bg-black/20" />
              <div className="w-full h-0.5 bg-black/20" />
              <div className="w-full h-0.5 bg-black/20" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 -translate-x-1/2" />
            </div>

            <div className="text-right">
              <span className="text-[11px] sm:text-xs font-bold tracking-tight block max-w-[170px] truncate" title={card.name}>
                {card.name.replace(' Credit Card', '').replace(' Debit Card', '')}
              </span>
              {card.dealCategory && (
                <span 
                  className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm inline-block mt-0.5 bg-white/10"
                  style={{ color: theme.accent }}
                >
                  {card.dealCategory}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Row: Masked Card Number, Expiry, Network Badge */}
          <div className="relative z-10 flex items-end justify-between gap-2 pt-1 border-t border-white/10">
            <div>
              <div className="font-mono text-xs sm:text-sm tracking-widest opacity-90 drop-shadow-xs">
                •••• •••• •••• {theme.lastDigits}
              </div>
              <div className="flex items-center gap-3 text-[8px] font-mono text-slate-300 mt-0.5">
                <span>VAL 09/30</span>
                <span className="uppercase truncate max-w-[100px]">VERIFIED HOLDER</span>
              </div>
            </div>

            {/* Network Brand Badge */}
            <div className="text-right shrink-0">
              <span className="text-xs sm:text-sm font-black italic tracking-wider uppercase">
                {card.network}
              </span>
            </div>
          </div>
        </div>

        {/* BACK OF THE CARD (Visible when flipped) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between overflow-hidden backface-hidden transform rotate-y-180 border border-white/15"
          style={{ background: theme.background, color: theme.textColor }}
        >
          {/* Black Magnetic Stripe */}
          <div className="w-full h-9 bg-black/90 mt-4" />

          {/* Signature Strip & CVV */}
          <div className="px-5 space-y-2">
            <div className="flex items-center">
              <div className="flex-1 h-7 bg-white/80 rounded-l-sm flex items-center px-2 text-[10px] text-slate-500 font-mono italic">
                Authorized Signature • Not Valid Unless Signed
              </div>
              <div className="w-12 h-7 bg-white text-slate-950 font-mono font-bold text-xs flex items-center justify-center rounded-r-sm shadow-inner">
                {theme.lastDigits.slice(0, 3)}
              </div>
            </div>

            <p className="text-[8px] text-slate-300 leading-tight opacity-80">
              Governed by RBI Master Direction RBI/2022-23/92. This card remains the property of {card.bank}. For immediate fraud assistance or zero-liability dispute reporting, dial bank helpline.
            </p>
          </div>

          {/* Back Footer */}
          <div className="p-3 bg-black/40 flex items-center justify-between text-[9px] text-slate-300">
            <span>24x7 Customer Concierge</span>
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="font-bold underline text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              Flip to Front ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
