"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { CircleCheck, CircleX, X, Check, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import DownloadButton from "@/components/ui/download-button";
import SubmitButton from "@/components/ui/submit-button";

interface Request {
  id: string;
  bscid: string;
  date: string; // Converted to string for rendering
  hours: number;
  justification: string;
  approved: boolean;
  pending: boolean;
  managerFeedback?: string;
}

export default function ManagerDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [denyingRequestId, setDenyingRequestId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const BSCID = "7654321";

  // Fetch requests from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "adjustments"));
      const requestsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          bscid: data.bscid,
          date: data.date?.toDate
            ? format(data.date.toDate(), "MMMM d, yyyy") // Handle Firestore Timestamp
            : data.date, // Fallback for string date
          hours: data.hours,
          justification: data.justification,
          approved: data.approved,
          pending: data.pending,
          managerFeedback: data.managerFeedback || "",
        };
      });
      setRequests(requestsData);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const requestRef = doc(db, "adjustments", id);
      await updateDoc(requestRef, {
        approved: true,
        pending: false,
      });

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, approved: true, pending: false } : request
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeny = async (id: string) => {
    if (!feedback) {
      alert("Please provide feedback before denying the request.");
      return;
    }

    try {
      const requestRef = doc(db, "adjustments", id);
      await updateDoc(requestRef, {
        approved: false,
        pending: false,
        managerFeedback: feedback,
      });

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, approved: false, pending: false, managerFeedback: feedback }
            : request
        )
      );

      setDenyingRequestId(null); // Reset the denying state
      setFeedback(""); // Clear feedback
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1c1d1f] to-[#101b30] text-white min-h-screen">
      <Header
        heading="Manager Dashboard"
        links={[
          { href: "/manager/profile", label: "Profile" },
          { href: "/manager/help", label: "Help" },
          { href: "/auth/login", label: "Logout" },
        ]}
      />
      <div className="p-8">
        <div className="flex flex-col gap-2">
          <div className="font-bold mb-2 flex text-xl justify-start">
            BSCID: <span className="italic ml-1">{BSCID}</span>
          </div>
        </div>

        <table className="w-full table-auto text-center border-collapse border-[#0039a6] shadow-lg">
          <thead>
            <tr className="bg-[#0039a6] text-white text-xl">
              <th className="border-2 border-[#387cff] px-4 py-2">BSCID</th>
              <th className="border-2 border-[#387cff] px-4 py-2">Date</th>
              <th className="border-2 border-[#387cff] px-4 py-2">Hours</th>
              <th className="border-2 border-[#387cff] px-4 py-2">Reason</th>
              <th className="border-2 border-[#387cff] px-4 py-2">Approve/Deny</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={`${
                  index % 2 === 0 ? "bg-[#283245]" : "bg-[#1b2230]"
                } hover:bg-[#2f4775]`}
              >
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">{request.bscid}</td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">{request.date}</td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">{request.hours}</td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">{request.justification}</td>
                <td className="border-2 border-[#387cff] px-4 py-2">
                  {request.pending ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="p-2 bg-green-400 text-black rounded hover:bg-green-600 hover:text-white transition-all duration-500 ease-in-out"
                          title="Approve Request"
                        >
                          <CircleCheck size={28} />
                        </button>
                        <button
                          onClick={() => setDenyingRequestId(request.id)}
                          className="p-2 bg-red-400 text-black rounded hover:bg-red-600 hover:text-white transition-all duration-500 ease-in-out"
                          title="Deny Request"
                        >
                          <CircleX size={28} />
                        </button>
                      </div>
                      {denyingRequestId === request.id && (
                        <>
                          <textarea
                            placeholder="Provide feedback for denial"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="mt-2 w-auto border-2 border-white text-black bg-blue-300 rounded-md p-2 placeholder:text-gray-500"
                          ></textarea>
                          <SubmitButton
                            onClick={() => handleDeny(request.id)}
                            className="mt-1 px-4 py-2"
                          >
                            Submit Feedback
                          </SubmitButton>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      {request.approved ? (
                        <div className="flex items-center justify-center text-green-300 gap-2 text-lg" title="Approved">
                          <Check className="h-6 w-6" />
                          <span>Approved</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-red-300 gap-2 text-lg" title="Denied">
                          <X className="h-6 w-6" />
                          <span>Denied</span>
                        </div>
                      )}
                      {request.managerFeedback && (
                        <div className="flex items-center justify-center text-red-200 gap-2 mt-1" title="Feedback">
                          <MessageCircle className="h-4 w-4" />
                          <span>{request.managerFeedback}</span>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <DownloadButton text="Export as .xlsx file" />
        </div>
      </div>
    </div>
  );
}
