"use client";

import { useState } from "react";

export default function AdjustmentRequest({
  adjustmentDates,
  bscid,
}: {
  adjustmentDates: string[]; // Dates needing adjustment
  bscid: string; // Intern BSCID
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [hours, setHours] = useState("");
  const [reason, setReason] = useState("");

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can replace this with a call to an API for submission
    console.log({
      bscid,
      date: selectedDate,
      hours,
      reason,
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-[#0039a6]/10 border-4 border-[#0039a6] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Adjustment Request</h2>
      <form onSubmit={handleRequestSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <select
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a date</option>
            {adjustmentDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hours" className="block text-sm font-medium">
            Hours
          </label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Enter hours worked"
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium">
            Reason for Adjustment
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide a reason for the adjustment"
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
