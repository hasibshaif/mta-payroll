"use client";

import { useState, useEffect } from "react";
import { format, addDays, subDays, parse, differenceInMinutes } from "date-fns";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase"; // Import your Firestore instance
import InternDashboardHeader from "@/components/DashboardHeader";
import AlgoliaWhiteButton from "@/components/ui/algolia-white-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ShiningButton from "@/components/ShiningButton";
import { Timestamp } from 'firebase/firestore';

interface Adjustment {
  date: Timestamp;
  pending: boolean;
  approved: boolean;
  hours: number;
}

interface TimeEntry {
  date: string;
  in: string;
  out: string;
  adjustment: string;
  hours: number; // Reflects adjusted hours if approved
  status?: string; // New field for adjustment status
}

const calculateHours = (inTime: string, outTime: string) => {
  if (!inTime || !outTime) return 0;

  const inDate = parse(inTime, "h:mm a", new Date());
  const outDate = parse(outTime, "h:mm a", new Date());

  const minutes = differenceInMinutes(outDate, inDate);
  return Math.round((minutes / 60) * 100) / 100;
};

const getStartOfPayPeriod = (currentDate: Date) => {
  const dayOfWeek = currentDate.getDay();
  const offset = dayOfWeek >= 4 ? dayOfWeek - 4 : dayOfWeek + 3;
  return subDays(currentDate, offset);
};

