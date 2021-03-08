type ClickEvent = {
  action: 'click';
  category: 'Other';
  label: string;
  value?: string;
};

export type Event = ClickEvent;
export default Event;
