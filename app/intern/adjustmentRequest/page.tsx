"use client";

import { useSearchParams } from "next/navigation";
import AdjustmentRequest from "@/components/AdjustmentRequest";

export default function AdjustmentRequestPage() {
  const searchParams = useSearchParams();
  const adjustmentDates = JSON.parse(searchParams.get("adjustmentDates") || "[]"); // Parse adjustment dates
  const bscid = searchParams.get("bscid") || ""; // Get BSCID

  return (
    <AdjustmentRequest
      adjustmentDates={adjustmentDates}
      bscid={bscid}
    />
  );
}
