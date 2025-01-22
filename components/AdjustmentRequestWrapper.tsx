"use client";

import { useSearchParams } from "next/navigation";
import AdjustmentRequest from "@/components/AdjustmentRequest";

export default function AdjustmentRequestWrapper() {
  const searchParams = useSearchParams();
  const bscid = searchParams.get("bscid") || ""; // Get BSCID

  return <AdjustmentRequest bscid={bscid} />;
}
