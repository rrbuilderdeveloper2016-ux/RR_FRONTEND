import React from 'react';

export function Button({
  children,
  variant = 'navy',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-sm';

  const variants = {
    navy: 'bg-primary text-primary-foreground hover:bg-primary-soft shadow-sm',
    gold: 'bg-accent text-accent-foreground font-bold hover:bg-accent-bright shadow-md',
    outline: 'border border-border bg-background hover:bg-muted text-foreground',
    heroOutline: 'border border-hero-foreground/40 bg-hero-foreground/10 text-hero-foreground hover:bg-hero-foreground/20 backdrop-blur-sm',
    ghost: 'hover:bg-muted text-foreground',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-xs font-semibold gap-2',
    lg: 'h-12 px-6 text-sm font-bold gap-2.5',
    icon: 'h-10 w-10 p-0',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant] || variants.navy} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
