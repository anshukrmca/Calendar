import React from "react";
import { motion } from "framer-motion";
import type { Event } from "../utils/localStorage";

interface WeekViewProps {
  events: Event[];
  currentDate: Date;
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  onShowMore: (date: Date, hour: number) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  events,
  currentDate,
  onEventClick,
  onDateClick,
  onShowMore,
}) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate() + i
    )
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (date: Date, hour: number) =>
    events.filter((event) => {
      const start = new Date(event.start);
      return (
        start.getDate() === date.getDate() &&
        start.getMonth() === date.getMonth() &&
        start.getFullYear() === date.getFullYear() &&
        start.getHours() === hour
      );
    });

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto overflow-x-auto border border-gray-300 rounded-md w-full">
      {/* Ensure consistent width on small screens */}
      <div className="min-w-[900px] sm:min-w-full">
        {/* Header Row */}
        <div className="grid grid-cols-[4rem_repeat(7,1fr)] border-b border-gray-300 bg-gray-50 text-[11px] sm:text-xs font-semibold">
          <div className="p-2 text-right text-gray-500">Time</div>
          {weekDays.map((day) => {
            const today = isToday(day);
            return (
              <div
                key={day.toISOString()}
                className={`p-2 text-center truncate ${
                  today
                    ? "bg-blue-100 text-blue-700 font-bold border-b-2 border-blue-500"
                    : "text-gray-700"
                }`}
              >
                {day.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                })}
              </div>
            );
          })}
        </div>

        {/* Hourly Rows */}
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[4rem_repeat(7,1fr)] border-b border-gray-100 min-h-[70px]"
          >
            {/* Time Column */}
            <div className="p-2 text-[10px] sm:text-xs text-gray-500 text-right whitespace-nowrap border-r border-gray-200">
              {hour === 0
                ? "12 AM"
                : hour < 12
                ? `${hour} AM`
                : hour === 12
                ? "12 PM"
                : `${hour - 12} PM`}
            </div>

            {/* Day Columns */}
            {weekDays.map((date, i) => {
              const today = isToday(date);
              const eventsForHour = getEventsForHour(date, hour);

              return (
                <motion.div
                  key={i}
                  className={`relative p-1 border-r border-gray-200 cursor-pointer transition-colors ${
                    today
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    onDateClick(
                      new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        hour
                      )
                    )
                  }
                >
                  <div className="space-y-1">
                    {eventsForHour.slice(0, 3).map((event) => (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.03 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className={`text-[10px] sm:text-xs p-1 rounded-md text-white font-medium truncate shadow-sm ${event.color} cursor-pointer`}
                        title={`${event.title} - ${event.start.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                      >
                        {event.title}
                      </motion.div>
                    ))}

                    {eventsForHour.length > 3 && (
                      <motion.div
                        className="text-[10px] text-blue-500 cursor-pointer hover:text-blue-700 pt-0.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowMore(date, hour);
                        }}
                      >
                        +{eventsForHour.length - 3} more
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
