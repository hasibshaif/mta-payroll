"use client";

import { useState, useEffect, useMemo } from "react";
import { format, addDays, subDays, parse, differenceInMinutes } from "date-fns";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase"; // Import your Firestore instance
import AlgoliaWhiteButton from "@/components/ui/algolia-white-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ShiningButton from "@/components/ShiningButton";
import { Timestamp } from "firebase/firestore";
import Header from "@/components/Header";
import { Check, X, Clock, MessageCircle } from "lucide-react";
import { BSCID_INTERN, CURRENT_PAY_PERIOD_DATA, LAST_PAY_PERIOD_DATA } from "@/app/constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  hours: number;
  status?: string;
  managerFeedback?: string;
}

interface AdjustmentStatus {
  pending: boolean;
  approved: boolean;
  hours: number;
  managerFeedback?: string;
}

interface AdjustmentMap {
  [key: string]: AdjustmentStatus;
}

const calculateHours = (inTime: string, outTime: string): number => {
  if (!inTime || !outTime) return 0;
  const inDate = parse(inTime, "h:mm a", new Date());
  const outDate = parse(outTime, "h:mm a", new Date());
  const minutes = differenceInMinutes(outDate, inDate);
  return Math.round((minutes / 60) * 100) / 100;
};

const getStartOfPayPeriod = (currentDate: Date): Date => {
  const dayOfWeek = currentDate.getDay();
  const daysSinceSaturday = (dayOfWeek + 1) % 7;
  return subDays(currentDate, daysSinceSaturday);
};

const getBiweeklyDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 14; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

const populateDummyData = (
  dates: Date[],
  isCurrentPeriod: boolean
): TimeEntry[] => {
  const dummyData = isCurrentPeriod ? CURRENT_PAY_PERIOD_DATA : LAST_PAY_PERIOD_DATA;

  return dates.map((date, index) => ({
    date: format(date, "MMMM d, yyyy"),
    in: dummyData[index]?.in || "",
    out: dummyData[index]?.out || "",
    adjustment: dummyData[index]?.adjustment || "",
    hours: calculateHours(
      dummyData[index]?.in || "",
      dummyData[index]?.out || ""
    ),
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
  const BSCID = BSCID_INTERN;

  const currentDate = useMemo(() => new Date(), []);
  const payPeriodStart = format(
    addDays(getStartOfPayPeriod(currentDate), offset * 14),
    "MMMM d, yyyy"
  );
  const payPeriodEnd = format(
    addDays(getStartOfPayPeriod(currentDate), offset * 14 + 13),
    "MMMM d, yyyy"
  );

  useEffect(() => {
    const initialData = getPayPeriodData(currentDate, offset);
    setPayPeriodData(initialData);

    const q = query(collection(db, "adjustments"), where("bscid", "==", BSCID));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const adjustments: AdjustmentMap = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const dateStr = format(data.date.toDate(), "MMMM d, yyyy");
        adjustments[dateStr] = {
          pending: data.pending,
          approved: data.approved,
          hours: data.hours,
          managerFeedback: data.managerFeedback || "", // Ensure feedback is included
        };
      });

      setPayPeriodData((prevData) =>
        prevData.map((entry) => {
          const adjustment = adjustments[entry.date];
          if (adjustment) {
            return {
              ...entry,
              status: adjustment.pending
                ? "Pending"
                : adjustment.approved
                ? "Approved"
                : "Denied",
              hours: adjustment.approved ? adjustment.hours : entry.hours,
              managerFeedback: adjustment.managerFeedback || "",
            };
          }
          return entry;
        })
      );
    });

    return () => unsubscribe();
  }, [offset, BSCID, currentDate]);

  const handleRequestAdjustments = () => {
    const adjustmentDates = payPeriodData
      .filter(
        (row) =>
          row.adjustment === "Yes" && (!row.status || row.status === "Denied")
      )
      .map((row) => row.date);

    const queryParams = new URLSearchParams({
      adjustmentDates: JSON.stringify(adjustmentDates),
      bscid: BSCID,
    });

    router.push(`/intern/adjustment-request?${queryParams.toString()}`);
  };

  return (
    <div className="bg-gradient-to-br from-[#1c1d1f] to-[#101b30] text-white min-h-screen">
      <Header
        heading="Intern Dashboard"
        links={[
          { href: "/intern/profile", label: "Profile" },
          { href: "/intern/help", label: "Help" },
          { href: "/auth/login", label: "Logout" },
        ]}
      />
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
              <AlgoliaWhiteButton
                onClick={() => setOffset((prev) => Math.min(prev + 1, 0))}
                disabled={offset === 0}
              >
                <ChevronRight size={24} />
              </AlgoliaWhiteButton>
            </div>
            <div>
              <ShiningButton onClick={handleRequestAdjustments}>
                Request Adjustments
              </ShiningButton>
            </div>
          </div>
          <div className="font-bold mb-2 flex text-xl justify-start">
            BSCID: <span className="italic ml-1">{BSCID}</span>
          </div>
        </div>

        <table className="w-full table-auto text-center border-collapse border-[#0039a6] shadow-lg">
          <thead>
            <tr className="bg-[#0039a6] text-white text-xl">
              <th className="border-2 border-[#387cff] px-4 py-2">Date</th>
              <th className="border-2 border-[#387cff] px-4 py-2">In</th>
              <th className="border-2 border-[#387cff] px-4 py-2">Out</th>
              <th className="border-2 border-[#387cff] px-4 py-2">
                Needs Adjustment?
              </th>
              <th className="border-2 border-[#387cff] px-4 py-2">Hours</th>
              <th className="border-2 border-[#387cff] px-4 py-2">
                Adjustment Request Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payPeriodData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#283245]" : "bg-[#1b2230]"
                } hover:bg-[#2f4775]`}
              >
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">
                  {row.date}
                </td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">
                  {row.in}
                </td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">
                  {row.out}
                </td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">
                  {row.adjustment}
                </td>
                <td className="border-2 border-[#387cff] px-4 py-2 text-lg">
                  {row.hours}
                </td>
                <td className="border-2 border-[#387cff] px-4 py-2">
                  {row.status === "Pending" && (
                    <div
                      className="flex justify-center items-center text-yellow-200 gap-2 text-lg"
                      title="Pending"
                    >
                      <Clock className="h-6 w-6" />
                      <span>Pending</span>
                    </div>
                  )}
                  {row.status === "Approved" && (
                    <div
                      className="flex justify-center items-center text-green-300 gap-2 text-lg"
                      title="Approved"
                    >
                      <Check className="h-6 w-6" />
                      <span>Approved</span>
                    </div>
                  )}
                  {row.status === "Denied" && (
                    <div
                      className="flex justify-center text-red-300 items-center gap-2 text-lg"
                      title="Denied"
                    >
                      <X className="h-6 w-6" />
                      <span>Denied</span>
                    </div>
                  )}
                  {!row.status && (
                    <span title="Not Applicable" className="text-lg">
                      N/A
                    </span>
                  )}
                  {row.status === "Denied" && row.managerFeedback && (
                    <div
                      className="flex justify-center align-center text-red-200 items-center gap-1"
                      title="Feedback"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Feedback:</span>
                      <span>{row.managerFeedback}</span>
                    </div>
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
