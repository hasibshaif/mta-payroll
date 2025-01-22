"use client";

import { useSearchParams } from "next/navigation";
import AdjustmentRequest from "@/components/AdjustmentRequest";

export default function AdjustmentRequestPage() {
  const searchParams = useSearchParams();
  const bscid = searchParams.get("bscid") || ""; // Get BSCID

  return (
    <AdjustmentRequest bscid={bscid} />
  );
}
