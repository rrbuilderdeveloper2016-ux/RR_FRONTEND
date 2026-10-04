import React from 'react';
import { Breadcrumb, PageHero } from '../components/common/Footer';
import { privacySections, termsSections } from '../data/initialData';

export function LegalPage({ mode = 'privacy' }) {
  const isPrivacy = mode === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const sections = isPrivacy ? privacySections : termsSections;

  return (
    <>
      <Breadcrumb current={title} />
      <PageHero
        eyebrow="LEGAL INFORMATION"
        title={title}
        description={
          isPrivacy
            ? 'How RR Builder & Developer collects, uses, and safeguards information shared through this website.'
            : 'The terms that govern your use of this website and submission of property inquiries.'
        }
      />

      <article className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
        {sections.map(([heading, text]) => (
          <section key={heading} className="border-b border-border py-6 first:pt-0">
            <h2 className="font-display text-2xl font-bold text-primary">{heading}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
          </section>
        ))}
      </article>
    </>
  );
}
