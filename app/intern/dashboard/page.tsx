"use client";

import { useState } from "react";
import { format, subDays, addDays, parse, differenceInMinutes } from "date-fns";
import InternDashboardHeader from "@/components/DashboardHeader";
import AlgoliaWhiteButton from "@/components/ui/algolia-white-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation';

const getBiweeklyDates = (startDate: Date) => {
  const dates = [];
  for (let i = 0; i < 14; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

const calculateHours = (inTime: string, outTime: string) => {
    if (!inTime || !outTime) return 0;
  
    const inDate = parse(inTime, "h:mm a", new Date());
    const outDate = parse(outTime, "h:mm a", new Date());
  
    const minutes = differenceInMinutes(outDate, inDate);
    return Math.round((minutes / 60) * 100) / 100;
  };

const hardcodedFieldData = {
    lastPayPeriod: [
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
    ].map(entry => ({
      ...entry,
      hours: calculateHours(entry.in, entry.out),
    })),
    currentPayPeriod: [
      { in: "9:02 AM", out: "5:07 PM", adjustment: "No" },
      { in: "", out: "", adjustment: "Yes" },
      { in: "10:05 AM", out: "6:08 PM", adjustment: "No" },
      { in: "9:12 AM", out: "5:14 PM", adjustment: "No" },
      { in: "", out: "", adjustment: "Yes" },
      { in: "10:10 AM", out: "6:15 PM", adjustment: "No" },
      { in: "9:07 AM", out: "5:01 PM", adjustment: "No" },
      { in: "", out: "", adjustment: "Yes" },
      { in: "10:09 AM", out: "6:13 PM", adjustment: "No" },
      { in: "9:03 AM", out: "5:05 PM", adjustment: "No" },
      { in: "9:27 AM", out: "5:31 PM", adjustment: "No" },
      { in: "10:11 AM", out: "6:18 PM", adjustment: "No" },
      { in: "8:58 AM", out: "4:59 PM", adjustment: "No" },
      { in: "9:22 AM", out: "5:33 PM", adjustment: "No" },
    ].map(entry => ({
      ...entry,
      hours: calculateHours(entry.in, entry.out),
    })),
  };

  const getPayPeriodData = (startDate: Date, offset: number) => {
    const dates = getBiweeklyDates(startDate);
  
    if (offset === -1) {
      return dates.map((date, index) => ({
        date: format(date, "MMMM d, yyyy"),
        ...hardcodedFieldData.lastPayPeriod[index],
      }));
    } else if (offset === 0) {
      return dates.map((date, index) => {
        const today = new Date();
        const isPastOrToday = date <= today;
  
        return {
          date: format(date, "MMMM d, yyyy"),
          ...(isPastOrToday ? hardcodedFieldData.currentPayPeriod[index] : { in: "", out: "", adjustment: "", hours: "" }),
        };
      });
    }
  
    return dates.map((date) => ({
      date: format(date, "MMMM d, yyyy"),
      in: "",
      out: "",
      adjustment: "",
      hours: "",
    }));
  };

export default function InternDashboard() {
    const router = useRouter();
    const [offset, setOffset] = useState(0);
    const startDate = subDays(new Date(), 14 * Math.abs(offset));
    const payPeriodData = getPayPeriodData(startDate, offset);

    const handlePreviousPeriod = () => setOffset((prev) => prev - 1);
    const handleNextPeriod = () => setOffset((prev) => Math.min(prev + 1, 0));

    return (
    <div>
        <InternDashboardHeader />
        <div className="p-8">
        <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-center items-center">
                <AlgoliaWhiteButton onClick={handlePreviousPeriod}>
                    <ChevronLeft size={24} />
                </AlgoliaWhiteButton>
                <h1 className="text-2xl font-bold text-blue-900">
                    Payroll Period: {`${format(startDate, "MMMM d, yyyy")} - ${format(
                        addDays(startDate, 13),
                        "MMMM d, yyyy"
                    )}`}
                </h1>
                <AlgoliaWhiteButton onClick={handleNextPeriod} disabled={offset === 0}>
                    <ChevronRight size={24} />
                </AlgoliaWhiteButton>
            </div>
            <div className="font-bold mb-2 flex justify-center">
                BSCID: <span className="italic">1234567</span>
            </div>
        </div>

        <table className="w-full table-auto text-center border-collapse border border-[#0039a6] border-4 shadow-lg p-6">
        <thead>
            <tr className="bg-[#0039a6] text-white">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">In</th>
            <th className="border border-gray-300 px-4 py-2">Out</th>
            <th className="border border-gray-300 px-4 py-2">Adjustment</th>
            <th className="border border-gray-300 px-4 py-2">Hours</th>
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
                <td className="border border-gray-300 px-4 py-2">
                {row.adjustment}
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.hours}</td>
            </tr>
            ))}
        </tbody>
        </table>
        <button onClick={() => router.push('/auth/login')}/>
        </div>
    </div>
  );
}
