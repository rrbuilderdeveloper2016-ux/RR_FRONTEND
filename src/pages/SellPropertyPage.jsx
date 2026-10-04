import React from 'react';
import { CheckCircle2, Phone } from 'lucide-react';
import { Breadcrumb, PageHero, SectionHeading } from '../components/common/Footer';
import { BuySellIntakeForm } from '../components/forms/BuySellIntakeForm';

const reasons = [
  'Verified network of genuine property buyers in Indore',
  'Realistic market valuation and comparative pricing reports',
  'Professional photography and digital property marketing',
  'Full legal and paperwork assistance until final registry',
  'Zero upfront listing fees and transparent dealing',
];

const steps = [
  'Submit Property Details & Asking Price',
  'Site Inspection & Valuation Check',
  'Matching with Qualified Buyers',
  'Documentation & Final Sale Registry',
];

export function SellPropertyPage() {
  return (
    <>
      <Breadcrumb current="Sell Property" />
      <PageHero
        eyebrow="SELL PROPERTY IN INDORE"
        title="Sell Your Property with Confidence"
        description="Get the right market value for your Plot, Land, Flat, House / Bungalow, or Commercial space with our trusted buyer network."
      />

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.85fr_1.15fr] lg:px-6">
          <div>
            <SectionHeading
              eyebrow="SELL DESK · RR BUILDERS"
              title="Maximize Your Property Realization"
              description="Fill out the property format with your expected demand. Our Indore property specialists verify listings and connect directly with funded buyers."
            />

            <div className="mt-7 space-y-3.5">
              {reasons.map((item) => (
                <p key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent-strong shrink-0 mt-0.5" />
                  <span>{item}</span>
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-sm border border-border bg-muted p-5 space-y-2">
              <strong className="text-primary block text-sm font-bold">Direct Acquisitions Hotline</strong>
              <p className="text-xs text-muted-foreground">
                Visit our office: <span className="font-semibold text-primary">B-203, Vasundhara complex, opp. Phoenix mall, Indore</span>
              </p>
              <a href="tel:+916232570809" className="inline-flex items-center gap-2 text-xs font-bold text-accent-strong hover:underline pt-1">
                <Phone className="h-4 w-4" /> Call: +91 6232570809
              </a>
            </div>
          </div>

          <div>
            {/* Exact format requested by client */}
            <BuySellIntakeForm defaultMode="sell" />
          </div>
        </div>
      </section>

      {/* 4 Steps */}
      <section className="bg-muted py-14 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="SIMPLE &amp; TRANSPARENT"
            title="How the Selling Process Works"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item} className="border border-border bg-card p-6 shadow-card rounded-sm">
                <span className="text-2xl font-bold text-accent-strong font-display">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-primary">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
