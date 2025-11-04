import React from "react";
import { motion } from "framer-motion";
import MonthView from "./MonthView";
import type { Event } from "../utils/localStorage";

interface YearViewProps {
  events: Event[];
  currentDate: Date;
  setCurrentDate: (d: Date) => void;
  onEventClick: (event: Event) => void;
  onDateClick: (date: Date) => void;
  onShowMore?: (date: Date) => void;
}

const YearView: React.FC<YearViewProps> = ({ events, currentDate, setCurrentDate, onEventClick, onDateClick, onShowMore }) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(currentDate.getFullYear(), i, 1));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 overflow-y-auto max-h-[70vh] sm:max-h-[80vh]">
      {months.map((month) => (
        <motion.div
          key={month.getMonth()}
         // whileHover={{ scale: 1.02 }}
          onClick={() => setCurrentDate(month)}
          className="border rounded-md hover:shadow-md transition cursor-pointer min-h-[150px] sm:min-h-[250px]"
        >
          <h3 className="text-center font-semibold py-1 sm:py-2 bg-gray-50 border-b text-sm sm:text-base">
            {month.toLocaleDateString("en-US", { month: "long" })}
          </h3>
          <div className="p-1 sm:p-2">
            <MonthView YearView={true} events={events} currentDate={month} compact onEventClick={onEventClick} onDateClick={onDateClick} onShowMore={onShowMore || (() => {})} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default YearView;
