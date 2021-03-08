/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
interface Window {
  // pageview
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string });
  // event
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      event_label: string;
      event_category: string;
      value?: string;
    }
  );
}
