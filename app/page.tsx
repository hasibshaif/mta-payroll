"use client";

import ShiningButton from '@/components/ShiningButton';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>MTA Intern Portal</title>
        <meta name="description" content="MTA Payment Adjustment Request Portal for Interns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/background_image_4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col bg-gray-100 bg-opacity-60">
      <Header
          heading="Intern Portal"
          links={[
            { href: "https://new.mta.info/about", label: "About" },
            { href: "https://new.mta.info/contact-us", label: "Contact Us" },
          ]}
        />
        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-6xl">
            <h2 className="text-5xl font-bold text-blue-900 mb-4 drop-shadow-xl">
              Welcome to the MTA Intern Portal
            </h2>
            <p className="text-2xl text-black mb-6 drop-shadow-xl">Track your hours and submit adjustment requests</p>
            <div className="flex justify-center space-x-4">
              <ShiningButton onClick={() => router.push('/auth/login')}>Get Started</ShiningButton>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-[#030c1c] to-[#030f26] text-gray-300 py-2 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Metropolitan Transportation Authority. All rights reserved.
            </p>
            <div className="space-x-4 mt-2">
              <a href="https://new.mta.info/terms-and-conditions" className="hover:underline">
                Terms of Service
              </a>
              <a href="https://new.mta.info/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
