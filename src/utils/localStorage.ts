export interface Event {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  color: string;
  importance: 'low' | 'medium' | 'high';
  type: 'work' | 'personal' | 'meeting' | 'reminder' | 'other';
}

const STORAGE_KEY = 'calendar-events';

export const getEvents = (): Event[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return getDefaultEvents();

  const events = JSON.parse(stored);
  return events.map((event: any) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};

export const saveEvents = (events: Event[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

const getDefaultEvents = (): Event[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  return [
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
      color: 'bg-blue-200',
      importance: 'high',
      type: 'meeting',
    },
    {
      id: '2',
      title: 'Project Deadline',
      description: 'Submit final report',
      start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 0),
      end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 15, 0),
      color: 'bg-red-200',
      importance: 'high',
      type: 'work',
    },
    {
      id: '3',
      title: 'Client Call',
      description: 'Discuss project requirements',
      start: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 9, 0),
      end: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 10, 30),
      color: 'bg-green-200',
      importance: 'medium',
      type: 'meeting',
    },
  ];
};
