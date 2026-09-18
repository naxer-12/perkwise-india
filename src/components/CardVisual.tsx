import React, { useState } from 'react';
import type { CreditCard } from '../types';

interface CardVisualProps {
  card: CreditCard;
  variant?: 'thumbnail' | 'hero';
  interactive?: boolean;
}

const CARD_IMAGE_FILES: Record<string, string> = {
  'phonepe-sbi-select-black': 'phonepe-sbi-select-black.png',
  'sbi-cashback': 'sbi-cashback.png',
  'amazon-pay-icici': 'amazon-pay-icici.png',
  'hdfc-millennia': 'hdfc-millennia.png',
  'hdfc-millennia-debit': 'hdfc-millennia-debit.png',
  'airtel-axis': 'airtel-axis.png',
  'tata-neu-infinity-rupay': 'tata-neu-infinity-rupay.png',
  'tata-neu-infinity-hdfc': 'tata-neu-infinity-hdfc.png',
  'hdfc-infinia-metal': 'hdfc-infinia-metal.png',
  'axis-atlas': 'axis-atlas.png',
  'idfc-wealth-debit': 'idfc-wealth-debit.png',
  'scapia-federal': 'scapia-federal.png',
  'hsbc-live-plus': 'hsbc-live-plus.png',
  'au-ixigo': 'au-ixigo.png',
  'bpcl-sbi-octane': 'bpcl-sbi-octane.png',
  'hdfc-swiggy': 'hdfc-swiggy.svg',
  'idfc-first-wow': 'idfc-first-wow.svg',
  'hpcl-bob-energie': 'hpcl-bob-energie.svg',
  'kiwi-axis-rupay': 'kiwi-axis-rupay.svg',
  'axis-olympus': 'axis-olympus.svg',
  'fi-federal-debit': 'fi-federal-debit.svg',
  'jupiter-csb-edge-debit': 'jupiter-csb-edge-debit.svg',
  'indusind-exclusive-debit': 'indusind-exclusive-debit.svg',
  'sbi-platinum-debit': 'sbi-platinum-debit.svg',
};

export const CardVisual: React.FC<CardVisualProps> = ({ 
  card, 
  variant = 'thumbnail'
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const rawBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL 
    ? import.meta.env.BASE_URL 
    : './';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  const fileName = CARD_IMAGE_FILES[card.id];
  const imageUrl = fileName ? `${base}cards/${fileName}` : null;

  if (variant === 'thumbnail') {
    return (
      <div 
        className="w-full h-full relative select-none flex items-center justify-center bg-transparent"
        style={{ aspectRatio: '1.586' }}
      >
        {imageUrl && !imgFailed ? (
          <img 
            src={imageUrl} 
            alt={card.name} 
            onError={() => setImgFailed(true)}
            className="w-full h-auto max-h-full object-contain filter drop-shadow-md transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-slate-900 text-white rounded-xl shadow-md">
            <span className="text-[11px] font-bold uppercase text-slate-300">{card.bank}</span>
            <span className="text-xs font-bold leading-tight">{card.name}</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">{card.network}</span>
          </div>
        )}
      </div>
    );
  }

  // Hero variant: Clean, background-free card view
  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <div 
        className="w-full max-w-[340px] sm:max-w-[380px] relative select-none flex items-center justify-center bg-transparent"
        style={{ aspectRatio: '1.586' }}
      >
        {imageUrl && !imgFailed ? (
          <img 
            src={imageUrl} 
            alt={card.name} 
            onError={() => setImgFailed(true)}
            className="w-full h-auto max-h-[240px] object-contain filter drop-shadow-2xl"
          />
        ) : (
          <div className="w-full h-full p-6 flex flex-col justify-between text-white bg-slate-900 rounded-2xl shadow-xl">
            <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">{card.bank}</span>
            <span className="text-lg font-bold leading-tight">{card.name}</span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{card.network}</span>
          </div>
        )}
      </div>
    </div>
  );
};
