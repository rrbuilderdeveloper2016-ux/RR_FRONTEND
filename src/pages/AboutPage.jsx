import React from 'react';
import { indoreImage } from '../data/initialData';
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
