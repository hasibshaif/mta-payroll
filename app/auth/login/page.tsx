"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShiningButton from "@/components/ShiningButton";
import DotPattern from "@/components/ui/dot-pattern";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import InteractiveGrid from "@/components/ui/interactive-grid";

const DUMMY_CREDENTIALS = {
  bscid: "1234567",
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
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside className="relative lg:col-span-6 h-48 lg:h-auto">
        <Image
          src="/images/background_image_5.jpg"
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
        <InteractiveGrid className="absolute inset-0 z-10" width={50} height={50} cx={2} cy={2} cr={1} />
        <div className="relative z-20 max-w-2xl w-full bg-black/50 border-4 border-[#0039a6]/30 text-white p-12 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
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
                className="w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <div className="flex items-center text-red-500 text-sm">
                <CircleAlert className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
            <ShiningButton onClick={handleLogin} className="w-full py-3">
              Login
            </ShiningButton>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            <a href="/auth/forgot-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
