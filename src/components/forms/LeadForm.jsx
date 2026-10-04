import React, { useState } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { SuccessMessage } from '../common/Footer';

export function LeadForm({ selling = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Apartment',
    plotLocation: '',
    plotSize: '',
    constructionType: 'Independent Villa',
    budget: '',
    expectedPrice: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selling) {
        await inquiryService.submitSellProperty(formData);
      } else {
        await inquiryService.submitBuildOnPlot(formData);
      }
      setSent(true);
    } catch (err) {
      console.error(err);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-sm border border-border bg-card p-6 shadow-card">
        <SuccessMessage>
          Thank you. Our dedicated {selling ? 'property valuation' : 'civil construction'} specialist in Indore will contact you shortly.
        </SuccessMessage>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-sm border border-border bg-card p-6 shadow-card"
    >
      <h3 className="font-display text-2xl font-bold text-primary">
        {selling ? 'List Your Property for Sale' : 'Request Construction Estimate'}
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          required
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          required
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {selling ? (
          <select
            aria-label="Property Type"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
          >
            <option>Apartment / Flat</option>
            <option>Independent Villa / House</option>
            <option>Residential Plot</option>
            <option>Commercial Property / Office</option>
            <option>Agricultural Land</option>
          </select>
        ) : (
          <select
            aria-label="Construction Type"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            value={formData.constructionType}
            onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
          >
            <option>Independent Villa</option>
            <option>Duplex Bunglow</option>
            <option>G+2 Floors Residence</option>
            <option>Commercial Complex / Shops</option>
          </select>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          required
          placeholder={selling ? 'Property Location in Indore' : 'Plot Location in Indore'}
          value={formData.plotLocation}
          onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
        />
        {selling ? (
          <Input
            placeholder="Expected Price (e.g. ₹50 Lakh)"
            value={formData.expectedPrice}
            onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
          />
        ) : (
          <Input
            placeholder="Plot Size (e.g. 1500 sq.ft / 30x50)"
            value={formData.plotSize}
            onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
          />
        )}
      </div>

      <Textarea
        placeholder={
          selling
            ? 'Any additional property details (built-up area, age, amenities)...'
            : 'Any specific architectural preferences, budget, or timelines...'
        }
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Submitting...' : selling ? 'Submit Property Listing' : 'Get Cost Estimate'}
      </Button>
    </form>
  );
}
