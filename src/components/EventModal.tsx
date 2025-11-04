import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Palette, Save, Trash2 } from 'lucide-react';
import type { Event } from '../utils/localStorage';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event | null;
  onSave: (event: Omit<Event, 'id'>) => void;
  onDelete?: (id: string) => void;
}

const colorOptions = [
  { value: 'bg-blue-200', label: 'Blue' },
  { value: 'bg-green-200', label: 'Green' },
  { value: 'bg-pink-200', label: 'Pink' },
  { value: 'bg-yellow-200', label: 'Yellow' },
  { value: 'bg-gray-200', label: 'Gray' },
];

const importanceOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const typeOptions = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'other', label: 'Other' },
];

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(colorOptions[0].value);
  const [importance, setImportance] = useState<'low' | 'medium' | 'high'>('medium');
  const [type, setType] = useState<'work' | 'personal' | 'meeting' | 'reminder' | 'other'>('other');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStartDate(event.start.toISOString().split('T')[0]);
      setStartTime(event.start.toTimeString().slice(0, 5));
      setEndDate(event.end.toISOString().split('T')[0]);
      setEndTime(event.end.toTimeString().slice(0, 5));
      setColor(event.color);
      setImportance(event.importance);
      setType(event.type);
    } else {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);

      setTitle('');
      setDescription('');
      setStartDate(now.toISOString().split('T')[0]);
      setStartTime('09:00');
      setEndDate(tomorrow.toISOString().split('T')[0]);
      setEndTime('10:00');
      setColor(colorOptions[0].value);
      setImportance('medium');
    }
  }, [event, isOpen]);

  const handleSave = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (start >= end) {
      alert('End time must be after start time');
      return;
    }

    onSave({
      title,
      description,
      start,
      end,
      color,
      importance,
      type,
    });
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-1/3 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {event ? 'Edit Event' : 'Add Event'}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Event description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center">
                    <Clock size={16} className="mr-1" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center">
                    <Clock size={16} className="mr-1" />
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Importance</label>
                <div className="flex space-x-2">
                  {importanceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setImportance(option.value as 'low' | 'medium' | 'high')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        importance === option.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="flex space-x-2">
                  {typeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setType(option.value as 'work' | 'personal' | 'meeting' | 'reminder' | 'other')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        type === option.value
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 flex items-center">
                  <Palette size={16} className="mr-1" />
                  Color
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setColor(option.value)}
                      className={`w-8 h-8 rounded-full ${option.value} border-2 ${
                        color === option.value ? 'border-gray-600' : 'border-gray-300'
                      } transition-all`}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              {event && onDelete && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </motion.button>
              )}
              <div className="flex space-x-2 ml-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
