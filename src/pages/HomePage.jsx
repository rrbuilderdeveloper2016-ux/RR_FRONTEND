import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock3,
  CheckCircle2,
  Handshake,
  Users,
  MapPin,
  Home,
  HardHat,
  KeyRound,
  Phone,
} from 'lucide-react';
import {
  heroImage,
  indoreImage,
  brandCoverImage,
  testimonials,
  initialProjects,
} from '../data/initialData';
import { projectService } from '../services/projectService';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { ConsultationForm } from '../components/forms/ConsultationForm';
import { BuySellIntakeForm } from '../components/forms/BuySellIntakeForm';
import { ConstructionPackages } from '../components/common/ConstructionPackages';
import { OurSpeciality } from '../components/common/OurSpeciality';

const highlights = [
  [ShieldCheck, 'Since 2016 in Indore'],
  [Building2, '100+ Delivered Projects'],
  [Clock3, 'On-Time Project Delivery'],
  [CheckCircle2, 'Transparent Pricing'],
];

const services = [
  {
    title: 'Build on My Plot',
    description:
      'Have a plot? Turn your plot into a luxury home with packages starting from ₹1,199/sq.ft. with complete CCTV live monitoring and daily updates.',
    cta: 'Explore Construction Packages',
    to: '/build-on-my-plot',
    Icon: HardHat,
    crop: 'crop-service-1',
  },
  {
    title: 'Buy Property',
    description:
      'Find verified plots, luxury flats, bungalows, and prime commercial properties across Indore’s fastest-growing localities.',
    cta: 'Explore Properties',
    to: '/buy-property',
    Icon: Home,
    crop: 'crop-service-2',
  },
  {
    title: 'Sell Property',
    description:
      'List your plot, land, flat, or commercial space to get maximum demand value through our verified buyer network.',
    cta: 'List Your Property',
    to: '/sell-property',
    Icon: KeyRound,
    crop: 'crop-service-3',
  },
  {
    title: 'Our Projects',
    description:
      'Explore our ongoing, upcoming, and ready-to-move residential and commercial landmarks in Indore.',
    cta: 'View All Projects',
    to: '/our-projects',
    Icon: Building2,
    crop: 'crop-service-4',
  },
];

const reasons = [
  [Clock3, 'Established 2016', 'A decade of trusted construction excellence in Indore'],
  [Building2, 'Quality Materials', 'Tested cement, steel, CP fittings, and earthquake-resistant RCC'],
  [ShieldCheck, 'Transparent Pricing', 'Clear rate cards starting from ₹1,199/sq.ft. with zero escalation'],
  [CheckCircle2, 'Daily Curing & 3x Spraying', 'Proper water curing at every construction milestone'],
  [Handshake, 'Live CCTV Access', 'Daily progress tracking and client surveillance access'],
  [Users, 'Prime Indore Locations', 'Opposite Phoenix Mall, Super Corridor, Vijay Nagar, Nipania, Rau'],
];

