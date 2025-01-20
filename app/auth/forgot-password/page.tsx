"use client";

import { useState } from "react";
import DotPattern from "@/components/ui/dot-pattern";
import Image from "next/image";

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
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside className="relative lg:col-span-6 h-48 lg:h-auto">
        <Image
          src="/images/background_image_2.png"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
          style={{
            filter: "blur(5px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/[95%]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-black/50 to-transparent text-white">
          <Image
            src="/logos/mta-logo-blue.svg"
            alt="MTA Logo"
            width={80}
            height={80}
            className="mb-2 lg:mb-4"
          />
          <h1 className="text-xl lg:text-4xl font-bold">MTA Intern Portal</h1>
          <p className="text-sm lg:text-lg mt-1 lg:mt-2 max-w-md text-center">
            Welcome to the Metropolitan Transportation Authority Intern Portal. Track your hours, manage requests, and stay connected.
          </p>
        </div>
      </aside>

      <main className="relative flex items-center justify-center bg-gradient-to-r from-black/[95%] via-black via-[2%] to-[#00031f] px-8 py-8 sm:px-12 lg:col-span-6 lg:px-16 lg:py-12">
        <DotPattern className="absolute inset-0 z-10" width={50} height={50} cx={2} cy={2} cr={1} />
        <div className="relative z-20 max-w-2xl w-full bg-[#060036]/20 border-4 border-[#0039a6]/30 text-white p-12 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>
          <form onSubmit={handleReset} className="space-y-6">
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
                className="w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Back to login
            </a>
          </div>
          {message && <p className="mt-6 text-green-500 text-sm">{message}</p>}
        </div>
      </main>
    </div>
  );
}
