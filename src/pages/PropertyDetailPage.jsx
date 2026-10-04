import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Building2,
  BedDouble,
  Bath,
  Maximize2,
  Home,
  Clock3,
  CheckCircle2,
} from 'lucide-react';
import {
  projectsImage,
  indoreImage,
  servicesImage,
  amenities,
} from '../data/initialData';
import { propertyService } from '../services/propertyService';
import { Breadcrumb } from '../components/common/Footer';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { Button } from '../components/ui/Button';

export function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyService
      .getPropertyById(id)
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center text-muted-foreground">Loading property details...</div>;
  }

  if (!property) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-primary">Property Not Found</h1>
        <p className="mt-3 text-muted-foreground">This property may no longer be available.</p>
        <Link to="/buy-property" className="mt-6 inline-block">
          <Button variant="gold">Browse Properties</Button>
        </Link>
      </div>
    );
  }

  const overview = [
    [Building2, 'Property Type', property.type],
    [BedDouble, 'Bedrooms', property.bhk || property.bedrooms || 'Custom'],
    [Bath, 'Bathrooms', property.bathrooms || '2–3'],
    [Maximize2, 'Super Built-up Area', property.area],
    [Home, 'Car Parking', property.parking || 'Covered'],
    [Clock3, 'Possession Date', property.possession || '2026–2027'],
  ];

  return (
    <>
      <Breadcrumb current={property.name} />

      <section className="pb-14 pt-4">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          {/* Gallery Triptych */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`relative min-h-80 overflow-hidden rounded-sm sm:row-span-2 ${property.crop || 'crop-project-1'}`}>
              <img src={projectsImage} alt={property.name} className="crop-project-image" />
            </div>
            <img
              src={indoreImage}
              alt={`${property.name} locality`}
              className="h-44 w-full rounded-sm object-cover sm:h-full"
            />
            <img
              src={servicesImage}
              alt={`${property.name} lifestyle`}
              className="h-44 w-full rounded-sm object-cover sm:h-full"
            />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p className="eyebrow">{property.status}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
                {property.name}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {property.location}
              </p>
              <p className="mt-4 text-2xl font-bold text-accent-strong">{property.price}</p>

              {/* Specs Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {overview.map(([Icon, label, val]) => (
                  <div key={label} className="border border-border bg-card p-4 rounded-sm">
                    <Icon className="h-5 w-5 text-accent-strong" />
                    <p className="mt-2 text-xs text-muted-foreground">{label}</p>
                    <strong className="text-sm text-primary">{val}</strong>
                  </div>
                ))}
              </div>

              {/* Sections */}
              <div className="mt-10 space-y-8">
                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Overview</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {property.description ||
                      `${property.name} combines considered architectural planning, high build quality, and superior road connectivity in Indore. Ideal for both self-use families and high-return investment.`}
                  </p>
                </section>

                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Property Highlights &amp; Amenities</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {amenities.map((item) => (
                      <p key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent-strong" />
                        {item}
                      </p>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Floor Plans &amp; Specifications</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="border border-border bg-muted p-5 rounded-sm">
                      <strong className="text-primary block font-semibold">Efficient Design</strong>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Maximized usable carpet area, large balconies, ample natural daylight, and cross ventilation.
                      </p>
                    </div>
                    <div className="border border-border bg-muted p-5 rounded-sm">
                      <strong className="text-primary block font-semibold">Premium Fittings</strong>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Branded sanitary ware, anti-skid bathroom tiles, premium modular switches, and teak veneer main entrance doors.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Developer Credentials</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Constructed and managed by RR Builder &amp; Developer, backed by more than 10 years of consistent delivery across Indore.
                  </p>
                </section>
              </div>
            </div>

            {/* Sticky Form */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <EnquiryForm
                title="Book a Site Visit"
                referenceId={property.id}
                referenceTitle={property.name}
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
