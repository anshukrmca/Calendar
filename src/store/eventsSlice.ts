import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Event } from '../utils/localStorage';
import { getEvents, saveEvents } from '../utils/localStorage';

interface SerializableEvent {
  id: string;
  title: string;
  description: string;
  start: string; // ISO string
  end: string; // ISO string
  color: string;
  importance: 'low' | 'medium' | 'high';
  type: 'work' | 'personal' | 'meeting' | 'reminder' | 'other';
}

interface EventsState {
  events: SerializableEvent[];
}

interface SerializableEventData {
  title: string;
  description: string;
  start: string; // ISO string
  end: string; // ISO string
  color: string;
  importance: 'low' | 'medium' | 'high';
  type: 'work' | 'personal' | 'meeting' | 'reminder' | 'other';
}

const convertToSerializable = (event: Event): SerializableEvent => ({
  ...event,
  start: event.start.toISOString(),
  end: event.end.toISOString(),
});

const convertToEvent = (event: SerializableEvent): Event => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
});

const initialState: EventsState = {
  events: getEvents().map(convertToSerializable),
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<SerializableEventData>) => {
      const newEvent: SerializableEvent = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.events.push(newEvent);
      saveEvents(state.events.map(convertToEvent));
    },
    updateEvent: (state, action: PayloadAction<{ id: string; event: Partial<SerializableEventData> }>) => {
      const { id, event } = action.payload;
      const eventIndex = state.events.findIndex(e => e.id === id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = { ...state.events[eventIndex], ...event };
        saveEvents(state.events.map(convertToEvent));
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
      saveEvents(state.events.map(convertToEvent));
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

// Selector to get events as Event[]
export const selectEvents = (state: { events: EventsState }) =>
  state.events.events.map(convertToEvent);
