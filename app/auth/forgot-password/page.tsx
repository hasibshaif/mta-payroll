"use client";

import { useState } from "react";
import DotPattern from "@/components/ui/dot-pattern";

export default function ForgotPassword() {
  const [bscid, setBscid] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate password reset
    setMessage(
      "If this BSC ID exists, a password reset link will be sent to your email."
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#000000] to-[#000817]">
      {/* Dot Pattern Background */}
      <DotPattern className="absolute inset-0" width={40} height={40} cx={2} cy={2} cr={1} />

      <div className="relative z-10 w-full max-w-md bg-black/30 border-2 border-[#0039a6]/30 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label htmlFor="bscid" className="block text-sm font-medium">
              BSC ID
            </label>
            <input
              type="text"
              id="bscid"
              value={bscid}
              onChange={(e) => setBscid(e.target.value)}
              placeholder="Enter your BSC ID"
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}
