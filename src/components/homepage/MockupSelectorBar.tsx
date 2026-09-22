import React from 'react';
import { Sparkles, Layers, Sliders, Plane, Clock, Terminal } from 'lucide-react';

export type MockupId = 'bento' | 'isometric' | 'terminal' | 'runway' | 'timeline';

interface MockupSelectorBarProps {
  currentMockup: MockupId;
  onSelectMockup: (id: MockupId) => void;
}

export const MOCKUP_CONFIGS: { id: MockupId; label: string; tag: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'bento', label: '1. Fintech Bento Canvas', tag: 'Micro-Interactions', icon: Layers },
  { id: 'isometric', label: '2. 3D Isometric Deck', tag: 'Kinetic Flow', icon: Sparkles },
  { id: 'terminal', label: '3. High-Alpha Terminal', tag: 'Typewriter Search', icon: Terminal },
  { id: 'runway', label: '4. Airport Concierge', tag: 'Lounge Radar', icon: Plane },
  { id: 'timeline', label: '5. 24h Daily Life Flow', tag: 'Day Simulator', icon: Clock }
];

export const MockupSelectorBar: React.FC<MockupSelectorBarProps> = ({
  currentMockup,
  onSelectMockup
}) => {
  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 py-2.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-extrabold text-white tracking-wide uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Homepage Design Iterations</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-700/50">
            5 Live Variants
          </span>
        </div>

        {/* 5 Mockup Toggle Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {MOCKUP_CONFIGS.map(m => {
            const Icon = m.icon;
            const isSelected = currentMockup === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectMockup(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
                }`}
                title={`Switch to ${m.label}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{m.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-normal hidden lg:inline ${
                  isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-900 text-slate-400'
                }`}>
                  {m.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
