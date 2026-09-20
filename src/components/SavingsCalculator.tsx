import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  Zap, 
  Fuel, 
  Plane, 
  RotateCcw,
  Utensils,
  QrCode,
  Wallet,
  Coins
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface SpendState {
  onlineShopping: number;
  foodDelivery: number;
  groceries: number;
  fuelCommute: number;
  utilitiesBills: number;
  travelFlights: number;
  kiranaUpi: number;
}

const DEFAULT_SPENDS: SpendState = {
  onlineShopping: 12000,
  foodDelivery: 5000,
  groceries: 10000,
  fuelCommute: 6000,
  utilitiesBills: 4000,
  travelFlights: 8000,
  kiranaUpi: 10000
};

interface SavingsCalculatorProps {
  onGoToCards?: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onGoToCards }) => {
  const { t } = useTranslation();
  const [spends, setSpends] = useState<SpendState>(DEFAULT_SPENDS);

  const handleSliderChange = (category: keyof SpendState, value: number) => {
    setSpends(prev => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    setSpends(DEFAULT_SPENDS);
  };

  // Calculations
  const totalMonthlySpend = Object.values(spends).reduce((a, b) => a + b, 0);
  const totalAnnualSpend = totalMonthlySpend * 12;

  // Optimized returns per category:
  const onlineMonthlyReward = Math.min(spends.onlineShopping * 0.05, 5000);
  const foodMonthlyReward = Math.min(spends.foodDelivery * 0.10, 1500);
  const groceryMonthlyReward = Math.min(spends.groceries * 0.10, 1000);
  const fuelMonthlyReward = Math.min(spends.fuelCommute * 0.0725, 725);
  const utilitiesMonthlyReward = Math.min(spends.utilitiesBills * 0.10, 500);
  const travelMonthlyReward = spends.travelFlights * 0.10;
  const upiMonthlyReward = spends.kiranaUpi * 0.015;

  const totalMonthlyOptimizedSavings = 
    onlineMonthlyReward +
    foodMonthlyReward +
    groceryMonthlyReward +
    fuelMonthlyReward +
    utilitiesMonthlyReward +
    travelMonthlyReward +
    upiMonthlyReward;

  const totalAnnualOptimizedSavings = totalMonthlyOptimizedSavings * 12;
  const annualFeesCost = totalAnnualSpend > 300000 ? 500 : 2500;
  const netAnnualProfit = Math.round(totalAnnualOptimizedSavings - annualFeesCost);

  return (
    <div className="relative min-h-[600px] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Centered Elegant Coming Soon Modal / Card */}
      <div className="sticky top-28 z-30 flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
            <Calculator className="w-7 h-7 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {t('common.comingSoon')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t('calculator.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('calculator.description')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 text-left space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-500 animate-pulse-subtle" />
              <span>{t('calculator.whatsComing')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>{t('calculator.feature1')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>{t('calculator.feature2')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>{t('calculator.feature3')}</span>
            </div>
          </div>

          {onGoToCards && (
            <button
              onClick={onGoToCards}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('calculator.backToCards')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Blurred background content */}
      <div className="filter blur-md opacity-40 select-none pointer-events-none space-y-8 -mt-96" aria-hidden="true">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('calculator.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('calculator.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t('calculator.description')}
          </p>
        </div>

        {/* Main Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Your Monthly Spending Breakdown</h3>
                <p className="text-xs text-slate-500">Drag sliders to adjust typical monthly bills</p>
              </div>
              <button
                onClick={handleReset}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('common.clear')}</span>
              </button>
            </div>

            {/* Slider 1: Online Shopping */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  Online Shopping (Amazon, Flipkart, Apparel)
                </span>
                <span className="font-bold text-slate-900">₹{spends.onlineShopping.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={60000}
                step={1000}
                value={spends.onlineShopping}
                onChange={(e) => handleSliderChange('onlineShopping', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 2: Food Delivery */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-rose-500" />
                  Food Delivery &amp; Dining (Swiggy, Zomato)
                </span>
                <span className="font-bold text-slate-900">₹{spends.foodDelivery.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={25000}
                step={500}
                value={spends.foodDelivery}
                onChange={(e) => handleSliderChange('foodDelivery', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 3: Groceries */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-teal-600" />
                  Groceries &amp; Quick-Commerce
                </span>
                <span className="font-bold text-slate-900">₹{spends.groceries.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={40000}
                step={1000}
                value={spends.groceries}
                onChange={(e) => handleSliderChange('groceries', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 4: Fuel */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-amber-600" />
                  Fuel &amp; Commute (Petrol/Diesel, FASTag)
                </span>
                <span className="font-bold text-slate-900">₹{spends.fuelCommute.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={25000}
                step={500}
                value={spends.fuelCommute}
                onChange={(e) => handleSliderChange('fuelCommute', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 5: Utilities */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  Utilities &amp; Bills
                </span>
                <span className="font-bold text-slate-900">₹{spends.utilitiesBills.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={spends.utilitiesBills}
                onChange={(e) => handleSliderChange('utilitiesBills', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 6: Travel */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-cyan-600" />
                  Travel &amp; Flights
                </span>
                <span className="font-bold text-slate-900">₹{spends.travelFlights.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={50000}
                step={1000}
                value={spends.travelFlights}
                onChange={(e) => handleSliderChange('travelFlights', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 7: Kirana UPI */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  Local Kirana &amp; UPI QR Payments
                </span>
                <span className="font-bold text-slate-900">₹{spends.kiranaUpi.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={40000}
                step={1000}
                value={spends.kiranaUpi}
                onChange={(e) => handleSliderChange('kiranaUpi', Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                  Estimated Net Value Captured
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  ₹{netAnnualProfit.toLocaleString('en-IN')}
                  <span className="text-xs text-slate-400 font-normal ml-2">/ year</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Wallet className="w-3.5 h-3.5 text-amber-400 animate-pulse-subtle" />
                  <span>Ideal Multi-Card Stack</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed space-y-1">
              <div className="font-semibold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Realistic Underwriting Assumptions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
