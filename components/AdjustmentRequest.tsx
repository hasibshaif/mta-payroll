"use client";

import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";

export default function AdjustmentRequest({
  bscid,
}: {
  bscid: string; // Intern BSCID
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adjustmentDates = JSON.parse(
    searchParams.get("adjustmentDates") || "[]"
  ); // Get adjustment dates from query params

  const [selectedDate, setSelectedDate] = useState("");
  const [hours, setHours] = useState("");
  const [reason, setReason] = useState("");

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "adjustments"), {
        bscid: bscid,
        date: Timestamp.fromDate(new Date(selectedDate)),
        hours: parseFloat(hours),
        justification: reason,
        pending: true,
        approved: false,
        managerFeedback: "",
      });
      router.push("/intern/dashboard");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1c1d1f] to-[#101b30] text-white min-h-screen">
      <Header
        heading="Adjustment Request"
        links={[
          { href: "/intern/profile", label: "Profile" },
          { href: "/intern/help", label: "Help" },
          { href: "/auth/login", label: "Logout" },
        ]}
      />
      <div className="p-8 flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-left text-white">
          Submit an Adjustment Request
        </h2>
        <div className="w-full max-w-2xl bg-[#283245] border border-[#0039a6] rounded-lg shadow-lg p-6">
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="date"
                className="block text-lg font-medium text-white mb-1"
              >
                Select Date
              </label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#1b2230] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a date
                </option>
                {adjustmentDates.map((date: string) => (
                  <option key={date} value={date} className="text-gray-200">
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="hours"
                className="block text-lg font-medium text-white mb-1"
              >
                Hours
              </label>
              <input
                type="number"
                id="hours"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter hours worked"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#1b2230] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-lg font-medium text-white mb-1"
              >
                Reason for Adjustment
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide a reason for the adjustment"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#1b2230] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-lg font-semibold text-white bg-blue-900 hover:bg-blue-800 ${
                !selectedDate || !hours || !reason
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!selectedDate || !hours || !reason}
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
