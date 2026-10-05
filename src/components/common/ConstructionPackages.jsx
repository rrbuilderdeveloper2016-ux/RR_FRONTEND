import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { PaymentPlanModal } from './PaymentPlanModal';

export const packages = [
  {
    id: 'grey-box',
    name: 'GREY BOX',
    rate: '₹1,199',
    unit: '/sq.ft.',
    tagline: 'Strong Structural Core',
    color: 'from-slate-700 to-slate-900',
    borderColor: 'border-slate-300',
    popular: false,
    planSummary: 'G+1, G+2 & G+3 (6–8 Milestones)',
    features: [
      'Complete RCC column beam structure & roof',
      'High-grade red brick, fly ash & AAC block',
      'Underground & overhead water tank core',
      'Internal & external rough plastering',
      'Base electrical & plumbing conduits',
      'Good quality cement & high-grade TMT steel',
      'Dedicated A.C. line piping conduits',
      'Anti-termite pest control treatment',
      'Water recharging & earthing system',
    ],
  },
  {
    id: 'silver',
    name: 'SILVER',
    rate: '₹1,599',
    unit: '/sq.ft.',
    tagline: 'Standard Family Finish',
    color: 'from-slate-500 to-slate-700',
    borderColor: 'border-slate-400',
    popular: false,
    planSummary: 'G+1 & G+2 (11 Stage Milestones)',
    features: [
      'Everything in Grey Box',
      'Vitrified flooring tiles (2×2 ft)',
      'Standard sanitary ware & CP fittings',
      'Granite kitchen platform with sink & stairs',
      'Putty, primer & quality color',
      'Standard flush doors, aluminum windows & grills',
      'Free modular kitchen included',
      'Branded plumbing material & pipes',
      'Electrical standard false ceiling',
    ],
  },
  {
    id: 'gold',
    name: 'GOLD',
    rate: '₹1,699',
    unit: '/sq.ft.',
    tagline: 'Most Popular Choice',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-accent',
    popular: true,
    planSummary: 'G+1 & G+2 (11 Stage Milestones)',
    features: [
      'Everything in Silver',
      'Premium vitrified glazed tiles',
      'Branded plumbing (Jaquar & Plumber)',
      'Premium granite kitchen with sink & stairs',
      'Putty, primer & premium weather-shield color',
      'Premium doors, Domal windows & heavy grills',
      'Free modular kitchen included',
      'Modular switches & concealed copper wiring',
    ],
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    rate: '₹1,799',
    unit: '/sq.ft.',
    tagline: 'Luxury Living Package',
    color: 'from-blue-600 to-indigo-800',
    borderColor: 'border-primary',
    popular: false,
    planSummary: 'G+1 & G+2 (11 Stage Milestones)',
    features: [
      'Everything in Gold',
      'Big-size & heavy-thickness vitrified glazed tiles',
      'Italian marble finish & grand vitrified look',
      'UPVC sound-dampened sliding windows',
      'Designer false ceiling in living & dining area',
      'Solar water heater piping provision',
      'PVC / POP ceiling in parking area',
      'High-end luxury electrical switches',
      'Free luxury modular kitchen included',
    ],
  },
  {
    id: 'commercial',
    name: 'COMMERCIAL',
    rate: '₹1,899',
    unit: '/sq.ft.',
    tagline: 'High Traffic Business Spaces',
    color: 'from-cyan-700 to-blue-900',
    borderColor: 'border-primary-soft',
    popular: false,
    planSummary: 'Commercial G+3 (12 Milestones)',
    features: [
      'Heavy-load RCC structural design & roof',
      'High footfall commercial tile / stone flooring',
      'Ample fire safety provisions & stairways',
      'Glass façade / commercial elevation framing',
      'High-capacity power backup conduits',
      'Executive washrooms on every floor plate',
    ],
  },
];

export function ConstructionPackages({ onSelectPackage }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('gold');
  const [modalPackageId, setModalPackageId] = useState('gold');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPlanModal = (pkgId) => {
    setSelectedId(pkgId);
    setModalPackageId(pkgId);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header from Brochure */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">TRANSPARENT CONSTRUCTION PACKAGES</p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-primary">
            BUILD YOUR DREAM WITH RR
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-accent-strong tracking-wide uppercase">
            <span>Quality Construction</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
            <span>Transparent Pricing</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Clear specifications with zero hidden escalation. Explore official stage-by-stage payment schedules in Hindi or English, or calculate custom budget.
          </p>

          {/* Payment Plan Highlight Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent-strong text-xs font-semibold">
            <FileText className="h-3.5 w-3.5" />
            <span>Official Milestone Payment Plan Included (10% Advance · Stage-wise · 5% Handover)</span>
          </div>
        </div>

        {/* 5 Package Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {packages.map((pkg) => {
            const isSelected = selectedId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedId(pkg.id);
                  if (onSelectPackage) onSelectPackage(pkg);
                }}
                className={`relative flex flex-col rounded-sm border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                  pkg.popular
                    ? 'border-accent shadow-xl lg:-translate-y-2'
                    : isSelected
                    ? 'border-primary shadow-lg'
                    : 'border-border bg-card shadow-sm hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-accent text-accent-foreground text-center py-1 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-1">
                    <Sparkles className="h-3 w-3" /> BEST VALUE
                  </div>
                )}

                {/* Card Header */}
                <div className={`p-5 text-center text-hero-foreground bg-gradient-to-br ${pkg.color}`}>
                  <h3 className="font-display text-xl font-bold tracking-wider">{pkg.name}</h3>
                  <p className="text-[11px] opacity-80 mt-0.5">{pkg.tagline}</p>
                  <div className="mt-4 pt-3 border-t border-hero-foreground/20">
                    <span className="block text-[10px] uppercase font-bold tracking-wider opacity-85">
                      Starting From
                    </span>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="font-display text-3xl font-extrabold">{pkg.rate}</span>
                      <span className="text-xs opacity-90">{pkg.unit}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 inline-block text-[10px] font-medium bg-black/25 px-2 py-0.5 rounded-full border border-white/15">
                    {pkg.planSummary}
                  </div>
                </div>

                {/* Features list */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-card text-xs">
                  <ul className="space-y-2">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent-strong shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-border space-y-2">
                    {/* Primary Button: Explore Payment Plan */}
                    <Button
                      variant={pkg.popular ? 'gold' : 'navy'}
                      size="sm"
                      className="w-full text-xs flex items-center justify-center gap-1.5 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPlanModal(pkg.id);
                      }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Explore Payment Plan
                    </Button>

                    {/* Secondary Quick Action: Select for Estimate */}
                    <button
                      type="button"
                      className="w-full text-center py-1 text-[11px] font-semibold text-accent-strong hover:text-primary transition-colors flex items-center justify-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(pkg.id);
                        if (onSelectPackage) onSelectPackage(pkg);
                        const el = document.getElementById('estimate-form');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/build-on-my-plot#estimate-form', { state: { selectedPackage: pkg } });
                        }
                      }}
                    >
                      <span>Select for Estimate</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Tagline */}
        <p className="mt-8 text-center text-xs italic font-semibold text-muted-foreground">
          "More Than Just Construction... We Build Trust"
        </p>
      </div>

      {/* Official Payment Schedule Interactive Modal */}
      <PaymentPlanModal
        packageId={modalPackageId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPackage={onSelectPackage}
      />
    </section>
  );
}
