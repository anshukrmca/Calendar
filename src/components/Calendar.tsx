import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Event } from '../utils/localStorage';

interface CalendarProps {
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onEventClick, onDateClick }) => {
  const events = useSelector((state: RootState) => state.events.events);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'year' | 'month' | 'week' | 'day'>('month');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getDaysInWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event: Event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventsForHour = (date: Date, hour: number) => {
    return events.filter((event: Event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString() && eventDate.getHours() === hour;
    });
  };

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

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const renderMonthView = () => (
    <>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map((day: string) => (
          <div key={day} className="p-2 text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date: Date | null, index: number) => (
          <motion.div
            key={index}
            whileHover={{ scale: date ? 1.02 : 1 }}
            className={`min-h-[100px] p-2 border border-gray-200 rounded-md cursor-pointer transition-colors ${
              date ? 'hover:bg-gray-50' : 'bg-gray-50'
            }`}
            onClick={() => date && onDateClick(date)}
          >
            {date && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {getEventsForDate(date).slice(0, 3).map((event: Event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`text-xs p-1 rounded text-white truncate ${event.color} cursor-pointer`}
                      title={`${event.title} - ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    >
                      {event.title}
                    </motion.div>
                  ))}
                  {getEventsForDate(date).length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{getEventsForDate(date).length - 3} more
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );

  const renderWeekView = () => {
    const weekDays = getDaysInWeek(currentDate);
    return (
      <>
        {/* Week Header */}
        <div className="grid grid-cols-8 gap-1 mb-4">
          <div className="p-2"></div>
          {weekDays.map((date, index) => (
            <div key={index} className="p-2 text-center">
              <div className="font-semibold text-gray-700">{weekDaysShort[index]}</div>
              <div className="text-sm text-gray-500">{date.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Week Grid */}
        <div className="max-h-96 overflow-y-auto">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 gap-1 border-t border-gray-100">
              <div className="p-2 text-xs text-gray-500 text-right pr-4">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {weekDays.map((date, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  className="min-h-[60px] p-1 border border-gray-200 cursor-pointer hover:bg-gray-50"
                  onClick={() => onDateClick(new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour))}
                >
                  <div className="space-y-1">
                    {getEventsForHour(date, hour).map((event: Event) => (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className={`text-xs p-1 rounded text-white truncate ${event.color} cursor-pointer`}
                        title={`${event.title} - ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      >
                        {event.title}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderDayView = () => (
    <>
      {/* Day Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
      </div>

      {/* Day Grid */}
      <div className="max-h-96 overflow-y-auto">
        {hours.map(hour => (
          <div key={hour} className="flex border-t border-gray-100">
            <div className="w-20 p-2 text-xs text-gray-500 text-right pr-4">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            <motion.div
              className="flex-1 min-h-[60px] p-1 border-l border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour))}
            >
              <div className="space-y-1">
                {getEventsForHour(currentDate, hour).map((event: Event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`text-xs p-1 rounded text-white truncate ${event.color} cursor-pointer`}
                    title={`${event.title} - ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  >
                    {event.title}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );

  const renderYearView = () => {
    const year = currentDate.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthDate = new Date(year, i, 1);
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'long' });
      const days = getDaysInMonth(monthDate);
      return { name: monthName, date: monthDate, days };
    });

    return (
      <div className="grid grid-cols-3 gap-4">
        {months.map((month, index) => {
          const monthEvents = events.filter((event: Event) => {
            const eventDate = new Date(event.start);
            return eventDate.getFullYear() === year && eventDate.getMonth() === index;
          });

          const eventDates = new Set(monthEvents.map(event => new Date(event.start).getDate()));

          return (
            <motion.div
              key={month.name}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => {
                setCurrentDate(month.date);
                setView('month');
              }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{month.name}</h3>
              <div className="text-xs text-gray-600 mb-2">
                {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {month.days.map((date, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`text-center p-1 rounded ${
                      date
                        ? eventDates.has(date.getDate())
                          ? 'bg-blue-200 text-blue-800 font-semibold'
                          : 'text-gray-700'
                        : ''
                    }`}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* View Toggle */}
      <div className="flex justify-center mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('year')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'year' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Year
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Day
          </button>
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
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
      {view === 'year' && renderYearView()}
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}

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
