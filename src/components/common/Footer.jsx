import { FloatingWhatsApp } from './FloatingWhatsApp';
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Brand, navItems, Navbar } from './Navbar';
import { Button } from '../ui/Button';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-deep text-hero-muted">
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr_1.15fr_1fr] lg:px-6">
        {/* Brand */}
        <div>
          <Brand inverse />
          <p className="mt-4 text-xs leading-relaxed text-hero-muted/90">
            Building Dreams, Creating Legacies — Since 2016
          </p>
          <p className="mt-2 text-xs leading-5 text-hero-muted/80">
            Over a decade of trusted residential, commercial, and plotted development expertise in Indore.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            {navItems.slice(0, 6).map(({ label, to }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
            <li>
              <Link to="/admin" className="text-accent hover:underline flex items-center gap-1 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Admin CRM Desk
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-title">Our Services</h3>
          <ul className="footer-list">
            <li>
              <Link to="/build-on-my-plot">Construction on Your Plot</Link>
            </li>
            <li>
              <Link to="/buy-property">Residential Properties</Link>
            </li>
            <li>
              <Link to="/buy-property">Commercial Properties</Link>
            </li>
            <li>
              <Link to="/buy-property">Plots &amp; Land</Link>
            </li>
            <li>
              <Link to="/contact">Property Investment</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-list">
            <li>
              <a className="flex items-center gap-2" href="tel:+916232570809">
                <Phone className="h-4 w-4 text-accent" />
                +91 6232570809
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2" href="mailto:info@rrbuilderindore.com">
                <Mail className="h-4 w-4 text-accent" />
                info@rrbuilderindore.com
              </a>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                B-203, Vasundhara complex, opp. Phoenix mall, Indore (M.P.)
              </Link>
            </li>
          </ul>
          <div className="mt-5 flex gap-3 text-hero-foreground">
            <a href="https://www.facebook.com/share/1BCJDsUVDg/" target="_blank" rel="noopener noreferrer" aria-label="RR Builder & Developer on Facebook" className="hover:text-accent transition" title="Follow RR Builder on Facebook">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/rrbuilderdeveloper?stkn=MW5rN2xlbnI0Z3dlNQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="RR Builder & Developer on Instagram" className="hover:text-accent transition" title="Follow RR Builder on Instagram">
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-display text-2xl font-bold text-hero-foreground">
            Let's Build<br />Your Future Together
          </h3>
          <Link to="/contact" className="mt-5 inline-block">
            <Button variant="gold">
              Get in Touch <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-hero-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[11px] sm:flex-row sm:justify-between lg:px-6">
          <span>© 2026 RR Builder &amp; Developer. All Rights Reserved.</span>
          <span>
            <Link to="/privacy-policy" className="hover:text-accent transition">Privacy Policy</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/terms-and-conditions" className="hover:text-accent transition">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-primary py-10 sm:py-16 text-hero-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <p className="eyebrow text-xs">{eyebrow}</p>
        <h1 className="mt-2.5 max-w-3xl font-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-hero-muted sm:leading-7">
          {description}
        </p>
      </div>
    </section>
  );
}

export function Breadcrumb({ current }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground lg:px-6">
      <Link to="/" className="hover:text-primary transition">Home</Link>
      <span className="px-2">/</span>
      <span className="text-primary font-semibold">{current}</span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export function SuccessMessage({ children }) {
  return (
    <div className="rounded-sm border border-success/40 bg-success/10 p-5 text-sm text-primary">
      <div className="flex items-center gap-2 mb-2 font-bold text-success">
        <span className="h-2 w-2 rounded-full bg-success animate-ping" />
        Submission Received
      </div>
      {children}
    </div>
  );
}

export function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 min-w-0 overflow-x-clip">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
