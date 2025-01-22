"use client";
import { useSearchParams } from "next/navigation";
import AdjustmentRequest from "@/components/AdjustmentRequest";

export default function AdjustmentRequestPage() {
  const searchParams = useSearchParams();
  
  // Add error handling for JSON parsing
  let adjustmentDates: string[] = [];
  try {
    adjustmentDates = JSON.parse(searchParams.get("adjustmentDates") || "[]");
  } catch (e) {
    console.error("Error parsing adjustment dates:", e);
  }
  
  const bscid = searchParams.get("bscid") || "";

  // Debug log
  console.log("Parsed dates:", adjustmentDates);

  return (
    <AdjustmentRequest
      adjustmentDates={adjustmentDates}
      bscid={bscid}
    />
  );
}