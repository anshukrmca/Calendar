import React from "react";
import { motion } from "framer-motion";
import type { Event } from "../utils/localStorage";

interface MonthViewProps {
  events: Event[];
  currentDate: Date;
  compact?: boolean;
  YearView?: boolean;
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  onShowMore: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  events,
  currentDate,
  compact = false,
  YearView = false,
  onEventClick,
  onDateClick,
  onShowMore,
}) => {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDay = startOfMonth.getDay(); // Sunday = 0
  const totalDays = endOfMonth.getDate();

  // 🗓️ Build full 6x7 grid (42 days)
  const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const prevMonthDays = Array.from(
    { length: startDay },
    (_, i) =>
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthEnd - startDay + i + 1)
  );

  const currentMonthDays = Array.from(
    { length: totalDays },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );

  const nextMonthDaysCount = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from(
    { length: nextMonthDaysCount },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1)
  );

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const getEventsForDate = (date: Date) =>
    events.filter((e) => new Date(e.start).toDateString() === date.toDateString());

  return (
    <div className="w-full">
      {/* 🗓️ Calendar Grid */}
      <div
        className={`grid grid-cols-7 text-center text-xs sm:text-sm ${compact ? "gap-0.5" : "gap-1"
          }`}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold py-1 text-xs sm:text-sm">
            {d}
          </div>
        ))}

        {allDays.map((day) => {
          const today = new Date();
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          const dayEvents = getEventsForDate(day);

          return (
            <motion.div
              key={day.toISOString()}
              whileHover={{ scale: 1.02 }}
              onClick={() => onDateClick(day)}
              className={`
        p-1 sm:p-2 border border-gray-200 rounded cursor-pointer transition-colors max-h-20 
        ${isToday
                  ? "bg-blue-100 ring-1 ring-blue-500 text-blue-700 font-semibold"
                  : isCurrentMonth
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-100 text-gray-400"
                }
        ${YearView ? "sm:max-h-[100px]" : "sm:min-h-[100px]"}
        ${compact ? "text-[10px]" : ""}
      `}
            >
              <div
                className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? "text-blue-700 font-bold" : ""
                  }`}
              >
                {day.getDate()}
              </div>
              {!YearView && (
                <div className="space-y-0.5 sm:space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-md text-white truncate ${event.color} cursor-pointer shadow-sm border border-white/20 font-medium transition-all duration-200 hover:shadow-md`}
                      title={`${event.title} - ${new Date(event.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    >
                      {event.title}
                    </motion.div>
                  ))}
                  {dayEvents.length > 2 && (
                    <motion.div
                      className="text-[10px] sm:text-xs text-blue-500 cursor-pointer hover:text-blue-700 font-medium transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowMore(day);
                      }}
                    >
                      +{dayEvents.length - 2} <span className="hidden sm:block">more</span>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}

      </div>
    </div>
  );
};

export default MonthView;
