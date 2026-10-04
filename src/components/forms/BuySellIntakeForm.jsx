import React, { useState } from 'react';
import { Home, Clock, Mail, CheckCircle2, Send, Tag } from 'lucide-react';
import { inquiryService } from '../../services/inquiryService';
import { Button } from '../ui/Button';

const propertyOptions = ['Plot', 'Land', 'Flat', 'House / Bungalow', 'Commercial'];
const timelineOptions = ['Urgent', '1 – 3 Months', '3 – 6 Months', 'More than 6 Months / Flexible'];

export function BuySellIntakeForm({ defaultMode = 'buy', className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultMode); // 'buy' | 'sell'
  const [selectedTypes, setSelectedTypes] = useState(['Flat']);
  const [timeline, setTimeline] = useState('1 – 3 Months');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budgetOrDemand: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleType = (t) => {
    if (selectedTypes.includes(t)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter((item) => item !== t));
      }
    } else {
      setSelectedTypes([...selectedTypes, t]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      selectedPropertyTypes: selectedTypes.join(', '),
      timelineUrgency: activeTab === 'buy' ? timeline : null,
      budget: activeTab === 'buy' ? formData.budgetOrDemand : null,
      demandAskingPrice: activeTab === 'sell' ? formData.budgetOrDemand : null,
      serviceInterest: activeTab === 'buy' ? 'Buy Property Requirement' : 'Sell Property Listing',
      message: `${activeTab.toUpperCase()} Requirement: Types [${selectedTypes.join(', ')}]${
        activeTab === 'buy' ? ` | Urgency [${timeline}] | Budget [${formData.budgetOrDemand}]` : ` | Demand [${formData.budgetOrDemand}]`
      }`,
    };

    try {
      if (activeTab === 'buy') {
        await inquiryService.submitGeneral({ ...payload, inquiryType: 'PROPERTY_ENQUIRY' });
      } else {
        await inquiryService.submitGeneral({ ...payload, inquiryType: 'SELL_PROPERTY' });
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', budgetOrDemand: '' });
  };

  return (
    <div className={`overflow-hidden rounded-md border-2 border-primary/20 bg-card shadow-2xl ${className}`}>
      {/* Top BUY / SELL Switcher Tabs */}
      <div className="grid grid-cols-2 text-center font-display text-lg font-bold border-b border-border">
        <button
          type="button"
          onClick={() => { setActiveTab('buy'); setSubmitted(false); }}
          className={`py-3.5 transition-all flex items-center justify-center gap-2 ${
            activeTab === 'buy'
              ? 'bg-primary text-hero-foreground shadow-inner'
              : 'bg-muted/70 text-muted-foreground hover:bg-muted'
          }`}
        >
          <Home className="h-5 w-5" />
          <span>BUY PROPERTY</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('sell'); setSubmitted(false); }}
          className={`py-3.5 transition-all flex items-center justify-center gap-2 ${
            activeTab === 'sell'
              ? 'bg-primary text-hero-foreground shadow-inner'
              : 'bg-muted/70 text-muted-foreground hover:bg-muted'
          }`}
        >
          <Tag className="h-5 w-5" />
          <span>SELL PROPERTY</span>
        </button>
      </div>

      {submitted ? (
        <div className="p-8 text-center space-y-4">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="font-display text-2xl font-bold text-primary">
            {activeTab === 'buy' ? 'Requirement Registered!' : 'Property Listed for Sale!'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-primary">{formData.name}</strong>. Our real-estate desk has noted your{' '}
            {activeTab.toUpperCase()} preference ({selectedTypes.join(', ')}). Our agent will connect on{' '}
            <strong className="text-primary">{formData.phone}</strong> shortly.
          </p>
          <Button variant="navy" size="md" onClick={handleReset}>
            Submit Another Requirement
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Section 1: PROPERTY TYPE */}
          <div className="rounded-sm border border-border/80 bg-background/50 p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3">
              <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-primary">
                <span className="h-2 w-2 rounded-full bg-accent-strong" />
                PROPERTY TYPE
              </h4>
              <Home className="h-4 w-4 text-accent-strong" />
            </div>
            <p className="text-[11px] text-muted-foreground mb-2.5 font-medium">Select type(s):</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {propertyOptions.map((opt, idx) => {
                const checked = selectedTypes.includes(opt);
                return (
                  <label
                    key={opt}
                    onClick={() => toggleType(opt)}
                    className={`flex items-center gap-2.5 rounded-sm border px-3 py-2 text-xs font-semibold cursor-pointer transition select-none ${
                      checked
                        ? 'border-accent bg-accent/15 text-primary shadow-xs'
                        : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="h-3.5 w-3.5 accent-accent"
                    />
                    <span>{idx + 1}. {opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 2: TIMELINE / URGENCY (Only for BUY) */}
          {activeTab === 'buy' && (
            <div className="rounded-sm border border-border/80 bg-background/50 p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3">
                <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-primary">
                  <span className="h-2 w-2 rounded-full bg-accent-strong" />
                  TIMELINE / URGENCY
                </h4>
                <Clock className="h-4 w-4 text-accent-strong" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {timelineOptions.map((item, idx) => {
                  const active = timeline === item;
                  return (
                    <label
                      key={item}
                      onClick={() => setTimeline(item)}
                      className={`flex items-center gap-2.5 rounded-sm border px-3 py-2 text-xs font-semibold cursor-pointer transition select-none ${
                        active
                          ? 'border-accent bg-accent/15 text-primary shadow-xs'
                          : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        checked={active}
                        onChange={() => setTimeline(item)}
                        className="h-3.5 w-3.5 accent-accent"
                      />
                      <span>{idx + 1}. {item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: CLIENT CONTACT INFO (& DEMAND for SELL) */}
          <div className="rounded-sm border border-border/80 bg-background/50 p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3">
              <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-primary">
                <span className="h-2 w-2 rounded-full bg-accent-strong" />
                {activeTab === 'buy' ? 'CLIENT CONTACT INFO' : 'CLIENT CONTACT INFO & DEMAND'}
              </h4>
              <Mail className="h-4 w-4 text-accent-strong" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                  1. Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-sm border border-input bg-card px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                  2. Contact No. *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 Mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-10 w-full rounded-sm border border-input bg-card px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                  3. Mail ID
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 w-full rounded-sm border border-input bg-card px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                  4. {activeTab === 'buy' ? 'Budget *' : 'Demand (Asking Price) *'}
                </label>
                <input
                  required
                  type="text"
                  placeholder={activeTab === 'buy' ? 'e.g. ₹45 Lakh / ₹1.2 Cr' : 'e.g. ₹55 Lakh Expected'}
                  value={formData.budgetOrDemand}
                  onChange={(e) => setFormData({ ...formData, budgetOrDemand: e.target.value })}
                  className="h-10 w-full rounded-sm border border-input bg-card px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full text-base py-3"
            disabled={loading}
          >
            <Send className="h-4 w-4 mr-1.5" />
            {loading ? 'Submitting...' : activeTab === 'buy' ? 'SUBMIT BUY REQUIREMENT' : 'SUBMIT PROPERTY FOR SALE'}
          </Button>
        </form>
      )}
    </div>
  );
}
