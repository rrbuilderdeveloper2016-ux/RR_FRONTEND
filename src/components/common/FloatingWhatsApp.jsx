import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';

function WhatsAppIcon(props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className="h-7 w-7 text-white"
      {...props}
    >
      <path d="M16.002 0C7.165 0 0 7.165 0 16.002c0 3.09 0.88 5.975 2.408 8.428L0.84 31.16l6.936-1.54A15.93 15.93 0 0 0 16.002 32C24.84 32 32 24.835 32 16.002 32 7.165 24.84 0 16.002 0zm0 29.316a13.25 13.25 0 0 1-6.758-1.848l-0.485-0.288-5 1.11 1.128-4.88-0.316-0.502a13.28 13.28 0 0 1-2.038-7.006c0-7.34 5.97-13.313 13.31-13.313 7.34 0 13.313 5.97 13.313 13.313 0 7.34-5.97 13.314-13.31 13.314zm7.295-9.972c-0.4-0.2-2.366-1.167-2.732-1.3-0.366-0.134-0.633-0.2-0.9 0.2s-1.033 1.3-1.267 1.567c-0.233 0.266-0.467 0.3-0.867 0.1s-1.693-0.624-3.225-1.99c-1.192-1.063-1.996-2.375-2.23-2.775s-0.024-0.615 0.176-0.814c0.18-0.18 0.4-0.467 0.6-0.7 0.2-0.233 0.267-0.4 0.4-0.667 0.133-0.267 0.067-0.5-0.033-0.7s-0.9-2.167-1.233-2.967c-0.325-0.78-0.655-0.674-0.9-0.686l-0.767-0.013c-0.267 0-0.7 0.1-1.067 0.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c0.2 0.267 2.82 4.307 6.833 6.04 0.955 0.413 1.7 0.66 2.28 0.845 0.96 0.305 1.833 0.262 2.523 0.159 0.77-0.115 2.366-0.967 2.7-1.9 0.333-0.933 0.333-1.733 0.233-1.9s-0.366-0.267-0.766-0.467z" />
    </svg>
  );
}

const DEFAULT_MESSAGE = "Hello RR Builders Indore! I just visited your website (rrbuilderindore.com) and would like to inquire about Construction Packages / Property in Indore. Please guide me.";

const QUICK_TOPICS = [
  {
    label: "🏗️ Build on My Plot (Construction)",
    msg: "Hello RR Builders! I visited your website and I am looking for a civil construction partner to build on my plot in Indore. Please share package details & layout consultation.",
  },
  {
    label: "🏡 Buy Property (Villa / Apartment)",
    msg: "Hello RR Builders! I visited your website and I am interested in buying a property (Flat/Villa/Plot) in Indore. Please share ongoing project details.",
  },
  {
    label: "📄 Construction Payment Plan Inquiry",
    msg: "Hello RR Builders! I reviewed your milestone payment schedule on your website. I want to discuss cost estimation & agreement for my property.",
  },
];

export function FloatingWhatsApp() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide on admin portal routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const openWhatsAppUrl = (customMsg) => {
    const text = encodeURIComponent(customMsg || DEFAULT_MESSAGE);
    const url = `https://wa.me/916232570809?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Inquiry Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-lg bg-card border border-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-base border border-white/30 text-white">
                  RR
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">RR Builder & Developer</h4>
                <p className="text-[11px] text-white/80 mt-0.5">Indore Civil & Real Estate Desk · Online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-muted/30 space-y-3 text-xs">
            <div className="rounded-md bg-card p-3 shadow-xs border border-border text-foreground leading-relaxed">
              <p className="font-semibold text-primary mb-1">नमस्ते! 🙏</p>
              <p className="text-muted-foreground">
                Welcome to RR Builders Indore. Select a topic below or click send to chat directly with our Civil & Property Consultant on WhatsApp.
              </p>
            </div>

            {/* Quick Topic Chips */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quick Inquiries:</p>
              {QUICK_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openWhatsAppUrl(topic.msg)}
                  className="w-full text-left p-2.5 rounded-md border border-border bg-card hover:bg-accent/10 hover:border-accent transition-all text-xs font-medium text-foreground flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{topic.label}</span>
                  <Send className="h-3 w-3 text-muted-foreground group-hover:text-accent-strong shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 border-t border-border bg-card">
            <button
              type="button"
              onClick={() => openWhatsAppUrl(DEFAULT_MESSAGE)}
              className="w-full py-2.5 px-4 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Start Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button Row */}
      <div className="flex items-center gap-2.5">
        {/* Tooltip Pill */}
        {!isOpen && showTooltip && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full bg-card/95 border border-border text-foreground shadow-lg text-xs font-semibold cursor-pointer hover:border-primary/50 transition-all animate-bounce"
          >
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat with us on WhatsApp</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-muted-foreground hover:text-foreground ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* WhatsApp Circular Button */}
        <button
          type="button"
          onClick={() => {
            // If already open, close it; otherwise open the options card or open WA directly
            setIsOpen(!isOpen);
          }}
          className="relative group h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          title="Chat with RR Builders on WhatsApp (+91 6232570809)"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple Pulse Rings */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none" />
          
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <WhatsAppIcon />
          )}

          {/* Active Online Green Dot */}
          <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-white flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-[#25D366]" />
          </span>
        </button>
      </div>
    </aside>
  );
}
