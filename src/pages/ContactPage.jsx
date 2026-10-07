import React from 'react';
import { Phone, Mail, MapPin, Clock3 } from 'lucide-react';
import { Breadcrumb, PageHero, SectionHeading } from '../components/common/Footer';
import { ContactForm } from '../components/forms/ContactForm';

export function ContactPage() {
  return (
    <>
      <Breadcrumb current="Contact Us" />
      <PageHero
        eyebrow="CONTACT RR BUILDER &amp; DEVELOPER"
        title="Let's Talk About Your Property Goals"
        description="Whether you wish to enquire about an upcoming project, visit a ready-to-move apartment, sell your property, or plan a custom construction project on your plot, our team is at your service."
      />

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-6">
          <div>
            <SectionHeading
              eyebrow="GET IN TOUCH"
              title="We're Here to Help"
              description="Drop by our office in Indore, call our desk, or fill out the enquiry form. We respond to all inquiries within one working day."
            />

            <div className="mt-8 space-y-5 text-sm">
              <a href="tel:+916232570809" className="flex items-center gap-3 text-foreground hover:text-accent-strong transition">
                <Phone className="h-5 w-5 text-accent-strong shrink-0" />
                <span className="font-semibold">+91 6232570809</span>
              </a>

              <a href="https://wa.me/916232570809" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent-strong transition">
                <span className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <span>WhatsApp: +91 6232570809</span>
              </a>

              <a href="mailto:info@rrbuilderindore.com" className="flex items-center gap-3 text-foreground hover:text-accent-strong transition">
                <Mail className="h-5 w-5 text-accent-strong shrink-0" />
                <span>info@rrbuilderindore.com</span>
              </a>

              <a href="https://www.facebook.com/share/1BCJDsUVDg/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent-strong transition group">
                <span className="h-5 w-5 rounded bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span>
                <span className="font-semibold text-primary group-hover:text-accent-strong">Facebook: RR Builder &amp; Developer</span>
              </a>

              <a href="https://www.instagram.com/rrbuilderdeveloper?stkn=MW5rN2xlbnI0Z3dlNQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-accent-strong transition group">
                <span className="h-5 w-5 rounded bg-[#E4405F]/15 text-[#E4405F] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <span className="font-semibold text-primary group-hover:text-accent-strong">Instagram: @rrbuilderdeveloper</span>
              </a>

              <p className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-accent-strong shrink-0" />
                <span>B-203, Vasundhara complex, opp. Phoenix mall, Indore (M.P.)</span>
              </p>

              <p className="flex items-center gap-3 text-muted-foreground">
                <Clock3 className="h-5 w-5 text-accent-strong shrink-0" />
                <span>Monday – Saturday, 9:00 AM – 7:00 PM</span>
              </p>
            </div>

            <div className="mt-8 p-6 bg-primary text-hero-foreground rounded-sm">
              <strong className="block text-accent text-sm font-bold uppercase tracking-wider">
                Visit Our Project Sites
              </strong>
              <p className="mt-2 text-xs text-hero-muted leading-relaxed">
                Site visits with our project coordinator can be scheduled all 7 days of the week with prior appointment.
              </p>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
