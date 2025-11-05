import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Save, Trash2 } from 'lucide-react';
import type { Event } from '../utils/localStorage';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Chip from './ui/Chip';
import ColorPicker from './ui/ColorPicker';
import Button from './ui/Button';
import Select from './ui/Select';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event | null;
  selectedDate?: Date | null;
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
  selectedDate,
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
      setStartDate(event.start.toLocaleDateString('en-CA'));
      setStartTime(event.start.toTimeString().slice(0, 5));
      setEndDate(event.end.toLocaleDateString('en-CA'));
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
      setStartDate(selectedDate ? selectedDate.toLocaleDateString('en-CA') : now.toLocaleDateString('en-CA'));
      setStartTime('09:00');
      setEndDate(selectedDate ? selectedDate.toLocaleDateString('en-CA') : tomorrow.toLocaleDateString('en-CA'));
      setEndTime('10:00');
      setColor(colorOptions[0].value);
      setImportance('medium');
    }
  }, [event, isOpen, selectedDate]);

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

  const footer = (
    <div className="flex justify-between items-center w-full">
      <div>
        {event && onDelete && (
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          className="flex items-center"
        >
          <Trash2 size={14} className="mr-2" />
          Delete
        </Button>
      )}
      </div>
      <div className="flex gap-2 ml-auto">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleSave} className="flex items-center">
          <Save size={14} className="mr-2" />
          Save
        </Button>

      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Add Event'}
      footer={footer}
    >
      <div className="space-y-4">
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Event description"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            icon={<Calendar size={14} />}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="Start Time"
            icon={<Clock size={14} />}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            label="End Date"
            icon={<Calendar size={14} />}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Input
            label="End Time"
            icon={<Clock size={14} />}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Importance</label>
          <div className="flex flex-wrap gap-2">
            {importanceOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={importance === option.value}
                onClick={() => setImportance(option.value as 'low' | 'medium' | 'high')}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={type === option.value}
                onClick={() => setType(option.value as any)}
                className={option.color}
              />
            ))}
          </div>
        </div>

        <ColorPicker
          label="Color"
          value={color}
          onChange={setColor}
          options={colorOptions}
        />
      </div>
    </Modal>
  );
};

export default EventModal;
