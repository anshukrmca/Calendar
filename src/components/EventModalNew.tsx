import React, { useState } from "react";
import { saveEvent } from "../utils/localStorage";

const EventModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("work");

  const handleSubmit = () => {
    if (!title || !start || !end) return alert("Please fill all fields!");
    saveEvent({
      id: Date.now().toString(),
      title,
      start,
      end,
      type,
      color:
        type === "work"
          ? "bg-blue-500"
          : type === "personal"
          ? "bg-pink-500"
          : type === "meeting"
          ? "bg-green-500"
          : type === "reminder"
          ? "bg-yellow-500"
          : "bg-gray-400",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 space-y-3">
        <h2 className="text-lg font-semibold">Add Event</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} className="w-full p-2 border rounded" />
        <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full p-2 border rounded" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="meeting">Meeting</option>
          <option value="reminder">Reminder</option>
          <option value="other">Other</option>
        </select>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
