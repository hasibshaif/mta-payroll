"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Check, X } from "lucide-react";
import { format } from "date-fns";
import InternDashboardHeader from "@/components/DashboardHeader";

interface Request {
  id: string;
  bscid: string;
  date: string; // Converted to string for rendering
  hours: number;
  justification: string;
  approved: boolean;
  pending: boolean;
}

export default function ManagerDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "adjustments"));
      const requestsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          bscid: data.bscid,
          date: format(data.date.toDate(), "MMMM d, yyyy"), // Convert Firestore timestamp to readable date
          hours: data.hours,
          justification: data.justification,
          approved: data.approved,
          pending: data.pending,
        };
      });
      setRequests(requestsData);
    };

    fetchRequests();
  }, []);

  const handleDecision = async (id: string, approved: boolean) => {
    try {
      const requestRef = doc(db, "adjustments", id);
      await updateDoc(requestRef, {
        approved,
        pending: false,
      });

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, approved, pending: false }
            : request
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <InternDashboardHeader heading="Manager Dashboard"/>
      <div className="p-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manager Dashboard</h1>
          </div>
        </div>

        <table className="w-full table-auto text-center border-collapse border-[#0056fa] border-4 shadow-lg p-6">
          <thead>
            <tr className="bg-[#0039a6] text-white">
              <th className="border border-gray-300 px-4 py-2">BSCID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Hours</th>
              <th className="border border-gray-300 px-4 py-2">Reason</th>
              <th className="border border-gray-300 px-4 py-2">Approve/Deny</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="border border-gray-300 px-4 py-2">{request.bscid}</td>
                <td className="border border-gray-300 px-4 py-2">{request.date}</td>
                <td className="border border-gray-300 px-4 py-2">{request.hours}</td>
                <td className="border border-gray-300 px-4 py-2">{request.justification}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.pending ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDecision(request.id, true)}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleDecision(request.id, false)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-lg font-semibold">
                      {request.approved ? "Approved" : "Denied"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
