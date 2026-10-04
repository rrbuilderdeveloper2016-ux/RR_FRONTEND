import React from 'react';
import {
  Video,
  Shield,
  Droplets,
  Bug,
  Zap,
  Umbrella,
  HardHat,
  UserCheck,
  ShowerHead,
  ClipboardCheck,
} from 'lucide-react';

export const specialities = [
  {
    title: 'CCTV Surveillance & Setup',
    subtitle: 'Live monitoring / client access',
    Icon: Video,
  },
  {
    title: 'Waterproofing',
    subtitle: 'Quality waterproofing',
    Icon: Umbrella,
  },
  {
    title: '24×7 Security Guard',
    subtitle: 'Site security',
    Icon: Shield,
  },
  {
    title: 'Engineer for Quality Inspection',
    subtitle: 'Quality inspection at every stage',
    Icon: HardHat,
  },
  {
    title: 'Water Harvesting System',
    subtitle: 'Rainwater management',
    Icon: Droplets,
  },
  {
    title: 'Daily Supervisor Visit',
    subtitle: 'Regular on-site supervision',
    Icon: UserCheck,
  },
  {
    title: 'Anti-Termite Treatment',
    subtitle: 'Pre & post construction',
    Icon: Bug,
  },
  {
    title: 'Daily 3x Water Spraying',
    subtitle: 'Proper curing for stronger construction',
    Icon: ShowerHead,
  },
  {
    title: 'Earthing Work',
    subtitle: 'Complete earthing',
    Icon: Zap,
  },
  {
    title: 'Daily Work Update',
    subtitle: 'Regular progress updates',
    Icon: ClipboardCheck,
  },
];

export function OurSpeciality({ className = '' }) {
  return (
    <section className={`py-16 bg-muted/60 border-y border-border ${className}`}>
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Medallion Ribbon Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block relative">
            <div className="bg-primary text-hero-foreground px-8 py-2.5 rounded-sm shadow-lg font-display text-xl sm:text-2xl font-bold tracking-wider uppercase border border-accent/40">
              OUR SPECIALITY
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </div>
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            10 signature quality standards implemented across every RR Builder &amp; Developer construction project in Indore.
          </p>
        </div>

        {/* 10 Items in 2 Columns matching the client's brochure layout */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {specialities.map((item, index) => {
            const { title, subtitle, Icon } = item;
            return (
              <div
                key={title}
                className="group flex items-center gap-4 rounded-sm border border-border bg-card p-4 sm:p-5 shadow-xs transition hover:border-accent hover:shadow-md"
              >
                {/* Gold Medallion Icon Badge */}
                <div className="relative shrink-0">
                  <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-hero-foreground shadow-md ring-4 ring-accent-soft/80 group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-xs" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-primary group-hover:text-accent-strong transition">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                    {subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust banner */}
        <div className="mt-12 rounded-sm bg-gradient-to-r from-primary-deep via-primary to-primary-deep p-6 text-center text-hero-foreground shadow-xl border border-accent/30">
          <p className="font-display text-lg sm:text-xl font-bold tracking-wide text-hero-foreground">
            More Than Just Construction... <span className="text-accent">We Build Trust</span>
          </p>
          <p className="text-xs text-hero-muted mt-1">
            Registered office: B-203, Vasundhara complex, opp. Phoenix mall, Indore (M.P.) · Call: +91 6232570809
          </p>
        </div>
      </div>
    </section>
  );
}
