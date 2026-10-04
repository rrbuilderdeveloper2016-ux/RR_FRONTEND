import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { inquiryService } from '../../services/inquiryService';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { SuccessMessage } from '../common/Footer';

export function EnquiryForm({ title = 'Interested in this property?', referenceId = '', referenceTitle = '', isProject = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    referenceId,
    referenceTitle,
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isProject) {
        await inquiryService.submitProjectEnquiry(formData);
      } else {
        await inquiryService.submitPropertyEnquiry(formData);
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
          Thank you! Our property advisor will contact you promptly with complete details and floor plans.
        </SuccessMessage>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-sm border border-border bg-card p-5 shadow-card"
    >
      <h3 className="font-display text-2xl font-bold text-primary">{title}</h3>
      <p className="text-xs text-muted-foreground">
        Leave your contact details to schedule a site visit or receive pricing breakdown.
      </p>

      <Input
        required
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Input
        required
        type="tel"
        placeholder="Mobile Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <Input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Textarea
        placeholder="Any specific questions or preferred visit time?"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <Button
        type="submit"
        variant="gold"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Enquiry'}
      </Button>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <a
          href="tel:+919876543210"
          className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-border bg-background py-2 text-xs font-semibold hover:bg-muted text-foreground transition"
        >
          <Phone className="h-3.5 w-3.5 text-accent-strong" /> Call Now
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-border bg-background py-2 text-xs font-semibold hover:bg-muted text-foreground transition"
        >
          <span className="h-2 w-2 rounded-full bg-success" /> WhatsApp
        </a>
      </div>
    </form>
  );
}
