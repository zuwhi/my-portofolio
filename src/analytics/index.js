import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

/**
 * Initialize Google Analytics.
 * Call this once at the app entry point (main.jsx).
 * Safely handles missing environment variable with dev warnings.
 */
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.warn(
        '[GA Analytics] VITE_GA_MEASUREMENT_ID is not defined in environment variables.\n' +
        'Google Analytics will not be initialized.\n' +
        'To enable GA, add VITE_GA_MEASUREMENT_ID to your .env file.'
      );
    }
    return;
  }

  if (isInitialized) return;

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    debug: import.meta.env.DEV,
  });
  isInitialized = true;

  if (import.meta.env.DEV) {
    console.log('[GA Analytics] Google Analytics initialized successfully');
  }
};

/**
 * Track a page view.
 * Automatically called by PageTracker component on route change.
 *
 * @param {string} path - The page path (e.g. '/about')
 * @param {string} [title] - Optional page title
 */
export const logPageView = (path, title) => {
  if (!isInitialized) {
    if (import.meta.env.DEV) {
      console.warn('[GA Analytics] Cannot track page view: GA not initialized');
    }
    return;
  }

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

/**
 * Track a custom event.
 * Use this for user interactions like button clicks, form submissions, etc.
 *
 * @param {string} category - Event category (e.g. 'User Interaction', 'Form')
 * @param {string} action - Event action (e.g. 'button_click', 'form_submit')
 * @param {object} [params] - Additional event parameters (e.g. { label: 'contact_form' })
 *
 * @example
 * logEvent('User Interaction', 'button_click', { label: 'download_cv' });
 */
export const logEvent = (category, action, params = {}) => {
  if (!isInitialized) {
    if (import.meta.env.DEV) {
      console.warn('[GA Analytics] Cannot track event: GA not initialized');
    }
    return;
  }

  ReactGA.event({
    category,
    action,
    ...params,
  });
};