// Visitor tracking utility
let sessionId: string | null = null;
let lastTrackedPath: string = '';

// Get or create session ID
const getSessionId = (): string => {
  if (!sessionId) {
    sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_session_id', sessionId);
    }
  }
  return sessionId;
};

// Track page visit
export const trackPageVisit = async (path: string = window.location.pathname) => {
  // Don't track admin pages
  if (path.includes('/admin')) return;

  // Don't track same path multiple times quickly
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;

  try {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    await fetch(`${apiUrl}/api/visitors/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        referer: document.referrer || undefined,
        sessionId: getSessionId(),
      }),
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience
    console.debug('Visitor tracking failed:', error);
  }
};

// Track page duration (when user leaves)
export const trackPageDuration = async (duration: number) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    await fetch(`${apiUrl}/api/visitors/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: window.location.pathname,
        sessionId: getSessionId(),
        duration: Math.round(duration),
      }),
    });
  } catch (error) {
    console.debug('Duration tracking failed:', error);
  }
};

// Initialize tracking
export const initVisitorTracking = () => {
  // Track initial page load
  trackPageVisit();

  // Track page changes (for SPA)
  let startTime = Date.now();
  
  // Track when page becomes hidden (user navigates away)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const duration = (Date.now() - startTime) / 1000; // in seconds
      if (duration > 5) { // Only track if user spent more than 5 seconds
        trackPageDuration(duration);
      }
    } else {
      startTime = Date.now();
    }
  });

  // Track before page unload
  window.addEventListener('beforeunload', () => {
    const duration = (Date.now() - startTime) / 1000;
    if (duration > 5) {
      // Use sendBeacon for reliability during page unload
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const data = JSON.stringify({
        path: window.location.pathname,
        sessionId: getSessionId(),
        duration: Math.round(duration),
      });
      navigator.sendBeacon(`${apiUrl}/api/visitors/track`, data);
    }
  });
};

