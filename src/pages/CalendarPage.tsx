import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Palette } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEvent, deleteEvent, updateEvent } from '../store/eventsSlice';
import CalendarComponent from '../components/Calendar';
import EventModal from '../components/EventModal';
import type { Event } from '../utils/localStorage';

const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    const serializableData = {
      ...eventData,
      start: eventData.start.toISOString(),
      end: eventData.end.toISOString(),
    };
    if (selectedEvent) {
      dispatch(updateEvent({ id: selectedEvent.id, event: serializableData }));
    } else {
      dispatch(addEvent(serializableData));
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    dispatch(deleteEvent(eventId));
    setIsModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Calendar className="mr-2" size={32} />
                Calendar
              </h1>
              <p className="text-gray-600 mt-1">Manage your events and schedule</p>
              <Link
                to="/ui-examples"
                className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Palette size={16} className="mr-1" />
                View UI Components Library
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedEvent(null);
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-md"
            >
              <Plus size={20} className="mr-2" />
              Add Event
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CalendarComponent
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
          />
        </motion.div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default CalendarPage;
