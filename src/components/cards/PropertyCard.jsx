import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Maximize2, Heart, ArrowRight } from 'lucide-react';
import { projectsImage } from '../../data/initialData';
import { Button } from '../ui/Button';

export function PropertyCard({ property }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className={`relative h-56 overflow-hidden ${property.crop || 'crop-project-1'}`}>
        <img
          src={projectsImage}
          alt={property.name}
          className="crop-project-image transition duration-500 group-hover:scale-[1.08]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-primary px-2.5 py-1 text-[11px] font-bold text-hero-foreground shadow">
          {property.featured ? 'Featured' : property.status}
        </span>
        <button
          type="button"
          aria-label={`${favorite ? 'Remove' : 'Add'} ${property.name} ${favorite ? 'from' : 'to'} favorites`}
          onClick={() => setFavorite(!favorite)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary shadow backdrop-blur transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${favorite ? 'fill-accent text-accent-strong' : 'text-primary'}`} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold tracking-wider uppercase text-accent-strong">
          {property.type}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-primary group-hover:text-accent-strong transition">
          {property.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          {property.location}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-border py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-primary shrink-0" />
            {property.bhk}
          </span>
          <span className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-primary shrink-0" />
            {property.area}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <strong className="text-sm font-bold text-primary">
            {property.price}
          </strong>
          <Link to={`/property/${property.id}`}>
            <Button variant="navy" size="sm">
              View Details <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
