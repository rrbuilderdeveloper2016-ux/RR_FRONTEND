import { ShinyText } from '../ShinyText';
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
      'Complete RCC column-beam framework, foundation & high-strength roof slab',
      'High-grade red brick, fly ash & thermal-insulating AAC block masonry',
      'ISI-certified Fe-550 TMT high-strength steel & ultra-durable grade cement',
      'Monolithic underground water sump & overhead concrete water tank core',
      'Dual-layer internal smooth plastering & weather-resistant external rough finish',
      'Concealed heavy-duty electrical conduits & PVC plumbing pipeline provisions',
      'Dedicated concealed copper A.C. pipeline conduits in all rooms',
      'Anti-termite chemical soil barrier treatment pre & post construction',
      'Eco-friendly groundwater recharging & deep earthing safety system',
    ],
  },
  {
    id: 'silver',
    name: 'SILVER',
    rate: '₹1,599',
    unit: '/sq.ft.',
    tagline: 'Standard Turnkey Home',
    color: 'from-slate-500 to-slate-700',
    borderColor: 'border-slate-400',
    popular: false,
    planSummary: 'G+1 & G+2 (11 Stage Milestones)',
    features: [
      'Complete structural core included in Grey Box',
      'Vitrified flooring tiles with matching border skirting',
      'Polished granite kitchen platform with stainless steel sink & granite staircase',
      'Standard branded sanitary ware & chrome-plated (CP) bath fittings',
      'Multi-coat smooth wall putty, primer & washable premium interior paint',
      'Durable flush core doors, aluminum sliding windows & safety grills',
      'Branded concealed plumbing pipelines & leak-proof drainage network',
      'Standard false ceiling framework & modular electrical conduit system',
      'Free Designer Modular Kitchen Included',
    ],
  },
  {
    id: 'gold',
    name: 'GOLD',
    rate: '₹1,699',
    unit: '/sq.ft.',
    tagline: 'Most Popular Family Choice',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-accent',
    popular: true,
    planSummary: 'G+1 & G+2 (11 Stage Milestones)',
    features: [
      'Everything included in Silver Turnkey Package',
      'Premium vitrified glazed tiles with polished nano-finish',
      'Luxury branded plumbing & bath fittings (Jaquar & Plumber)',
      'Mirror-polished premium granite kitchen with deep sink & moulded staircase',
      '3-Coat Birla wall putty with premium weather-shield exterior paint',
      'Premium flush doors, heavy Domal series sliding windows & reinforced designer grills',
      'Fire-resistant concealed copper wiring with luxury modular switches',
      'Free Designer Modular Kitchen Included',
    ],
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    rate: '₹1,799',
    unit: '/sq.ft.',
    tagline: 'Ultra-Luxury Architectural Spec',
    color: 'from-blue-600 to-indigo-800',
    borderColor: 'border-primary',
    popular: false,
    planSummary: 'G+1 & G+2 (11 Stage Milestones)',
    features: [
      'Everything included in Gold Premium Package',
      'Italian marble finish & grand architectural vitrified look',
      'Sound-insulated UPVC multi-chamber sliding windows with toughened glass',
      'Designer architectural false ceiling with ambient LED cove lighting in living & dining',
      'Centralized solar water heater insulated piping system',
      'Moisture-resistant PVC / POP designer ceiling in stilt parking area',
      'Elite touch-grade modular smart switches & high-load distribution panel',
      'Free Designer Modular Kitchen Included',
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
      'Heavy-load engineered RCC structural frame designed for commercial dynamic loads',
      'High-traffic anti-skid commercial vitrified & heavy granite flooring',
      'Modern architectural glass façade elevation & heavy aluminium structural sections',
      'Dedicated high-capacity 3-phase power backup conduits & heavy-gauge busbars',
      'Comprehensive fire safety hydrant lines, fire exits & wide dual stairways',
      'Executive multi-user restroom & sanitary suites on every floor plate',
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
        <div className="text-center max-w-3xl mx-auto px-1 sm:px-4">
          <p className="eyebrow text-xs">TRANSPARENT CONSTRUCTION PACKAGES</p>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary break-words">
            BUILD YOUR DREAM WITH RR
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-bold text-accent-strong tracking-wide uppercase">
            <span>Quality Construction</span>
            <span className="h-1 w-1 rounded-full bg-accent-strong" />
            <span>Transparent Pricing</span>
            <span className="h-1 w-1 rounded-full bg-accent-strong" />
            <span>Zero Escalation</span>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Engineered architectural specifications with clear milestone agreements. Explore official stage-wise payment schedules in Hindi or English, or request a customized layout &amp; cost estimate for your plot.
          </p>

          {/* Payment Plan Highlight Pill */}
          <div className="mt-3.5 inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent-strong text-xs font-semibold text-center">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Official Milestone Payment Plan (10% Advance · Stage-wise · 5% Handover)</span>
          </div>

          {/* Premium Animated Promotional Offer Banner */}
          <div className="mt-7 flex justify-center px-2">
            <div className="offer-banner relative inline-flex w-full sm:w-auto max-w-3xl items-center justify-center rounded-2xl sm:rounded-full border border-accent/40 bg-gradient-to-r from-primary-deep via-primary to-primary-deep px-5 py-3 sm:px-8 sm:py-3.5 shadow-2xl backdrop-blur-md">
              <ShinyText
                text="★ Special Complimentary Offer — Free Designer Modular Kitchen Included"
                speed={2.5}
                delay={1}
                color="#e6ca65"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className="font-display font-bold text-center tracking-wide leading-relaxed"
                style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                }}
              />
            </div>
          </div>
        </div>

        {/* 5 Package Cards - Fully Mobile Responsive Grid */}
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
          {packages.map((pkg) => {
            const isSelected = selectedId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedId(pkg.id);
                  if (onSelectPackage) onSelectPackage(pkg);
                }}
                className={`relative flex flex-col rounded-md border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                  pkg.popular
                    ? 'border-accent shadow-xl xl:-translate-y-2 ring-2 ring-accent/25'
                    : isSelected
                    ? 'border-primary shadow-lg'
                    : 'border-border bg-card shadow-sm hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-accent text-accent-foreground text-center py-1 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-1 shadow-sm">
                    <Sparkles className="h-3 w-3" /> BEST VALUE &amp; POPULAR
                  </div>
                )}

                {/* Card Header */}
                <div className={`p-5 text-center text-hero-foreground bg-gradient-to-br ${pkg.color}`}>
                  <h3 className="font-display text-xl font-bold tracking-wider">{pkg.name}</h3>
                  <p className="text-[11px] opacity-85 mt-0.5 font-medium">{pkg.tagline}</p>
                  <div className="mt-4 pt-3 border-t border-hero-foreground/20">
                    <span className="block text-[10px] uppercase font-bold tracking-wider opacity-85">
                      Starting From
                    </span>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className="font-display text-3xl font-extrabold">{pkg.rate}</span>
                      <span className="text-xs opacity-90 font-medium">{pkg.unit}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 inline-block text-[10px] font-semibold bg-black/30 px-2.5 py-0.5 rounded-full border border-white/20">
                    {pkg.planSummary}
                  </div>
                </div>

                {/* Features list */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-card text-xs">
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, i) => {
                      const isFree = feat.toLowerCase().startsWith('free');
                      if (isFree) {
                        return (
                          <li
                            key={i}
                            className="mt-3.5 pt-3 border-t border-accent/40 flex items-start gap-2.5"
                          >
                            <div className="relative mt-0.5 shrink-0 royal-badge-glow">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 text-white shadow-sm ring-1 ring-amber-400/40">
                                <Sparkles className="h-3 w-3 animate-spin-slow text-amber-950" />
                              </span>
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-700/90 flex items-center gap-1">
                                ★ Special Complimentary Offer
                              </span>
                              <ShinyText
                                text="Free Designer Modular Kitchen Included"
                                speed={2.5}
                                delay={1}
                                color="#854d0e"
                                shineColor="#fbbf24"
                                spread={100}
                                direction="left"
                                className="font-display font-bold text-xs sm:text-[13px] leading-tight block"
                                style={{
                                  fontSize: 'clamp(0.78rem, 1.6vw, 0.88rem)',
                                }}
                              />
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-xs">
                          <Check className="h-3.5 w-3.5 text-accent-strong shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-border space-y-2">
                    {/* Primary Button: Explore Payment Plan */}
                    <Button
                      variant={pkg.popular ? 'gold' : 'navy'}
                      size="sm"
                      className="w-full text-xs min-h-[40px] flex items-center justify-center gap-1.5 shadow-sm font-bold"
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
                      className="w-full text-center py-2 text-[11px] font-bold text-accent-strong hover:text-primary transition-colors flex items-center justify-center gap-1 min-h-[34px]"
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
