import React, { useState } from 'react';
import { Wifi, RotateCw, Camera, ShieldCheck } from 'lucide-react';
import type { CreditCard } from '../types';

interface CardVisualProps {
  card: CreditCard;
  variant?: 'thumbnail' | 'hero';
  interactive?: boolean;
}

// Brand-specific card styling presets for realistic physical card rendering
interface CardTheme {
  background: string;
  accent: string;
  textColor: string;
  chipColor: string;
  glowColor: string;
  lastDigits: string;
  cardFinish: 'brushed-metal' | 'matte' | 'glossy' | 'carbon';
}

const REAL_CARD_PHOTOS: Record<string, string> = {
  'phonepe-sbi-select-black': 'phonepe-sbi-select-black.jpg',
  'sbi-cashback': 'sbi-cashback.jpg',
  'amazon-pay-icici': 'amazon-pay-icici.jpg',
  'hdfc-millennia': 'hdfc-millennia.jpg',
  'hdfc-millennia-debit': 'hdfc-millennia-debit.jpg',
  'airtel-axis': 'airtel-axis.jpg',
  'tata-neu-infinity-rupay': 'tata-neu-infinity-rupay.jpg',
  'tata-neu-infinity-hdfc': 'tata-neu-infinity-hdfc.jpg',
  'hdfc-infinia-metal': 'hdfc-infinia-metal.jpg',
  'axis-atlas': 'axis-atlas.jpg',
  'idfc-wealth-debit': 'idfc-wealth-debit.jpg',
  'scapia-federal': 'scapia-federal.jpg',
  'hsbc-live-plus': 'hsbc-live-plus.jpg',
  'au-ixigo': 'au-ixigo.jpg',
  'bpcl-sbi-octane': 'bpcl-sbi-octane.jpg',
};

