"use client";

import { Suspense } from "react";
import AdjustmentRequestWrapper from "@/components/AdjustmentRequestWrapper";

export default function AdjustmentRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdjustmentRequestWrapper />
    </Suspense>
  );
}
