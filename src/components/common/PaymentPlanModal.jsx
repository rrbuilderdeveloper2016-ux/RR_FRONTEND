import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  FileText,
  Calculator,
  Languages,
  CheckCircle2,
  ShieldCheck,
  Printer,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { paymentPlansData, paymentPlanTerms } from '../../data/paymentPlans';
import { Button } from '../ui/Button';

export function PaymentPlanModal({ packageId, isOpen, onClose, onSelectPackage }) {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [activePkgId, setActivePkgId] = useState(packageId || 'gold');
  const [builtUpArea, setBuiltUpArea] = useState(1500);

  // Sync activePkgId when modal opens with a new package
  React.useEffect(() => {
    if (packageId) {
      setActivePkgId(packageId);
    }
  }, [packageId]);

  const pkgData = paymentPlansData[activePkgId] || paymentPlansData['gold'];
  const [selectedFloor, setSelectedFloor] = useState(pkgData.defaultFloor);

  // When switching packages, reset selected floor if current floor isn't supported
  React.useEffect(() => {
    if (!pkgData.supportedFloors.includes(selectedFloor)) {
      setSelectedFloor(pkgData.defaultFloor);
    }
  }, [activePkgId, pkgData]);

  if (!isOpen) return null;

  const currentPlan = pkgData.plans[selectedFloor] || pkgData.plans[pkgData.defaultFloor] || [];
  const rate = pkgData.ratePerSqFt;
  const totalCost = (Number(builtUpArea) || 0) * rate;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleProceed = () => {
    const pkgPayload = {
      id: activePkgId,
      name: pkgData.packageName,
      rate: `₹${rate.toLocaleString('en-IN')}`,
      floor: selectedFloor,
      area: builtUpArea,
      estimatedCost: totalCost,
    };
    if (onSelectPackage) {
      onSelectPackage(pkgPayload);
    }
    onClose();
    setTimeout(() => {
      const el = document.getElementById('estimate-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/build-on-my-plot#estimate-form', { state: { selectedPackage: pkgPayload } });
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-card rounded-md shadow-2xl border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/60">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-sm bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="eyebrow text-[10px]">OFFICIAL MILESTONE SCHEDULE</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-accent/20 text-accent-strong border border-accent/30">
                  {lang === 'hi' ? 'भुगतान शर्तें' : 'PAYMENT TERMS'}
                </span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-primary">
                {lang === 'hi' ? 'निर्माण भुगतान योजना व माइलस्टोन्स' : 'Construction Payment Schedule'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border text-xs font-semibold bg-background hover:bg-muted transition-colors text-foreground"
              title="Toggle Language"
            >
              <Languages className="h-3.5 w-3.5 text-accent-strong" />
              <span>{lang === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
            </button>

            {/* Print button */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border text-xs font-semibold bg-background hover:bg-muted transition-colors text-muted-foreground"
              title="Print Schedule"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>{lang === 'hi' ? 'प्रिंट' : 'Print'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Package Selector Tabs */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
              {lang === 'hi' ? 'पैकेज चुनें' : 'SELECT PACKAGE'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.keys(paymentPlansData).map((pkgKey) => {
                const item = paymentPlansData[pkgKey];
                const isActive = activePkgId === pkgKey;
                return (
                  <button
                    key={pkgKey}
                    type="button"
                    onClick={() => setActivePkgId(pkgKey)}
                    className={`p-2.5 rounded-sm border text-left transition-all ${
                      isActive
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-background hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary font-display">{item.packageName}</span>
                      {pkgKey === 'gold' && <Sparkles className="h-3 w-3 text-accent-strong" />}
                    </div>
                    <span className="block text-[11px] font-extrabold text-foreground mt-0.5">
                      ₹{item.ratePerSqFt}
                      <span className="text-[10px] text-muted-foreground font-normal">/sq.ft</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Package Summary Banner */}
          <div className="rounded-sm border border-border bg-muted/40 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold text-primary">{pkgData.packageName} PACKAGE</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary text-primary-foreground">
                  ₹{rate}/sq.ft.
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {lang === 'hi' ? pkgData.descriptionHi : pkgData.description}
              </p>
            </div>

            {/* Floor Structure Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground shrink-0">
                {lang === 'hi' ? 'मंजिल संरचना:' : 'Structure:'}
              </span>
              <div className="flex items-center gap-1.5 bg-background p-1 rounded-sm border border-border">
                {pkgData.supportedFloors.map((floor) => (
                  <button
                    key={floor}
                    type="button"
                    onClick={() => setSelectedFloor(floor)}
                    className={`px-3 py-1 text-xs font-bold rounded-xs transition-all ${
                      selectedFloor === floor
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Area & Cost Calculator Box */}
          <div className="rounded-sm border border-accent/40 bg-gradient-to-r from-accent/5 via-background to-accent/10 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded bg-accent/20 text-accent-strong shrink-0 mt-0.5">
                  <Calculator className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-primary">
                    {lang === 'hi' ? 'लाइव कंस्ट्रक्शन बजट कैलकुलेटर' : 'Live Milestone Budget Calculator'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {lang === 'hi'
                      ? 'अपना प्लॉट साइज डालें और हर माइलस्टोन का सटीक भुगतान देखें।'
                      : 'Enter your built-up area to see exact milestone installment amounts.'}
                  </p>
                </div>
              </div>

              {/* Area Input & Preset Chips */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="number"
                    min="200"
                    max="50000"
                    step="50"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(Math.max(0, Number(e.target.value)))}
                    className="w-28 sm:w-32 h-9 px-3 text-sm font-bold text-foreground bg-background rounded-sm border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                    placeholder="1500"
                  />
                  <span className="absolute right-2.5 top-2 text-[10px] font-bold text-muted-foreground">SQ.FT</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    {lang === 'hi' ? 'अनुमानित कुल लागत' : 'Est. Total Cost'}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-accent-strong font-display">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick chips */}
            <div className="mt-3 pt-3 border-t border-accent/20 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-muted-foreground mr-1">
                {lang === 'hi' ? 'क्विक सेलेक्ट:' : 'Quick Select:'}
              </span>
              {[1000, 1200, 1500, 2000, 2500].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setBuiltUpArea(size)}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded border transition-colors ${
                    builtUpArea === size
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                  }`}
                >
                  {size} sq.ft
                </button>
              ))}
            </div>
          </div>

          {/* Milestones Breakdown Schedule */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-strong" />
                <span>
                  {pkgData.packageName} ({selectedFloor}) — {currentPlan.length}{' '}
                  {lang === 'hi' ? 'चरणबद्ध माइलस्टोन्स' : 'Payment Milestones'}
                </span>
              </h4>
              <span className="text-xs font-bold text-accent-strong">100% Total</span>
            </div>

            <div className="border border-border rounded-sm overflow-x-auto">
              <table className="w-full min-w-[500px] text-left text-xs">
                <thead className="bg-muted text-muted-foreground border-b border-border text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 w-12 text-center">#</th>
                    <th className="py-2.5 px-3">
                      {lang === 'hi' ? 'निर्माण चरण / माइलस्टोन' : 'Milestone / Construction Stage'}
                    </th>
                    <th className="py-2.5 px-3 w-24 text-center">
                      {lang === 'hi' ? 'प्रतिशत' : 'Share (%)'}
                    </th>
                    <th className="py-2.5 px-3 w-32 text-right">
                      {lang === 'hi' ? 'किस्त राशि (₹)' : 'Installment (₹)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {currentPlan.map((stage, idx) => {
                    const installmentAmount = (totalCost * stage.percent) / 100;
                    return (
                      <tr key={idx} className="hover:bg-muted/40 transition-colors">
                        <td className="py-3 px-3 text-center font-display font-bold text-muted-foreground">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-foreground">
                            {lang === 'hi' ? stage.milestoneHi : stage.milestone}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {lang === 'hi' ? stage.milestone : stage.milestoneHi}
                          </p>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-accent/15 text-accent-strong border border-accent/25">
                            {stage.percent}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-display font-bold text-primary">
                          {formatCurrency(installmentAmount)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-muted/80 font-bold border-t border-border">
                  <tr>
                    <td colSpan={2} className="py-2.5 px-3 text-right uppercase text-[11px] tracking-wider text-foreground">
                      {lang === 'hi' ? 'कुल योग (100% कार्य)' : 'Total Construction Budget (100%)'}:
                    </td>
                    <td className="py-2.5 px-3 text-center text-accent-strong text-xs">
                      100%
                    </td>
                    <td className="py-2.5 px-3 text-right text-sm text-primary font-display">
                      {formatCurrency(totalCost)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Official Terms & Notes Box */}
          <div className="rounded-sm border border-border bg-muted/60 p-4 text-xs text-muted-foreground flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-accent-strong shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-foreground block">
                {lang === 'hi' ? 'नियम व शर्तें (Terms & Notes):' : 'Official Terms & Notes:'}
              </strong>
              <p className="leading-relaxed">
                {lang === 'hi' ? paymentPlanTerms.hi : paymentPlanTerms.en}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-border bg-muted/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <PhoneCall className="h-4 w-4 text-accent-strong" />
            <span>
              Direct Consultation:{' '}
              <a href="tel:+916232570809" className="font-bold text-foreground hover:text-accent-strong">
                +91 6232570809
              </a>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClose} className="flex-1 sm:flex-none text-xs">
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </Button>
            <Button variant="gold" size="sm" onClick={handleProceed} className="flex-1 sm:flex-none text-xs gap-1.5">
              <span>{lang === 'hi' ? 'इस पैकेज का कोटेशन पाएं' : 'Get Quote with this Plan'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
