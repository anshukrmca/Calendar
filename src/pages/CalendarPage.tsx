import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addEvent, deleteEvent, updateEvent } from '../store/eventsSlice';
import CalendarComponent from '../components/Calendar';
import EventModal from '../components/EventModal';
import type { Event } from '../utils/localStorage';

const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleDateClick = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      dispatch(updateEvent({ id: selectedEvent.id, event: eventData }));
    } else {
      dispatch(addEvent(eventData));
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
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedEvent(null);
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-md"
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
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default CalendarPage;
