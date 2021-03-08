/* eslint-disable no-console */
import Event from '@/types/gtm-event';
import { isProd } from '@utils/getEnv';

export const GA_ID = process.env.PUBLIC_GOOGLE_ANALYTICS_ID;

export const ENABLE_GTM = isProd && GA_ID;

const hasGtm = () => {
  return !!window?.gtag;
};

export const pv = (path: string) => {
  if (!ENABLE_GTM || !hasGtm()) return;

  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

export const event = ({ action, category, label, value = '' }: Event) => {
  if (!ENABLE_GTM || !hasGtm()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
