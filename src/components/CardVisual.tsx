import React, { useState } from 'react';
import type { CreditCard } from '../types';

interface CardVisualProps {
  card: CreditCard;
  variant?: 'thumbnail' | 'hero';
  interactive?: boolean;
}

const CARD_IMAGE_FILES: Record<string, string> = {
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
        className="w-full h-full relative select-none rounded-xl overflow-hidden flex items-center justify-center bg-slate-100 border border-slate-200/80 shadow-xs"
        style={{ aspectRatio: '1.586' }}
      >
        {imageUrl && !imgFailed ? (
          <img 
            src={imageUrl} 
            alt={card.name} 
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center rounded-xl"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-slate-900 text-white rounded-xl">
            <span className="text-[11px] font-bold uppercase text-slate-300">{card.bank}</span>
            <span className="text-xs font-bold leading-tight">{card.name}</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">{card.network}</span>
          </div>
        )}
      </div>
    );
  }

  // Hero variant: Clean, authentic card representation without 3D tilt/glare effects
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div 
        className="w-full max-w-[340px] sm:max-w-[380px] relative select-none rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900"
        style={{ aspectRatio: '1.586' }}
      >
        {imageUrl && !imgFailed ? (
          <img 
            src={imageUrl} 
            alt={card.name} 
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center rounded-2xl"
          />
        ) : (
          <div className="w-full h-full p-6 flex flex-col justify-between text-white">
            <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">{card.bank}</span>
            <span className="text-lg font-bold leading-tight">{card.name}</span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{card.network}</span>
          </div>
        )}
      </div>
    </div>
  );
};
