import Event from '@/types/gtm-event';
import { isProd } from '@utils/getEnv';

export const GA_ID = process.env.PUBLIC_GOOGLE_ANALYTICS_ID;

export const pv = (path: string) => {
  if (!isProd) return;

  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

export const event = ({ action, category, label, value = '' }: Event) => {
  if (!isProd) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
