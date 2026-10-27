import rrLogo from '@/assets/rr-logo.png';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { usePopstateTrap } from '../hooks/usePopstateTrap';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect straight to /admin
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  // Trap back navigation: If user lands on login page (e.g. after logout or directly),
  // pressing the browser Back button will safely route to public homepage instead of exposing protected history
  usePopstateTrap({
    enabled: true,
    lockCurrent: true,
    onBackAttempt: () => {
      navigate('/', { replace: true });
    },
  });

  if (authService.isAuthenticated()) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-muted/30">
      <div className="w-full max-w-md rounded-md border border-border bg-card p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-20 w-20 overflow-hidden rounded-xl border-2 border-accent/40 bg-[#091522] p-1 shadow-xl">
            <img
              src={rrLogo}
              alt="RR Builder & Developer"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="font-display text-2xl font-bold text-primary">
            Admin Portal Login
          </h2>
          <p className="text-xs text-muted-foreground">
            RR Builder &amp; Developer, Indore • Secure CRM Desk
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-sm border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Username or Official Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                required
                type="text"
                placeholder="admin or admin@rrbuilderindore.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 w-full rounded-sm border border-input bg-background pl-10 pr-3 text-xs text-foreground outline-none focus:border-accent"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-sm border border-input bg-background pl-10 pr-10 text-xs text-foreground outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full font-bold py-3 text-sm"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin CRM'}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </form>

        <div className="border-t border-border pt-4 text-center space-y-2">
          <div>
            <Link to="/" className="text-xs text-primary font-semibold hover:underline">
              ← Return to Public Website
            </Link>
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Developed by{" "}
            <a
              href="https://vyonixtechno.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-accent hover:underline transition-colors inline-flex items-center gap-0.5"
            >
              <span>VyonixTechno Pvt Ltd</span>
              <span className="text-[10px]">↗</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
