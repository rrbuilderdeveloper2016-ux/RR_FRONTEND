import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

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
    features: [
      'Complete RCC column beam structure',
      'High-grade red brick / AAC block masonry',
      'Internal & external rough plastering',
      'Underground & overhead water tank core',
      'Base electrical & plumbing conduits',
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
    features: [
      'Everything in Grey Box',
      'Vitrified flooring (2×2 ft)',
      'Standard sanitary ware & CP fittings',
      'Granite kitchen platform with sink',
      'Internal primer + 2 coats tractor emulsion',
      'Standard flush doors & aluminum windows',
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
    features: [
      'Everything in Silver',
      'Premium 4×2 ft vitrified glazed tiles',
      'Branded plumbing (Jaquar / Cera or equiv.)',
      'Teak wood main door frame & designer shutter',
      'Modular switches & concealed copper wiring',
      'Weather-shield acrylic external paint',
      'Anti-termite treatment with warranty',
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
    features: [
      'Everything in Gold',
      'Italian marble finish / grand vitrified tiles',
      'Wall-hung WC & thermostatic bath mixers',
      'UPVC sound-dampened sliding windows',
      'False ceiling in living & dining areas',
      'Solar water heater piping & rainwater harvesting',
      'Dedicated supervisor & daily photo updates',
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
    features: [
      'Heavy-load RCC structural design',
      'High footfall commercial tile / stone flooring',
      'Ample fire safety provisions & stairways',
      'Glass façade / commercial elevation framing',
      'High-capacity power backup conduits',
      'Executive washrooms on every floor plate',
    ],
  },
];

export function ConstructionPackages({ onSelectPackage }) {
  const [selectedId, setSelectedId] = useState('gold');

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header from Brochure Image 2 */}
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
            Clear specifications with zero hidden escalation. Choose your tier or calculate custom square footage.
          </p>
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
                </div>

                {/* Features list */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-card text-xs">
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent-strong shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-border">
                    <Button
                      variant={pkg.popular ? 'gold' : 'navy'}
                      size="sm"
                      className="w-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(pkg.id);
                        if (onSelectPackage) onSelectPackage(pkg);
                        const el = document.getElementById('estimate-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Select {pkg.name}
                    </Button>
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
    </section>
  );
}
