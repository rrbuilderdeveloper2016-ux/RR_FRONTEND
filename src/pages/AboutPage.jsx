import React from 'react';
import { indoreImage, brandCoverImage } from '../data/initialData';
import { Breadcrumb, PageHero, SectionHeading } from '../components/common/Footer';

export function AboutPage() {
  const stats = [
    ['10+', 'Years Experience'],
    ['100+', 'Projects Delivered'],
    ['500+', 'Happy Clients'],
    ['10+', 'Indore Localities Served'],
  ];

  const pillars = [
    ['Our Mission', 'To create enduring value for families and businesses across Indore through dependable advice, transparent dealing, and uncompromising quality spaces.'],
    ['Our Vision', 'To be recognized as Indore’s benchmark real estate builder and construction partner, setting standards in craftsmanship, ethics, and punctual delivery.'],
    ['Our Values', 'Integrity first, absolute transparency in land titles and pricing, engineering excellence, and customer commitment that extends far beyond key handover.'],
  ];

  return (
    <>
      <Breadcrumb current="About Us" />
      <PageHero
        eyebrow="ABOUT RR BUILDER &amp; DEVELOPER"
        title="Building Dreams. Creating Value."
        description="RR Builder & Developer is a trusted real estate and construction company rooted in Indore, dedicated to shaping quality living spaces and high-growth investments."
      />

      {/* Story */}
      <section className="py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-6">
          <img
            src={indoreImage}
            alt="RR Builder team serving Indore"
            className="min-h-80 w-full rounded-sm object-cover shadow-card"
          />
          <div>
            <SectionHeading
              eyebrow="WHO WE ARE"
              title="Built on Trust, Craftsmanship, and Local Indore Expertise"
              description="From modest residential layouts to expansive commercial centers and turnkey villas, RR Builder & Developer has helped hundreds of families turn property aspirations into enduring reality."
            />

            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-6">
              {stats.map(([value, label]) => (
                <div key={label} className="border-l-2 border-accent pl-4">
                  <strong className="font-display text-3xl font-bold text-primary sm:text-4xl block">
                    {value}
                  </strong>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Heritage Banner Showcase */}
      <section className="relative bg-gradient-to-b from-[#0B132B] via-[#0F1B3B] to-[#0B132B] py-16 text-hero-foreground border-y border-accent/25 overflow-hidden">
        {/* Subtle Ambient Golden Glow Behind Banner */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-6 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Brand Heritage &amp; Vision
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-hero-foreground">
              Building Dreams, Creating Legacies
            </h2>
            <p className="text-xs sm:text-sm text-hero-muted mt-2 max-w-xl mx-auto leading-relaxed">
              Over a decade of trusted residential, commercial, and plotted development expertise rooted in Indore since 2016.
            </p>
          </div>

          {/* Cinematic Frame */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-primary-deep/90 shadow-2xl border border-accent/30 ring-1 ring-white/10 group">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[480px] w-full overflow-hidden">
              <img
                src={brandCoverImage}
                alt="RR Builder & Developer — Building Dreams, Creating Legacies — Since 2016"
                className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Soft Edge Blends - Top & Bottom Vignettes */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B132B]/80 via-[#0B132B]/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/40 to-transparent" />
              {/* Soft Edge Blends - Left & Right Vignettes */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B132B]/70 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B132B]/70 to-transparent" />
            </div>

            {/* Bottom Accent Bar */}
            <div className="border-t border-accent/20 bg-primary-deep/95 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs font-semibold tracking-wide text-hero-foreground">
                  Official Trademark Signature · RR Builder &amp; Developer
                </span>
              </div>
              <span className="text-xs text-accent font-bold tracking-wider uppercase">
                Since 2016 · Indore (M.P.)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-muted py-14 border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 lg:px-6">
          {pillars.map(([title, text]) => (
            <article key={title} className="bg-card p-8 shadow-card rounded-sm border border-border">
              <h2 className="font-display text-2xl font-bold text-primary">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
