"use client"

import { useState, useEffect } from 'react';

const AdjustmentRequest = ({
  adjustmentDates,
  bscid,
}: {
  adjustmentDates: string[];
  bscid: string;
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [hours, setHours] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Validate props on component mount
  useEffect(() => {
    if (!adjustmentDates || adjustmentDates.length === 0) {
      setError("No dates available for adjustment");
    } else {
      console.log("Available dates:", adjustmentDates); // Debug log
    }
  }, [adjustmentDates]);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }
    if (!hours || Number(hours) <= 0 || Number(hours) > 24) {
      setError("Please enter valid hours (between 0 and 24)");
      return;
    }
    if (!reason.trim()) {
      setError("Please provide a reason for adjustment");
      return;
    }

    const requestData = {
      bscid,
      date: selectedDate,
      hours: Number(hours),
      reason: reason.trim(),
    };

    try {
      // Log the data being submitted
      console.log("Submitting adjustment request:", requestData);
      
      // Here you would typically make an API call
      // await submitAdjustmentRequest(requestData);
      
      setSuccess(true);
      // Reset form
      setSelectedDate("");
      setHours("");
      setReason("");
    } catch (err) {
      setError("Failed to submit adjustment request. Please try again.");
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-[#0039a6]/10 border-4 border-[#0039a6] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Adjustment Request</h2>
      
      {error && (
        <p>{error}</p>
      )}
      
      {success && (
        <p>success!</p>
      )}

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
            {adjustmentDates?.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hours" className="block text-sm font-medium">
            Hours Worked
          </label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Enter hours worked"
            min="0"
            max="24"
            step="0.5"
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
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default AdjustmentRequest;