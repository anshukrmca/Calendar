import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { selectEvents } from '../store/eventsSlice';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import YearView from './YearView';
import type { Event } from '../utils/localStorage';

interface CalendarProps {
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onEventClick, onDateClick }) => {
  const events = useSelector(selectEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'year' | 'month' | 'week' | 'day'>('month');
  const [showMoreModal, setShowMoreModal] = useState<{ isOpen: boolean; date: Date | null; hour?: number }>({ isOpen: false, date: null });

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(prev.getFullYear() - 1);
      } else {
        newDate.setFullYear(prev.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return `${startMonth} - ${endMonth}`;
  };



  const getCurrentNavigate = () => {
    switch (view) {
      case 'year':
        return navigateYear;
      case 'week':
        return navigateWeek;
      case 'day':
        return navigateDay;
      default:
        return navigateMonth;
    }
  };

  const getCurrentTitle = () => {
    switch (view) {
      case 'year':
        return currentDate.getFullYear().toString();
      case 'week':
        return formatWeekRange(currentDate);
      case 'day':
        return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      default:
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const navigate = getCurrentNavigate();

  const handleShowMore = (date: Date, hour?: number) => {
    setShowMoreModal({ isOpen: true, date, hour });
  };

  const renderCurrentView = () => {
    switch (view) {
      case 'year':
        return (
          <YearView
            events={events}
            currentDate={currentDate}
            setCurrentDate={(date) => {
              setCurrentDate(date);
              setView('month');
            }}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
            onShowMore={handleShowMore}
          />
        );
      case 'month':
        return (
          <MonthView
            events={events}
            currentDate={currentDate}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
            onShowMore={handleShowMore}
          />
        );
      case 'week':
        return (
          <WeekView
            events={events}
            currentDate={currentDate}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
            onShowMore={handleShowMore}
          />
        );
      case 'day':
        return (
          <DayView
            events={events}
            currentDate={currentDate}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4">
      {/* View Toggle */}
      <div className="flex justify-center mb-4 p-4">
        <div className="flex bg-gray-100 rounded-lg">
          {(["Year", "Month", "Week", "Day"] as const).map((data) => {
            const lower = data.toLowerCase() as "year" | "month" | "week" | "day";
            return (
              <button
                key={data}
                onClick={() => setView(lower)}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors ${view === lower
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {data}
              </button>
            );
          })}

        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {getCurrentTitle()}
          </h2>
          <p className="text-gray-600">{formatDate(currentDate)}</p>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToToday}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Today
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Calendar Content */}
      {renderCurrentView()}

      {/* Show More Modal */}
      {showMoreModal.isOpen && showMoreModal.date && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Events for {showMoreModal.date.toLocaleDateString()}
              {showMoreModal.hour !== undefined && ` at ${showMoreModal.hour}:00`}
            </h3>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {events
                .filter(event => {
                  const eventDate = new Date(event.start);
                  const matchesDate = eventDate.toDateString() === showMoreModal.date!.toDateString();
                  const matchesHour = showMoreModal.hour === undefined || eventDate.getHours() === showMoreModal.hour;
                  return matchesDate && matchesHour;
                })
                .map(event => (
                  <div
                    key={event.id}
                    className={`p-2 sm:p-3 rounded-md cursor-pointer ${event.color} hover:opacity-80 transition-opacity`}
                    onClick={() => {
                      onEventClick(event);
                      setShowMoreModal({ isOpen: false, date: null });
                    }}
                  >
                    <div className="font-medium text-sm sm:text-base">{event.title}</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {event.description && (
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">{event.description}</div>
                    )}
                  </div>
                ))}
            </div>
            <button
              onClick={() => setShowMoreModal({ isOpen: false, date: null })}
              className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-200 rounded mr-1"></div>
          <span>Blue Events</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-200 rounded mr-1"></div>
          <span>Green Events</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-pink-200 rounded mr-1"></div>
          <span>Pink Events</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-200 rounded mr-1"></div>
          <span>Yellow Events</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
          <span>Gray Events</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
