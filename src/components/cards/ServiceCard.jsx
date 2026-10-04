import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesImage } from '../../data/initialData';
import { Button } from '../ui/Button';

export function ServiceCard({ service }) {
  const { title, description, cta, to, Icon, crop } = service;

  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover flex flex-col">
      {/* Top Media & Floating Circle Badge */}
      <div className="relative">
        {/* Image wrapper: strict relative and overflow-hidden to crop sprite accurately */}
        <div className={`relative h-44 w-full overflow-hidden ${crop}`}>
          <img
            src={servicesImage}
            alt={title}
            loading="lazy"
            className="crop-grid-image"
          />
        </div>
        {/* Full circular icon badge overlapping image and content - zero clipping */}
        <span className="absolute -bottom-5 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-card bg-primary text-accent shadow-md transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      {/* Card Content with pt-8 to give room to the overlapping badge */}
      <div className="flex flex-1 flex-col p-5 pt-8">
        <h3 className="font-display text-xl font-bold text-primary transition-colors group-hover:text-accent-strong">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <Link to={to} className="mt-4 self-start">
          <Button variant="navy" size="sm">
            {cta} <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
