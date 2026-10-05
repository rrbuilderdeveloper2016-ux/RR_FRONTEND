import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Breadcrumb, PageHero, SectionHeading } from '../components/common/Footer';
import { LeadForm } from '../components/forms/LeadForm';
import { ConstructionPackages } from '../components/common/ConstructionPackages';
import { OurSpeciality } from '../components/common/OurSpeciality';

const reasons = [
  'Turnkey architectural design, 3D elevation, and structural engineering',
  'Rigorous material testing (cement, steel, electrical, sanitary)',
  'Fixed-price milestone contracts with no hidden escalation',
  'Dedicated on-site project engineer and weekly video progress updates',
  'Daily 3x water spraying for proper structural curing',
  'Live CCTV surveillance access for homeowners',
  'Anti-termite treatment pre & post construction',
  '10-year structural warranty on completed construction',
];

const steps = [
  'Site Survey & Soil Test',
  'Architectural & 3D Planning',
  'Package Selection & Agreement',
  'Civil Construction & Daily Updates',
  'Interiors & Quality Audit',
  'Key Handover & Warranty',
];

export function BuildOnMyPlotPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <>
      <Breadcrumb current="Build on My Plot" />
      <PageHero
        eyebrow="CUSTOM CONSTRUCTION SERVICES · INDORE"
        title="Build Your Dream With RR"
        description="Quality Construction | Transparent Pricing. Turn your plot into a luxury home or high-return commercial space with clear per-sq.ft. packages starting from ₹1,199/sq.ft."
      />

      {/* 5 Construction Packages */}
      <ConstructionPackages
        onSelectPackage={(pkg) => {
          setSelectedPackage(pkg);
        }}
      />

      {/* 10 Signature Specialities */}
      <OurSpeciality />

      {/* Estimate Calculator & Inquiry Section */}
      <section id="estimate-form" className="py-16 bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.85fr_1.15fr] lg:px-6">
          <div>
            <SectionHeading
              eyebrow="GET CONSTRUCTION ESTIMATE"
              title="Tailored to Your Plot &amp; Budget"
              description="Tell us about your plot location in Indore, plot dimensions, and your preferred construction tier. Our civil engineer will provide a comprehensive estimate and layout consultation."
            />

            <div className="mt-7 space-y-3.5">
              {reasons.map((item) => (
                <p key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent-strong shrink-0 mt-0.5" />
                  <span>{item}</span>
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-sm border border-border bg-muted p-5">
              <strong className="text-primary block text-sm font-bold">
                Visit Our Office Opposite Phoenix Mall
              </strong>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                B-203, Vasundhara complex, opp. Phoenix mall, Indore (M.P.). Call us on <a href="tel:+916232570809" className="text-accent-strong font-bold">+91 6232570809</a>.
              </p>
            </div>
          </div>

          <div>
            <LeadForm selling={false} selectedPackage={selectedPackage} />
          </div>
        </div>
      </section>

      {/* 6 Steps */}
      <section className="bg-muted py-14 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="TRANSPARENT ROADMAP"
            title="Our 6-Step Construction Process"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
