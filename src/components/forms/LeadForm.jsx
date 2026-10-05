import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { SuccessMessage } from '../common/Footer';
import { Check, Sparkles } from 'lucide-react';

export function LeadForm({ selling = false, selectedPackage = null }) {
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

  useEffect(() => {
    if (selectedPackage && !selling) {
      setFormData((prev) => ({
        ...prev,
        plotSize: selectedPackage.area ? `${selectedPackage.area} sq.ft` : prev.plotSize,
        budget: selectedPackage.estimatedCost ? `₹${Number(selectedPackage.estimatedCost).toLocaleString('en-IN')}` : prev.budget,
        message: `Inquiring for ${selectedPackage.name} Package (${selectedPackage.rate || ''}${selectedPackage.floor ? `, ${selectedPackage.floor}` : ''}${selectedPackage.area ? `, ${selectedPackage.area} sq.ft` : ''}). Please share detailed architectural layout & milestone contract.`,
      }));
    }
  }, [selectedPackage, selling]);

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
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-bold text-primary">
          {selling ? 'List Your Property for Sale' : 'Request Construction Estimate'}
        </h3>
      </div>

      {/* Selected Package Indicator */}
      {selectedPackage && !selling && (
        <div className="flex items-center justify-between p-3 rounded-sm bg-accent/10 border border-accent/30 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-accent/20 text-accent-strong">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <span className="font-bold text-primary">{selectedPackage.name} PACKAGE</span>
              <span className="text-muted-foreground ml-2">
                {selectedPackage.rate} {selectedPackage.floor ? `· ${selectedPackage.floor}` : ''}
                {selectedPackage.estimatedCost ? ` · Est: ₹${Number(selectedPackage.estimatedCost).toLocaleString('en-IN')}` : ''}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent-strong bg-accent/20 px-2 py-0.5 rounded-full">
            <Check className="h-3 w-3" /> Pre-filled
          </span>
        </div>
      )}

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
          placeholder={selling ? 'Property Location in Indore' : 'Plot Location in Indore (e.g. Super Corridor)'}
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

      {!selling && (
        <Input
          placeholder="Approx. Budget (e.g. ₹25 Lakh)"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        />
      )}

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
        {loading ? 'Submitting...' : selling ? 'Submit Property Listing' : 'Request for a Cost Estimate'}
      </Button>
    </form>
  );
}
