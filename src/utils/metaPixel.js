/**
 * Native Meta (Facebook) Pixel Tracking Utility
 * Pixel ID: 4752067948356205
 * Zero third-party dependencies, production-ready & safe for SSR/SPA
 */

/**
 * Checks whether window.fbq is initialized and available
 * @returns {boolean}
 */
export const isFbqAvailable = () => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Safely parses human-readable prices like '₹45 Lakh', '₹1.5 Cr', '₹1,199/sq.ft' into rough numeric INR
 * @param {string|number} priceStr
 * @returns {number|undefined}
 */
const parsePriceValue = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr || typeof priceStr !== 'string') return undefined;

  const clean = priceStr.replace(/[^0-9.a-zA-Z]/g, '').toLowerCase();
  const numMatch = clean.match(/([0-9]+(.[0-9]+)?)/);
  if (!numMatch) return undefined;

  const num = parseFloat(numMatch[1]);
  if (clean.includes('cr')) {
    return Math.round(num * 10000000);
  }
  if (clean.includes('lakh') || clean.includes('lac')) {
    return Math.round(num * 100000);
  }
  return num;
};

/**
 * Track PageView event on SPA route transitions
 */
export const trackPageView = () => {
  if (isFbqAvailable()) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track ViewContent event when a user views a property or project detail page
 * @param {Object} item Property or Project detail object
 */
export const trackViewContent = (item = {}) => {
  if (!isFbqAvailable()) return;

  const payload = {
    content_name: item.name || item.title || 'Property Detail',
    content_category: item.category || item.type || 'Real Estate',
    content_type: 'product',
    currency: 'INR',
  };

  if (item.id) {
    payload.content_ids = [String(item.id)];
  }

  const parsedVal = parsePriceValue(item.price);
  if (parsedVal) {
    payload.value = parsedVal;
  }

  window.fbq('track', 'ViewContent', payload);
};

/**
 * Track Lead event when user successfully submits any contact / inquiry / intake form
 * @param {Object} formDetails Information about the submitted form
 */
export const trackLead = (formDetails = {}) => {
  if (!isFbqAvailable()) return;

  const payload = {
    content_name: formDetails.formName || formDetails.serviceInterest || formDetails.referenceTitle || 'Lead Form Submission',
    content_category: formDetails.category || 'Real Estate Inquiry',
    currency: 'INR',
  };

  if (formDetails.budget) {
    const parsedVal = parsePriceValue(formDetails.budget);
    if (parsedVal) payload.value = parsedVal;
  }

  window.fbq('track', 'Lead', payload);
};

/**
 * Track Contact event when user clicks WhatsApp chat, call link, or direct outreach
 * @param {string} method Communication channel ('WhatsApp', 'Phone Call', 'Email')
 */
export const trackContact = (method = 'WhatsApp') => {
  if (!isFbqAvailable()) return;

  window.fbq('track', 'Contact', {
    content_name: method,
    method: method,
  });
};

/**
 * Track Custom Event for flexible future analytics
 * @param {string} eventName
 * @param {Object} params
 */
export const trackCustomEvent = (eventName, params = {}) => {
  if (!isFbqAvailable() || !eventName) return;
  window.fbq('trackCustom', eventName, params);
};

export default {
  isFbqAvailable,
  trackPageView,
  trackViewContent,
  trackLead,
  trackContact,
  trackCustomEvent,
};
