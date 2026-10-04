import React from 'react';
import { Quote, Star } from 'lucide-react';

export function TestimonialCard({ item }) {
  return (
    <article className="relative rounded-sm bg-card p-6 text-card-foreground shadow-xl">
      <Quote className="absolute right-4 top-4 h-8 w-8 text-accent-soft opacity-60" />
      <div className="flex gap-1 text-accent-strong" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground italic">
        “{item.quote}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-xs font-bold text-accent shadow-sm">
          {item.initials}
        </span>
        <div>
          <strong className="block text-sm font-bold text-primary">{item.name}</strong>
          <span className="text-xs text-muted-foreground">Indore, MP</span>
        </div>
      </div>
    </article>
  );
}
