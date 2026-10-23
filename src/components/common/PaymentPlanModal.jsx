import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  FileText,
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

  const handlePrint = () => {
    window.print();
  };

  const handleProceed = () => {
    const pkgPayload = {
      id: activePkgId,
      name: pkgData.packageName,
      rate: `₹${rate.toLocaleString('en-IN')}/sq.ft.`,
      floor: selectedFloor,
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
        <div className="flex items-start justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-border bg-muted/60">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="p-2 rounded-sm bg-primary/10 text-primary shrink-0 mt-0.5">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5">
                <span className="eyebrow text-[10px] text-accent-strong font-bold">OFFICIAL MILESTONES</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-accent/20 text-accent-strong border border-accent/30">
                  {lang === 'hi' ? 'पारदर्शी भुगतान' : 'TRANSPARENT TERMS'}
                </span>
              </div>
              <h2 className="font-display text-base sm:text-xl font-bold text-primary leading-tight">
                {lang === 'hi' ? 'निर्माण भुगतान योजना व माइलस्टोन्स' : 'Construction Payment Schedule'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm border border-border text-xs font-semibold bg-background hover:bg-muted transition-colors text-foreground"
              title="Toggle Language"
            >
              <Languages className="h-3.5 w-3.5 text-accent-strong shrink-0" />
              <span>{lang === 'en' ? 'हिंदी में देखें' : 'In English'}</span>
            </button>

            {/* Print button */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border text-xs font-semibold bg-background hover:bg-muted transition-colors text-foreground"
              title="Print Schedule"
            >
              <Printer className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Print</span>
            </button>

            {/* Close modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Package Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-border">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">
              {lang === 'hi' ? 'पैकेज चुनें:' : 'Select Package:'}
            </span>
            {Object.keys(paymentPlansData).map((pkgKey) => {
              const p = paymentPlansData[pkgKey];
              const isActive = activePkgId === pkgKey;
              return (
                <button
                  key={pkgKey}
                  type="button"
                  onClick={() => setActivePkgId(pkgKey)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm ring-1 ring-primary/30'
                      : 'bg-background text-foreground border-border hover:border-primary/40'
                  }`}
                >
                  <span>{p.packageName}</span>
                  <span className="ml-1.5 opacity-75 font-normal">₹{p.ratePerSqFt}/sq.ft.</span>
                </button>
              );
            })}
          </div>

          {/* Active Package Banner & Floor Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-sm bg-muted border border-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold text-primary">{pkgData.packageName} PACKAGE</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary text-primary-foreground">
                  Starting from ₹{rate.toLocaleString('en-IN')}/sq.ft.
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

          {/* Transparent Milestone Framework Box */}
          <div className="rounded-sm border border-accent/40 bg-gradient-to-r from-accent/10 via-background to-accent/5 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="p-2.5 rounded bg-accent/20 text-accent-strong shrink-0 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent-strong">
                      {lang === 'hi' ? '100% पारदर्शी भुगतान' : '100% Transparent Milestones'}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {lang === 'hi' ? 'स्टेज-वाइज भुगतान संरचना' : 'Stage-Wise Work Breakdown'}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-primary mt-1">
                    {lang === 'hi'
                      ? 'काम पूरा होने पर ही हर चरण की किस्त का भुगतान'
                      : 'Pay Strictly as Each Construction Milestone is Completed'}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {lang === 'hi'
                      ? 'बिना किसी एडवांस जोखिम के — साइट पर सिविल इंजीनियर द्वारा कार्य वेरीफाई होने के बाद ही हर स्टेज का भुगतान लिया जाता है।'
                      : 'Zero advance risk — payments are strictly linked to on-site civil milestones verified by our civil engineers.'}
                  </p>
                </div>
              </div>

              <div className="sm:text-right shrink-0 bg-card p-3 rounded-sm border border-border">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  {lang === 'hi' ? 'शुरुआती दर' : 'Starting Rate'}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-accent-strong font-display">
                  ₹{rate.toLocaleString('en-IN')}<span className="text-xs text-muted-foreground font-normal"> /sq.ft.</span>
                </span>
              </div>
            </div>

            {/* Direct Across-the-Table Notice Banner */}
            <div className="mt-3.5 pt-3 border-t border-accent/20 flex items-start gap-2.5 text-xs text-muted-foreground bg-accent/5 p-3 rounded-sm">
              <Sparkles className="h-4 w-4 text-accent-strong shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-foreground">
                  {lang === 'hi' ? 'ऑफिस टेबल डिस्कशन व सटीक कोटेशन:' : 'Table Discussion & Final Quotation:'}
                </strong>{' '}
                {lang === 'hi'
                  ? 'आपके प्लॉट की लोकेशन, मिट्टी की जांच (Soil Test), 3D एलिवेशन और मटेरियल स्पेसिफिकेशन के आधार पर अंतिम बजट व डिस्काउंट ऑफिस में टेबल डिस्कशन के बाद ही तय किया जाता है।'
                  : 'Exact valuation, architectural layout, 3D elevation, and milestone agreements are customized in-person across the table at our Indore office based on your plot survey.'}
              </p>
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
              <span className="text-xs font-bold text-accent-strong">100% Total Schedule</span>
            </div>

            <div className="border border-border rounded-sm overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-xs">
                <thead className="bg-muted text-muted-foreground border-b border-border text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 w-12 text-center">#</th>
                    <th className="py-2.5 px-4">
                      {lang === 'hi' ? 'निर्माण चरण / माइलस्टोन विवरण' : 'Milestone / Civil Construction Stage'}
                    </th>
                    <th className="py-2.5 px-4 w-36 text-center">
                      {lang === 'hi' ? 'भुगतान हिस्सा (%)' : 'Payment Share (%)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {currentPlan.map((stage, idx) => {
                    return (
                      <tr key={idx} className="hover:bg-muted/40 transition-colors">
                        <td className="py-3 px-3 text-center font-display font-bold text-muted-foreground">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-foreground text-xs sm:text-sm">
                            {lang === 'hi' ? stage.milestoneHi : stage.milestone}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {lang === 'hi' ? stage.milestone : stage.milestoneHi}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded bg-accent/15 text-accent-strong border border-accent/25">
                            {stage.percent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-muted/80 font-bold border-t border-border">
                  <tr>
                    <td colSpan={2} className="py-3 px-4 uppercase text-xs tracking-wider text-foreground">
                      {lang === 'hi' ? 'कुल कार्य समापन (100% माइलस्टोन कम्प्लीशन)' : 'Total Construction Milestones (100% Completion)'}:
                    </td>
                    <td className="py-3 px-4 text-center text-accent-strong text-sm">
                      100%
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-border bg-muted/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground w-full sm:w-auto justify-center sm:justify-start">
            <PhoneCall className="h-4 w-4 text-accent-strong shrink-0" />
            <span>
              Direct Consultation:{' '}
              <a href="tel:+916232570809" className="font-bold text-foreground hover:text-accent-strong">
                +91 6232570809
              </a>
            </span>
          </div>

          <div className="flex items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="px-4 h-auto min-h-[42px] py-2 text-xs font-semibold shrink-0"
            >
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={handleProceed}
              className="flex-1 sm:flex-none h-auto min-h-[42px] py-2 px-3.5 text-xs font-bold leading-snug text-center justify-center gap-1.5 whitespace-normal"
            >
              <span>{lang === 'hi' ? 'ऑफिस मीटिंग व कोटेशन बुक करें' : 'Book Office Consultation / Quote'}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
