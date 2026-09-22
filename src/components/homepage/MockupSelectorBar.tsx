import React from 'react';
import { Sparkles, Layers, SlidersHorizontal, Plane, Clock, Search } from 'lucide-react';

export type MockupId = 'bento' | 'isometric' | 'terminal' | 'runway' | 'timeline';

interface MockupSelectorBarProps {
  currentMockup: MockupId;
  onSelectMockup: (id: MockupId) => void;
}

export const MOCKUP_CONFIGS: { id: MockupId; label: string; tag: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'bento', label: '1. Clean Bento', tag: 'Minimal', icon: Layers },
  { id: 'isometric', label: '2. Card Deck & Deals', tag: 'Calm & Exciting', icon: Sparkles },
  { id: 'terminal', label: '3. Quick Search', tag: 'Smart Answers', icon: Search },
  { id: 'runway', label: '4. Lounge Concierge', tag: 'Travel', icon: Plane },
  { id: 'timeline', label: '5. Daily Savings', tag: 'Routine Flow', icon: Clock }
];

export const MockupSelectorBar: React.FC<MockupSelectorBarProps> = ({
  currentMockup,
  onSelectMockup
}) => {
  return (
    <div className="w-full bg-slate-100/80 border-b border-slate-200/80 py-2 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">
            Design Preview:
          </span>
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            Switch between 5 clean layout concepts
          </span>
        </div>

        {/* Minimalist Segmented Pill Control */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl border border-slate-200 overflow-x-auto max-w-full scrollbar-none">
          {MOCKUP_CONFIGS.map(m => {
            const Icon = m.icon;
            const isSelected = currentMockup === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectMockup(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{m.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal hidden lg:inline ${
                  isSelected ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-400'
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
