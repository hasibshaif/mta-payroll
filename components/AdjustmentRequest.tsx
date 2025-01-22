"use client";

import { useState } from "react";
import { db } from '@/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdjustmentRequest({
  bscid,
}: {
  bscid: string; // Intern BSCID
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adjustmentDates = JSON.parse(searchParams.get("adjustmentDates") || "[]"); // Get adjustment dates from query params

  const [selectedDate, setSelectedDate] = useState("");
  const [hours, setHours] = useState("");
  const [reason, setReason] = useState("");

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "adjustments"), {
        bscid: bscid,
        date: selectedDate,
        hours: hours,
        justification: reason,
        pending: true,
        approved: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    router.push('/intern/dashboard');
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-[#0039a6]/10 border-4 border-[#0039a6] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Adjustment Request</h2>
      <form onSubmit={handleRequestSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Select Date for Adjustment
          </label>
          <select
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a date
            </option>
            {adjustmentDates.map((date: string) => (
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
          disabled={!selectedDate || !hours || !reason}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
