import { useEffect, useRef } from 'react';

/**
 * usePopstateTrap Hook
 * Traps the browser 'Back' button on sensitive pages
 * (e.g. Login, Admin Dashboard, Logout).
 *
 * Prevents unauthorized or accidental back-navigation to protected states.
 */
export function usePopstateTrap({
  enabled = true,
  onBackAttempt = null,
  redirectTo = null,
  lockCurrent = true,
} = {}) {
  const onBackAttemptRef = useRef(onBackAttempt);
  onBackAttemptRef.current = onBackAttempt;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Push initial synthetic history entry to capture back action
    window.history.pushState({ popstateTrapped: true }, '', window.location.href);

    const handlePopState = (event) => {
      // Absorb back navigation by re-locking current location
      if (lockCurrent) {
        window.history.pushState({ popstateTrapped: true }, '', window.location.href);
      }

      if (onBackAttemptRef.current) {
        onBackAttemptRef.current(event);
      }

      if (redirectTo) {
        window.location.replace(redirectTo);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, lockCurrent, redirectTo]);
}

export default usePopstateTrap;
