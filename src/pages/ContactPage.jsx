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