const CARD_THEMES: Record<string, CardTheme> = {
  'phonepe-sbi-select-black': {
    background: 'linear-gradient(135deg, #090614 0%, #170d38 50%, #291054 100%)',
    accent: '#8b5cf6',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    lastDigits: '9420',
    cardFinish: 'matte'
  },
  'sbi-cashback': {
    background: 'linear-gradient(135deg, #081a2e 0%, #0d3859 50%, #0b5280 100%)',
    accent: '#38bdf8',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    lastDigits: '5001',
    cardFinish: 'glossy'
  },
  'amazon-pay-icici': {
    background: 'linear-gradient(135deg, #101828 0%, #1e293b 50%, #0f172a 100%)',
    accent: '#f59e0b',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    lastDigits: '8842',
    cardFinish: 'matte'
  },
  'hdfc-millennia': {
    background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
    accent: '#06b6d4',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    lastDigits: '7219',
    cardFinish: 'glossy'
  },
  'hdfc-millennia-debit': {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
    accent: '#38bdf8',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    lastDigits: '4190',
    cardFinish: 'glossy'
  },
  'idfc-first-wow': {
    background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #0c0a09 100%)',
    accent: '#f59e0b',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    lastDigits: '2109',
    cardFinish: 'matte'
  },
  'hdfc-swiggy': {
    background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    accent: '#fc8019',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(252, 128, 25, 0.35)',
    lastDigits: '6482',
    cardFinish: 'matte'
  },
  'idfc-wealth-debit': {
    background: 'linear-gradient(135deg, #2b0314 0%, #4a0928 50%, #1f020f 100%)',
    accent: '#f43f5e',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    lastDigits: '9512',
    cardFinish: 'matte'
  },
  'fi-federal-debit': {
    background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #042f2e 100%)',
    accent: '#10b981',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    lastDigits: '6330',
    cardFinish: 'matte'
  },
  'jupiter-csb-edge-debit': {
    background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)',
    accent: '#f97316',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    lastDigits: '2804',
    cardFinish: 'matte'
  },
  'indusind-exclusive-debit': {
    background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
    accent: '#eab308',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(234, 179, 8, 0.35)',
    lastDigits: '7721',
    cardFinish: 'brushed-metal'
  },
  'sbi-platinum-debit': {
    background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
    accent: '#38bdf8',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    lastDigits: '3499',
    cardFinish: 'glossy'
  },
  'airtel-axis': {
    background: 'linear-gradient(135deg, #3d0014 0%, #660022 50%, #24000c 100%)',
    accent: '#ef4444',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    lastDigits: '1925',
    cardFinish: 'matte'
  },
  'hsbc-live-plus': {
    background: 'linear-gradient(135deg, #171717 0%, #262626 50%, #0f0f0f 100%)',
    accent: '#dc2626',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(220, 38, 38, 0.3)',
    lastDigits: '4682',
    cardFinish: 'matte'
  },
  'tata-neu-infinity-rupay': {
    background: 'linear-gradient(135deg, #1b072c 0%, #3b145c 50%, #150424 100%)',
    accent: '#c084fc',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    lastDigits: '6015',
    cardFinish: 'matte'
  },
  'tata-neu-infinity-hdfc': {
    background: 'linear-gradient(135deg, #1b072c 0%, #3b145c 50%, #150424 100%)',
    accent: '#c084fc',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    lastDigits: '6016',
    cardFinish: 'matte'
  },
  'axis-atlas': {
    background: 'linear-gradient(135deg, #1e1b2e 0%, #3b3554 50%, #241f38 100%)',
    accent: '#c4b5fd',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(196, 181, 253, 0.3)',
    lastDigits: '8114',
    cardFinish: 'matte'
  },
  'scapia-federal': {
    background: 'linear-gradient(135deg, #0d212b 0%, #163644 50%, #0a1922 100%)',
    accent: '#2dd4bf',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(45, 212, 191, 0.3)',
    lastDigits: '5920',
    cardFinish: 'matte'
  },
  'au-ixigo': {
    background: 'linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #1e1b4b 100%)',
    accent: '#f97316',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    lastDigits: '9180',
    cardFinish: 'glossy'
  },
  'bpcl-sbi-octane': {
    background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #022c22 100%)',
    accent: '#eab308',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    lastDigits: '7023',
    cardFinish: 'glossy'
  },
  'hpcl-bob-energie': {
    background: 'linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #0369a1 100%)',
    accent: '#ea580c',
    textColor: '#ffffff',
    chipColor: '#e2b357',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    lastDigits: '4831',
    cardFinish: 'glossy'
  },
  'kiwi-axis-rupay': {
    background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #052e16 100%)',
    accent: '#84cc16',
    textColor: '#ffffff',
    chipColor: '#d4af37',
    glowColor: 'rgba(132, 204, 22, 0.35)',
    lastDigits: '3310',
    cardFinish: 'carbon'
  },
  'hdfc-infinia-metal': {
    background: 'linear-gradient(135deg, #09090b 0%, #1c1917 50%, #292524 100%)',
    accent: '#d4af37',
    textColor: '#ffffff',
    chipColor: '#e5c07b',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    lastDigits: '1008',
    cardFinish: 'brushed-metal'
  },
  'axis-olympus': {
    background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
    accent: '#fbbf24',
    textColor: '#ffffff',
    chipColor: '#e5c07b',
    glowColor: 'rgba(251, 191, 36, 0.35)',
    lastDigits: '9901',
    cardFinish: 'brushed-metal'
  }
};

const DEFAULT_THEME: CardTheme = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  accent: '#10b981',
  textColor: '#ffffff',
  chipColor: '#e2b357',
  glowColor: 'rgba(16, 185, 129, 0.3)',
  lastDigits: '7742',
  cardFinish: 'matte'
};

