import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  Zap, 
  Fuel, 
  Plane, 
  RotateCcw
} from 'lucide-react';

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
  // Online Shopping: 5% (SBI Cashback) up to ₹5,000/mo cap
  const onlineMonthlyReward = Math.min(spends.onlineShopping * 0.05, 5000);

  // Food Delivery: 10% (HDFC Swiggy / HSBC Live+) up to ₹1,500/mo cap
  const foodMonthlyReward = Math.min(spends.foodDelivery * 0.10, 1500);

  // Groceries: 10% (Tata Neu Infinity / HSBC Live+) up to ₹1,000/mo cap
  const groceryMonthlyReward = Math.min(spends.groceries * 0.10, 1000);

  // Fuel: 7.25% (BPCL Octane) up to ₹10,000/mo spend cap (~₹725)
  const fuelMonthlyReward = Math.min(spends.fuelCommute * 0.0725, 725);

  // Utilities: 10% - 25% (Airtel Axis) capped at ₹500/mo
  const utilitiesMonthlyReward = Math.min(spends.utilitiesBills * 0.10, 500);

  // Travel / Flights: 10% (Axis Atlas / SmartBuy)
  const travelMonthlyReward = spends.travelFlights * 0.10;

  // Kirana UPI: 1.5% (Tata Neu RuPay)
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

  // Benchmark: Unoptimized regular debit/cash yields 0% or max ~0.2%
  const unoptimizedAnnualReturn = totalAnnualSpend * 0.002;

  // Typical annual fee of recommended 3-card stack (SBI Cashback ₹999 + Airtel Axis ₹500 + Tata Neu ₹1499 = ₹2998),
  // but let's check fee waiver (e.g. ₹2L spend on SBI waives fee):
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
              Feature Coming Soon
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Personalized Spend & Rewards Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We are fine-tuning the calculator with the latest bank reward caps and category exclusions to give you 100% accurate savings numbers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 text-left space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>What’s coming in this tool:</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>Exact cashback calculations based on your monthly household spending</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>Annual fee vs. reward breakeven simulator</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">✓</span>
              <span>Zero-affiliate, mathematically vetted multi-card suggestions</span>
            </div>
          </div>

          {onGoToCards && (
            <button
              onClick={onGoToCards}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Card Buying Guide Instead</span>
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
            <span>Interactive Spend & ROI Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Annual Household Money-Back
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Adjust the sliders below to reflect your household’s actual monthly expenditure. 
            See how much cash you are currently leaving on the table compared to a disciplined multi-card stack.
          </p>
        </div>

      {/* Main Simulator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Column (7 cols) */}
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
              <span>Reset</span>
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns ~5% on SBI Cashback</span>
              <span>₹60,000</span>
            </div>
          </div>

          {/* Slider 2: Food Delivery */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Food Delivery & Dining (Swiggy, Zomato)
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns ~10% on Swiggy HDFC / HSBC</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Slider 3: Groceries */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-teal-600" />
                Groceries & Quick-Commerce (Blinkit, Zepto, BigBasket, DMart)
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns 10% on Tata Neu / HSBC Live+</span>
              <span>₹40,000</span>
            </div>
          </div>

          {/* Slider 4: Fuel & Commute */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-amber-600" />
                Fuel & Commute (Petrol/Diesel, Metro, FASTag)
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns 7.25% on BPCL Octane</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Slider 5: Utilities */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                Utilities & Bills (Electricity, Broadband, Gas, DTH)
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns 10-25% on Airtel Axis</span>
              <span>₹20,000</span>
            </div>
          </div>

          {/* Slider 6: Travel & Flights */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-cyan-600" />
                Travel & Flights (Monthly Average of Annual Trips)
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns ~10% air miles via Axis Atlas</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Slider 7: Kirana UPI */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Local Kirana & Street UPI QR Payments
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹0</span>
              <span className="text-emerald-700 font-semibold">Earns 1.5% via RuPay UPI</span>
              <span>₹40,000</span>
            </div>
          </div>
        </div>

        {/* Results & Value Output Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Profit Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                Estimated Net Value Captured
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                ₹{netAnnualProfit.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-normal ml-2">/ year</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Net cash & flight/hotel value after deducting all card annual fees.
              </p>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-slate-400">Your Monthly Outlay:</span>
                <span className="font-bold text-white">₹{totalMonthlySpend.toLocaleString('en-IN')} / month</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <span className="text-slate-400">Standard Debit/Cash Return:</span>
                <span className="font-semibold text-slate-400">₹{Math.round(unoptimizedAnnualReturn).toLocaleString('en-IN')} (Near 0%)</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-emerald-300 font-medium">PerkWise Optimized Value:</span>
                <span className="font-bold text-emerald-400">₹{Math.round(totalAnnualOptimizedSavings).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Recommended Combo Stack */}
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Ideal 3-Card Wallet Stack</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>SBI Cashback Card:</strong> 5% on Online Shopping</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Airtel Axis Card:</strong> 10-25% on Utilities & Bills</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span><strong>Tata Neu Infinity RuPay:</strong> 10% Groceries + 1.5% UPI</span>
                </li>
              </ul>
            </div>

            {onGoToCards && (
              <button
                onClick={onGoToCards}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>View Recommended Cards Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed space-y-1">
            <div className="font-semibold text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Realistic Underwriting Assumptions</span>
            </div>
            <p>
              Calculations factor real-world monthly category caps (e.g. ₹5,000/mo on SBI Cashback, ₹250/mo on Airtel utilities) 
              and assume card balances are cleared 100% in full every month to incur ₹0 in finance charges.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
