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
  { value: 'work', label: 'Work', color: 'bg-purple-500 text-white' },
  { value: 'personal', label: 'Personal', color: 'bg-amber-500 text-white' },
  { value: 'meeting', label: 'Meeting', color: 'bg-pink-500 text-white' },
  { value: 'reminder', label: 'Reminder', color: 'bg-indigo-500 text-white' },
  { value: 'other', label: 'Other', color: 'bg-teal-500 text-white' },
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
    onSave({ title, description, start, end, color, importance, type });
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full sm:max-w-lg lg:max-w-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-2 px-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                {event ? 'Edit Event' : 'Add Event'}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:px-6 space-y-2 md:space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-1 md:p-2 text-xs md:text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Event title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-1 md:p-2 text-xs md:text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                  placeholder="Event description"
                />
              </div>

              {/* Dates & Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Start Date', icon: Calendar, type: 'date', value: startDate, set: setStartDate },
                  { label: 'Start Time', icon: Clock, type: 'time', value: startTime, set: setStartTime },
                  { label: 'End Date', icon: Calendar, type: 'date', value: endDate, set: setEndDate },
                  { label: 'End Time', icon: Clock, type: 'time', value: endTime, set: setEndTime },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-xs md:text-sm font-medium mb-1 flex items-center">
                      <field.icon size={14} className="mr-1" />
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      className="w-full p-1 md:p-2 text-xs md:text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              {/* Importance */}
              <div>
                <label className="block text-sm font-medium mb-1">Importance</label>
                <div className="flex flex-wrap gap-2">
                  {importanceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setImportance(option.value as 'low' | 'medium' | 'high')}
                      className={`px-3 py-0.5 md:py-1 text-[10px] md:text-xs cursor-pointer rounded-full font-medium transition-all duration-200 ${
                        importance === option.value
                          ? 'bg-blue-500 text-white ring-2 ring-slate-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setType(option.value as any)}
                      className={`px-3 py-0.5 md:py-1 text-[10px] md:text-xs cursor-pointer rounded-full  font-medium transition-all duration-200 ${
                        type === option.value ? 'ring-2 ring-slate-700' : ''
                      } ${option.color}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="text-sm font-medium mb-1 flex items-center">
                  <Palette size={16} className="mr-1" />
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setColor(option.value)}
                      className={`w-6 h-6 md:w-8 md:h-8 cursor-pointer rounded-full ${option.value} border-2 ${
                        color === option.value ? 'border-gray-700' : 'border-gray-300'
                      } transition-all`}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
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
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all hover:scale-105 duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all hover:scale-105 duration-200"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