export const CardVisual: React.FC<CardVisualProps> = ({ 
  card, 
  variant = 'thumbnail',
  interactive = false 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgFailed, setImgFailed] = useState(false);

  // Compute asset URL safely handling relative or absolute vite base
  const rawBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL 
    ? import.meta.env.BASE_URL 
    : './';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const photoFileName = REAL_CARD_PHOTOS[card.id];
  const photoUrl = photoFileName ? `${base}cards/${photoFileName}` : null;
  const hasRealPhoto = Boolean(photoUrl && !imgFailed);

  // In hero mode, default to 'photo' if a real card photo exists, otherwise 'model'
  const [heroMode, setHeroMode] = useState<'photo' | 'model'>(hasRealPhoto ? 'photo' : 'model');

  const theme = CARD_THEMES[card.id] || DEFAULT_THEME;
  const isDebit = card.cardType === 'debit';

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

  // Helper for rendering realistic physical card front
  const renderPhysicalCardFront = (showFlipButton: boolean) => (
    <div 
      className="absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden backface-hidden border border-white/20 shadow-inner"
      style={{ background: theme.background, color: theme.textColor }}
    >
      {/* Brushed metal or fine texture highlight line */}
      <div 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-25 bg-gradient-to-tr from-transparent via-white to-transparent transform rotate-25"
      />

      {/* Top Row: Bank Name, Card Instrument, Contactless Waves */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase block opacity-95 drop-shadow-xs">
            {card.bank}
          </span>
          <span className="text-[9px] font-mono tracking-wider text-slate-300 block opacity-80 uppercase">
            {isDebit ? 'High-Yield Debit' : 'Platinum Credit'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 opacity-75 transform rotate-90" />
          {showFlipButton && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Flip Card"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Middle Row: Realistic EMV Microchip & Card Name */}
      <div className="relative z-10 flex items-center justify-between gap-2 my-auto">
        {/* Realistic EMV Gold Chip with physical circuit pads */}
        <div 
          className="w-10 h-7 rounded-md border border-amber-800/40 relative overflow-hidden flex flex-col justify-around p-0.5 shadow-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600"
        >
          <div className="w-full h-0.5 bg-amber-800/30" />
          <div className="w-full h-0.5 bg-amber-800/30" />
          <div className="w-full h-0.5 bg-amber-800/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-800/30 -translate-x-1/2" />
        </div>

        {/* Card Title & Category */}
        <div className="text-right">
          <span className="text-[11px] sm:text-xs font-bold tracking-tight block max-w-[170px] truncate drop-shadow-xs" title={card.name}>
            {card.name.replace(' Credit Card', '').replace(' Debit Card', '')}
          </span>
          {card.dealCategory && (
            <span 
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-sm inline-block mt-0.5 bg-white/10 backdrop-blur-xs"
              style={{ color: theme.accent }}
            >
              {card.dealCategory}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Row: Embossed Masked Card Number, Expiry, Network Badge */}
      <div className="relative z-10 flex items-end justify-between gap-2 pt-1 border-t border-white/15">
        <div>
          <div className="font-mono text-xs sm:text-sm tracking-widest font-bold opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            •••• •••• •••• {theme.lastDigits}
          </div>
          <div className="flex items-center gap-3 text-[8px] font-mono text-slate-300 mt-0.5">
            <span>VAL 09/30</span>
            <span className="uppercase truncate max-w-[100px]">VERIFIED HOLDER</span>
          </div>
        </div>

        {/* Network Brand Badge */}
        <div className="text-right shrink-0">
          <span className="text-xs sm:text-sm font-black italic tracking-wider uppercase drop-shadow-xs">
            {card.network}
          </span>
        </div>
      </div>
    </div>
  );

  // Helper for rendering realistic physical card back
  const renderPhysicalCardBack = () => (
    <div 
      className="absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between overflow-hidden backface-hidden transform rotate-y-180 border border-white/20 shadow-2xl"
      style={{ background: theme.background, color: theme.textColor }}
    >
      {/* Black Magnetic Stripe */}
      <div className="w-full h-9 bg-neutral-950 mt-4 shadow-inner" />

      {/* Signature Strip & CVV */}
      <div className="px-5 space-y-2">
        <div className="flex items-center">
          <div className="flex-1 h-7 bg-slate-100 rounded-l-sm flex items-center px-2 text-[10px] text-slate-600 font-mono italic select-none">
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
      <div className="p-3 bg-black/50 flex items-center justify-between text-[9px] text-slate-300">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Statutory Protection</span>
        </span>
        <button
          type="button"
          onClick={() => setIsFlipped(false)}
          className="font-bold underline text-emerald-400 hover:text-emerald-300 cursor-pointer"
        >
          Flip to Front ↺
        </button>
      </div>
    </div>
  );

  // 1. THUMBNAIL VARIANT: Used in Grid Cards and Checklist Banner
  if (variant === 'thumbnail') {
    return (
      <div 
        className="w-full h-full relative select-none rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center bg-slate-950"
        style={{ aspectRatio: '1.586' }}
      >
        {hasRealPhoto ? (
          <div className="relative w-full h-full group/photo overflow-hidden rounded-2xl">
            <img 
              src={photoUrl!} 
              alt={`${card.name} real card demonstration`} 
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover object-center transform group-hover/photo:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {/* Subtle specular sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
            
            {/* Real Card Badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs border border-white/20 text-[9px] font-bold text-emerald-300 flex items-center gap-1 shadow-xs pointer-events-none">
              <Camera className="w-2.5 h-2.5 text-emerald-400" />
              <span>Real Card</span>
            </div>

            {/* Subtle bottom info bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 py-1.5 flex items-end justify-between text-white text-[10px] pointer-events-none">
              <span className="font-semibold truncate max-w-[170px] drop-shadow-xs">{card.bank}</span>
              <span className="font-mono text-[9px] font-bold text-slate-200 uppercase drop-shadow-xs">{card.network}</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {renderPhysicalCardFront(false)}
          </div>
        )}
      </div>
    );
  }

  // 2. HERO VARIANT: Used in CardDetailModal
  return (
    <div className="w-full flex flex-col items-center">
      {/* View Mode Toggle Switcher when real photograph exists */}
      {hasRealPhoto && (
        <div className="flex items-center justify-center mb-3">
          <div className="inline-flex items-center p-1 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 text-xs shadow-md">
            <button
              type="button"
              onClick={() => setHeroMode('photo')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                heroMode === 'photo'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Real Card Demonstration</span>
            </button>
            <button
              type="button"
              onClick={() => setHeroMode('model')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                heroMode === 'model'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>3D Interactive & Back</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Card Container */}
      <div 
        className="relative select-none perspective-1000 w-full max-w-[380px] h-[230px] mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Real Photo Demonstration Mode */}
        {hasRealPhoto && heroMode === 'photo' ? (
          <div 
            className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group transition-transform duration-200"
            style={{
              transform: interactive ? `rotateX(${tilt.x * 0.7}deg) rotateY(${tilt.y * 0.7}deg)` : 'none',
              boxShadow: `0 16px 36px -8px ${theme.glowColor}, 0 6px 16px rgba(0, 0, 0, 0.3)`
            }}
          >
            <img 
              src={photoUrl!} 
              alt={`${card.name} physical card demonstration`}
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-300"
            />

            {/* Specular glare sheen tracking mouse */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none transition-opacity duration-300"
              style={{
                opacity: interactive ? 0.8 : 0.4,
                transform: `translateX(${tilt.y * 4}px) translateY(${tilt.x * 4}px)`
              }}
            />

            {/* Corner Badges */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1.5 shadow-md">
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Real Card Demonstration</span>
            </div>

            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs border border-white/10 text-[9px] font-mono font-semibold text-slate-300">
              {card.bank} • {card.network}
            </div>
          </div>
        ) : (
          /* Interactive 3D Model with Flip and Tilt */
          <div 
            className="w-full h-full relative transition-transform duration-300 transform-style-3d rounded-2xl shadow-lg hover:shadow-xl"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
              boxShadow: `0 12px 30px -8px ${theme.glowColor}, 0 4px 12px rgba(0, 0, 0, 0.15)`
            }}
          >
            {renderPhysicalCardFront(interactive)}
            {renderPhysicalCardBack()}
          </div>
        )}
      </div>

      {/* Descriptive caption underneath hero card */}
      <p className="text-[11px] text-slate-400 font-mono mt-3 text-center flex items-center justify-center gap-1.5">
        {hasRealPhoto && heroMode === 'photo' ? (
          <>
            <span>Studio photograph of official physical card</span>
            <span>•</span>
            <span className="text-emerald-400">Zero mockup bias</span>
          </>
        ) : (
          <>
            <span>Hover to tilt in 3D</span>
            <span>•</span>
            <span>Click flip button ↺ to inspect back</span>
          </>
        )}
      </p>
    </div>
  );
};
