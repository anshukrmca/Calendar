import React from "react";
import { motion } from "framer-motion";
import type { Event } from "../utils/localStorage";

interface DayViewProps {
  events: Event[];
  currentDate: Date;
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
}

const DayView: React.FC<DayViewProps> = ({ events, currentDate, onEventClick, onDateClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) =>
    events.filter(
      (event) =>
        new Date(event.start).toDateString() === currentDate.toDateString() &&
        new Date(event.start).getHours() === hour
    );

  return (
    <div className="max-h-[80vh] overflow-y-auto overflow-x-auto border border-gray-200 rounded-md w-full min-w-full">
      <div className="min-w-[500px] sm:min-w-0"> {/* Ensures proper layout on mobile */}
        {hours.map((hour) => (
          <div key={hour} className="flex hover:bg-gray-50 transition border-b border-gray-100">
            {/* Time Label */}
            <div className="w-16 text-[10px] sm:text-xs border-r border-gray-200 text-gray-500 text-right px-2 sm:p-3 whitespace-nowrap">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>

            {/* Events Area */}
            <motion.div
              className="flex-1 min-h-[60px] border-l border-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() =>
                onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour))
              }
            >
              <div className="space-y-1 border-t border-gray-200 px-1 sm:px-2 py-1">
                {getEventsForHour(hour).map((event: Event) => (
                  <motion.div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`text-[10px] sm:text-xs p-1 rounded text-black truncate ${event.color} cursor-pointer hover:scale-[1.02] transition-transform duration-150`}
                    title={`${event.title} - ${event.start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  >
                    <div className="truncate">
                      {event.title} – [
                      {`${event.start.toDateString()} ${event.start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                      {" To "}
                      {`${event.end.toDateString()} ${event.end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                      ]
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default DayView;
