import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { indoreImage, servicesImage } from '../data/initialData';
import { locationService } from '../services/locationService';
import { Breadcrumb, PageHero } from '../components/common/Footer';
import { Button } from '../components/ui/Button';

export function LocationsPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locationService.getAllLocations().then(setLocations);
  }, []);

  return (
    <>
      <Breadcrumb current="Locations" />
      <PageHero
        eyebrow="EXPLORE INDORE REAL ESTATE"
        title="Prime Localities Across Indore"
        description="Discover homes, plots, and commercial opportunities across Indore’s most established residential enclaves and rapidly expanding growth corridors."
      />

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {locations.map((loc, index) => (
            <article
              key={loc.slug}
              className="group overflow-hidden rounded-sm border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="overflow-hidden h-44">
                <img
                  src={index % 2 === 0 ? indoreImage : servicesImage}
                  alt={loc.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-accent-strong">{loc.propertyCountText}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-primary">{loc.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                  {loc.description || `High-demand real estate destination in Indore.`}
                </p>
                <Link to={`/buy-property?location=${loc.slug}`} className="mt-4 inline-block">
                  <Button variant="navy" size="sm">
                    Explore Properties <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
