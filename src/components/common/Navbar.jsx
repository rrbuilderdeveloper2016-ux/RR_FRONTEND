import rrLogo from '@/assets/rr-logo.png';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Our Projects', to: '/our-projects' },
  { label: 'Build on My Plot', to: '/build-on-my-plot' },
  { label: 'Buy Property', to: '/buy-property' },
  { label: 'Sell Property', to: '/sell-property' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
];

export function Brand({ inverse = false }) {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="RR Builder & Developer home">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-accent/40 bg-[#091522] p-0.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
        <img
          src={rrLogo}
          alt="RR Builder & Developer Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <span className="min-w-0 leading-tight">
        <strong className={`block truncate text-sm font-bold tracking-wide ${inverse ? 'text-hero-foreground' : 'text-primary'}`}>
          RR BUILDER &amp; DEVELOPER
        </strong>
        <span className={`block text-[10px] font-bold tracking-[0.18em] ${inverse ? 'text-accent' : 'text-muted-foreground'}`}>
          INDORE • SINCE 2016
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        <Brand />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {navItems.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Phone & WhatsApp CTA */}
        <div className="hidden items-center gap-4 xl:flex">
          <a
            href="tel:+916232570809"
            className="flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-accent-strong"
          >
            <Phone className="h-4 w-4 text-accent-strong" />
            +91 6232570809
          </a>
          <a
            href="https://wa.me/916232570809?text=Hello%20RR%20Builders%20Indore!%20I%20visited%20your%20website%20and%20want%20to%20inquire%20about%20Construction%20Packages%20%2F%20Property%20in%20Indore.%20Please%20guide%20me."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            WhatsApp
          </a>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-sm border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-hero-foreground"
            title="Enquiry CRM Desk"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Admin
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="xl:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-border bg-background px-4 py-6 shadow-xl xl:hidden animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-border/60 py-3 text-sm font-semibold transition ${
                    isActive ? 'text-accent-strong font-bold' : 'text-primary'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-3 pt-2">
              <a
                href="tel:+916232570809"
                className="flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <Phone className="h-4 w-4 text-accent-strong" />
                +91 6232570809
              </a>
              <a
                href="https://wa.me/916232570809?text=Hello%20RR%20Builders%20Indore!%20I%20visited%20your%20website%20and%20want%20to%20inquire%20about%20Construction%20Packages%20%2F%20Property%20in%20Indore.%20Please%20guide%20me."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-muted py-2 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-success" />
                Chat on WhatsApp
              </a>
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary py-2 text-sm font-semibold text-hero-foreground"
              >
                Admin Enquiries CRM
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
