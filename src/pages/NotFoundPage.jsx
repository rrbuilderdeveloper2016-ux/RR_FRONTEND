import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-foreground">Page Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button variant="gold" size="lg">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
