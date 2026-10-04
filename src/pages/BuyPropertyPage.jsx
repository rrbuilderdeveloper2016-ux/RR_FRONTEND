import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb, PageHero, SectionHeading } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PropertyCard } from '../components/cards/PropertyCard';
import { initialProperties } from '../data/initialData';
import { propertyService } from '../services/propertyService';
import { BuySellIntakeForm } from '../components/forms/BuySellIntakeForm';

const selectClass =
  'h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring';

export function BuyPropertyPage() {
  const [searchParams] = useSearchParams();
  const urlLocation = searchParams.get('location') || '';

  const [locationInput, setLocationInput] = useState(
    urlLocation.replaceAll('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  );
  const [appliedLocation, setAppliedLocation] = useState(locationInput);
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [bhk, setBhk] = useState('');
  const [status, setStatus] = useState('');

  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(true);
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    propertyService
      .getAllProperties({
        location: appliedLocation,
        type,
        status,
        bhk,
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, [appliedLocation, type, status, bhk]);

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedLocation(locationInput);
  };

  const handleReset = () => {
    setLocationInput('');
    setAppliedLocation('');
    setType('');
    setBudget('');
    setBhk('');
    setStatus('');
  };

  return (
    <>
      <Breadcrumb current="Buy Property" />
      <PageHero
        eyebrow="BUY PROPERTY IN INDORE"
        title="Find Your Perfect Property"
        description="Explore luxury apartments, modern villas, commercial shops, and verified residential plots across prime localities of Indore."
      />

      {/* Filter Bar */}
      <section className="bg-muted py-8 border-b border-border">
        <form
          className="mx-auto grid max-w-7xl gap-3 px-4 md:grid-cols-2 lg:grid-cols-5 lg:px-6"
          onSubmit={handleSearch}
        >
          <Input
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Search by location (e.g. Vijay Nagar)"
            aria-label="Search by location"
          />

          <select
            className={selectClass}
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Property Type"
          >
            <option value="">All Property Types</option>
            {['Apartment', 'Villa', 'Plot', 'Commercial', 'Office', 'Shop'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <select
            className={selectClass}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            aria-label="Budget"
          >
            <option value="">All Budgets</option>
            {['Under ₹30 Lakh', '₹30–50 Lakh', '₹50 Lakh–₹1 Cr', '₹1 Cr+'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <select
            className={selectClass}
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            aria-label="BHK"
          >
            <option value="">All Bedrooms / BHK</option>
            {['1 BHK', '2 BHK', '3 BHK', '4 BHK+'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <select
            className={selectClass}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Property Status"
          >
            <option value="">All Statuses</option>
            {['Upcoming', 'Ongoing', 'Completed', 'Ready to Move'].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-5 pt-2">
            <Button type="submit" variant="gold">
              Apply Filters
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
            <Button
              type="button"
              variant="navy"
              className="ml-auto"
              onClick={() => setShowCustomForm(!showCustomForm)}
            >
              {showCustomForm ? 'Close Requirement Form' : '📋 Post Custom Requirement'}
            </Button>
          </div>
        </form>
      </section>

      {/* Custom Requirement Drawer / Section */}
      {showCustomForm && (
        <section className="bg-background py-10 border-b border-border animate-in fade-in duration-300">
          <div className="mx-auto max-w-4xl px-4 lg:px-6">
            <div className="text-center mb-6">
              <p className="eyebrow">CAN'T FIND WHAT YOU ARE LOOKING FOR?</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary mt-1">
                Post Your Exact Buy Requirement
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Select your property types, timeline urgency, and budget. Our desk will locate matching properties.
              </p>
            </div>
            <BuySellIntakeForm defaultMode="buy" />
          </div>
        </section>
      )}

      {/* Listings */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="CURATED LISTINGS"
            title={appliedLocation ? `Properties in ${appliedLocation}` : 'Available Properties in Indore'}
            description="Verified listings with legal documentation and transparent developer pricing."
          />

          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No properties match these criteria. Try adjusting or resetting filters.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