export function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState(initialProjects.slice(0, 3));

  useEffect(() => {
    projectService.getFeaturedProjects().then(setFeaturedProjects);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate min-h-[640px] overflow-hidden bg-primary text-hero-foreground">
        <img
          src={heroImage}
          alt="Indore real estate luxury residential architecture"
          fetchPriority="high"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />

        <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.2fr_.8fr] lg:px-6">
          <div className="max-w-2xl py-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-bold text-accent mb-3 border border-accent/30">
              <span>ESTD. 2016</span>
              <span>·</span>
              <span>INDORE, M.P.</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-hero-foreground">
              Building Dreams,<br />Creating Legacies
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">
              Indore’s trusted builder for civil construction, luxury bungalows, ready flats, verified plots, and high-yield commercial hubs.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-hero-foreground/15 pt-6 sm:grid-cols-4">
              {highlights.map(([Icon, label]) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-xs font-semibold leading-4 text-hero-foreground/90">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/build-on-my-plot">
                <Button variant="gold" size="lg">
                  Construction Packages <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <a href="tel:+916232570809">
                <Button variant="heroOutline" size="lg">
                  <Phone className="h-4 w-4 mr-1.5 text-accent" />
                  Call: +91 6232570809
                </Button>
              </a>
            </div>
          </div>

          <div id="consultation">
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <p className="eyebrow">OUR CORE SERVICES</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
              Real Estate &amp; Construction Solutions
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT SPECIFIC: BUY / SELL PROPERTY INTAKE SECTION */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] items-center">
            <div>
              <p className="eyebrow">DIRECT CLIENT ENQUIRY DESK</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-primary">
                Buy or Sell Property in Indore
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Whether you are looking to purchase a plot, agricultural land, flat, independent bungalow, or commercial office—or looking to sell your existing property at maximum market value—fill out your exact requirement.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4 text-accent-strong shrink-0" />
                  <span>Verified legal documentation &amp; clear title assistance</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4 text-accent-strong shrink-0" />
                  <span>Immediate matching with genuine buyers &amp; verified sellers</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4 text-accent-strong shrink-0" />
                  <span>Serving prime locations across Indore</span>
                </div>
              </div>

              <div className="mt-8 rounded-sm bg-primary p-5 text-hero-foreground shadow-sm">
                <p className="text-xs text-accent font-bold uppercase tracking-wider">Office Location</p>
                <p className="text-sm font-semibold mt-1">
                  B-203, Vasundhara complex, opp. Phoenix mall, Indore (M.P.)
                </p>
                <p className="text-xs text-hero-muted mt-1">Direct Helpline: +91 6232570809</p>
              </div>
            </div>

            <div>
              <BuySellIntakeForm defaultMode="buy" />
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT SPECIFIC: 5 CONSTRUCTION PACKAGES */}
      <ConstructionPackages />

      {/* CLIENT SPECIFIC: 10 SPECIALITIES */}
      <OurSpeciality />

      {/* Brand Heritage Showcase Banner */}
      <section className="bg-primary-deep py-10 border-t border-accent/20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-md border border-accent/30 shadow-2xl">
            <img
              src={brandCoverImage}
              alt="RR BUILDER & DEVELOPER — Building Dreams, Creating Legacies — Since 2016"
              className="w-full h-auto object-cover max-h-[440px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-primary py-16 text-hero-foreground">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 lg:grid-cols-[.75fr_2fr] lg:px-6">
          <div className="self-center">
            <p className="eyebrow">FEATURED DEVELOPMENTS</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight">
              Modern Living Spaces in Indore
            </h2>
            <p className="mt-4 text-sm leading-6 text-hero-muted">
              Explore our thoughtfully designed residential and commercial projects combining luxury, smart floor plans, and strategic connectivity.
            </p>
            <Link to="/our-projects" className="mt-6 inline-block">
              <Button variant="heroOutline">
                View All Projects <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 lg:grid-cols-[.9fr_1.1fr] lg:px-6">
          <img
            src={indoreImage}
            alt="Indore city skyline and development"
            loading="lazy"
            className="h-full min-h-80 w-full rounded-sm object-cover shadow-card"
          />
          <div className="py-2">
            <p className="eyebrow">WHY CHOOSE US</p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight text-primary">
              Your Trusted Real Estate Partner in Indore
            </h2>
            <div className="mt-8 grid gap-x-7 gap-y-6 sm:grid-cols-2">
              {reasons.map(([Icon, title, desc]) => (
                <div key={title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[.6fr_2fr] lg:px-6">
          <div>
            <p className="eyebrow">WHAT OUR CLIENTS SAY</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-hero-foreground">
              Real People.<br />Real Experiences.
            </h2>
            <p className="mt-4 text-xs text-hero-muted">
              Over 500+ satisfied homeowners and investors across Indore since 2016.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section with Client's Trust Slogan */}
      <section className="relative isolate overflow-hidden py-20 text-center">
        <img
          src={heroImage}
          alt="Indore modern architecture"
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-cta-overlay" />
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs uppercase font-bold tracking-widest text-accent mb-2">
            RR BUILDER &amp; DEVELOPER · INDORE
          </p>
          <h2 className="font-display text-4xl font-bold text-hero-foreground">
            More Than Just Construction...<br />We Build Trust
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-hero-muted">
            Visit our office at B-203, Vasundhara complex, opposite Phoenix Mall, Indore, or speak directly with our civil engineers and property consultants.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/build-on-my-plot">
              <Button variant="gold" size="lg">Explore Construction Packages</Button>
            </Link>
            <a href="tel:+916232570809">
              <Button variant="heroOutline" size="lg">Call: +91 6232570809</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
