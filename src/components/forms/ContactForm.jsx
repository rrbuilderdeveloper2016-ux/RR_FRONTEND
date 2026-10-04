import React, { useState } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { SuccessMessage } from '../common/Footer';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inquiryService.submitContact(formData);
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
          Thank you! Your message has been received by our office. We will reach back shortly.
        </SuccessMessage>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        required
        placeholder="Full Name"
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

      <Input
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      />

      <Textarea
        required
        placeholder="How can we help you?"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <Button
        type="submit"
        variant="gold"
        size="lg"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
