import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Event } from '../utils/localStorage';
import { getEvents, saveEvents } from '../utils/localStorage';

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: getEvents(),
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
      const newEvent: Event = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.events.push(newEvent);
      saveEvents(state.events);
    },
    updateEvent: (state, action: PayloadAction<{ id: string; event: Partial<Event> }>) => {
      const { id, event } = action.payload;
      const eventIndex = state.events.findIndex(e => e.id === id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = { ...state.events[eventIndex], ...event };
        saveEvents(state.events);
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
      saveEvents(state.events);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