const getBiweeklyDates = (startDate: Date) => {
  const dates = [];
  for (let i = 0; i < 14; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

const populateDummyData = (dates: Date[], isCurrentPeriod: boolean): TimeEntry[] => {
  const lastPayPeriodData = [
    { in: "8:57 AM", out: "5:03 PM", adjustment: "No" },
    { in: "9:12 AM", out: "5:17 PM", adjustment: "No" },
    { in: "10:01 AM", out: "6:04 PM", adjustment: "No" },
    { in: "9:08 AM", out: "4:58 PM", adjustment: "No" },
    { in: "9:26 AM", out: "5:25 PM", adjustment: "No" },
    { in: "10:14 AM", out: "6:09 PM", adjustment: "No" },
    { in: "9:05 AM", out: "5:02 PM", adjustment: "No" },
    { in: "9:34 AM", out: "5:38 PM", adjustment: "No" },
    { in: "10:08 AM", out: "6:12 PM", adjustment: "No" },
    { in: "8:53 AM", out: "5:06 PM", adjustment: "No" },
    { in: "9:18 AM", out: "5:23 PM", adjustment: "No" },
    { in: "10:06 AM", out: "6:11 PM", adjustment: "No" },
    { in: "8:59 AM", out: "4:56 PM", adjustment: "No" },
    { in: "9:21 AM", out: "5:35 PM", adjustment: "No" },
  ];

  const currentPayPeriodData = [
    { in: "9:02 AM", out: "5:07 PM", adjustment: "No" },
    { in: "", out: "", adjustment: "Yes" },
    { in: "10:05 AM", out: "6:08 PM", adjustment: "No" },
    { in: "9:12 AM", out: "5:14 PM", adjustment: "No" },
    { in: "", out: "", adjustment: "Yes" },
    { in: "10:10 AM", out: "6:15 PM", adjustment: "No" },
    { in: "9:07 AM", out: "5:01 PM", adjustment: "No" },
    { in: "", out: "", adjustment: "Yes" },
    { in: "10:09 AM", out: "6:13 PM", adjustment: "No" },
  ];

  const dummyData = isCurrentPeriod ? currentPayPeriodData : lastPayPeriodData;

  return dates.map((date, index) => ({
    date: format(date, "MMMM d, yyyy"),
    in: dummyData[index]?.in || "",
    out: dummyData[index]?.out || "",
    adjustment: dummyData[index]?.adjustment || "",
    hours: calculateHours(dummyData[index]?.in || "", dummyData[index]?.out || ""),
  }));
};

const getPayPeriodData = (currentDate: Date, offset: number): TimeEntry[] => {
  const startOfCurrentPayPeriod = getStartOfPayPeriod(currentDate);
  const startOfTargetPayPeriod = addDays(startOfCurrentPayPeriod, offset * 14);
  const dates = getBiweeklyDates(startOfTargetPayPeriod);

  return populateDummyData(dates, offset === 0);
};

export default function InternDashboard() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [payPeriodData, setPayPeriodData] = useState<TimeEntry[]>([]);
  const BSCID = "1234567"; // Mock BSCID

  const currentDate = new Date();
  const payPeriodStart = format(addDays(getStartOfPayPeriod(currentDate), offset * 14), "MMMM d, yyyy");
  const payPeriodEnd = format(addDays(getStartOfPayPeriod(currentDate), offset * 14 + 13), "MMMM d, yyyy");

  useEffect(() => {
    const data = getPayPeriodData(currentDate, offset);
    setPayPeriodData(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    const q = query(collection(db, "adjustments"), where("bscid", "==", BSCID));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const adjustments = snapshot.docs.map((doc) => {
        const data = doc.data() as Adjustment;
        return {
          date: format(data.date.toDate(), "MMMM d, yyyy"),
          pending: data.pending,
          approved: data.approved,
          hours: data.hours,
        };
      });

      setPayPeriodData((prevData) =>
        prevData.map((entry) => {
          const matchingAdjustment = adjustments.find((adj) => adj.date === entry.date);
          if (matchingAdjustment) {
            return {
              ...entry,
              status: matchingAdjustment.pending
                ? "Pending"
                : matchingAdjustment.approved
                ? "Approved"
                : "Denied",
              hours: matchingAdjustment.approved ? matchingAdjustment.hours : entry.hours,
            };
          }
          return entry;
        })
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <InternDashboardHeader heading="Intern Dashboard" />
      <div className="p-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 justify-center items-center">
              <AlgoliaWhiteButton onClick={() => setOffset((prev) => prev - 1)}>
                <ChevronLeft size={24} />
              </AlgoliaWhiteButton>
              <h1 className="text-2xl font-bold">
                Payroll Period: {`${payPeriodStart} - ${payPeriodEnd}`}
              </h1>
              <AlgoliaWhiteButton onClick={() => setOffset((prev) => Math.min(prev + 1, 0))} disabled={offset === 0}>
                <ChevronRight size={24} />
              </AlgoliaWhiteButton>
            </div>
            <div>
              <ShiningButton
                onClick={() => {
                  const adjustmentDates = payPeriodData
                    .filter((row) => row.adjustment === "Yes")
                    .map((row) => row.date);

                  const queryParams = new URLSearchParams({
                    adjustmentDates: JSON.stringify(adjustmentDates),
                    bscid: BSCID,
                  });

                  router.push(`/intern/adjustment-request?${queryParams.toString()}`);
                }}
              >
                Request Adjustments
              </ShiningButton>
            </div>
          </div>
          <div className="font-bold mb-2 flex justify-start text-white">
            BSCID: <span className="italic">{BSCID}</span>
          </div>
        </div>

        <table className="w-full table-auto text-center border-collapse border-[#0056fa] border-4 shadow-lg p-6">
          <thead>
            <tr className="bg-[#0039a6] text-white">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">In</th>
              <th className="border border-gray-300 px-4 py-2">Out</th>
              <th className="border border-gray-300 px-4 py-2">Adjustment</th>
              <th className="border border-gray-300 px-4 py-2">Hours</th>
              <th className="border border-gray-300 px-4 py-2">Adjustment Request Status</th>
            </tr>
          </thead>
          <tbody>
            {payPeriodData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                <td className="border border-gray-300 px-4 py-2">{row.in}</td>
                <td className="border border-gray-300 px-4 py-2">{row.out}</td>
                <td className="border border-gray-300 px-4 py-2">{row.adjustment}</td>
                <td className="border border-gray-300 px-4 py-2">{row.hours}</td>
                <td className="border border-gray-300 px-4 py-2">{row.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
