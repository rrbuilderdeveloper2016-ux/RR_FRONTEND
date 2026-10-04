import React from 'react';

export function Textarea({ className = '', rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y ${className}`}
      {...props}
    />
  );
}
