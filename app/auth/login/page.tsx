"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShiningButton from "@/components/ShiningButton";
import DotPattern from "@/components/ui/dot-pattern";
import { CircleAlert } from "lucide-react";

const DUMMY_CREDENTIALS = {
  bscid: "intern123",
  password: "password123",
};

export default function Login() {
  const [bscid, setBscid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (bscid === DUMMY_CREDENTIALS.bscid && password === DUMMY_CREDENTIALS.password) {
      router.push("/dashboard");
    } else {
      setError("Invalid BSC ID or password.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#000000] to-[#000817]">
      {/* Dot Pattern Background */}
      <DotPattern className="absolute inset-0" width={40} height={40} cx={2} cy={2} cr={1} />

      <div className="relative z-10 w-full max-w-md bg-black/30 border-2 border-[#0039a6]/30 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="flex items-center text-red-500 text-sm">
              <CircleAlert className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
          <ShiningButton onClick={handleLogin} className="w-full">
            Login
          </ShiningButton>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <a href="/auth/forgot-password" className="text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
