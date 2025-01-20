"use client";

import ShiningButton from '@/components/ShiningButton';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>MTA Employee Portal</title>
        <meta name="description" content="MTA Payment Adjustment Request Portal for Employees" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/background_image_1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(0px)",
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col bg-gray-100 bg-opacity-75">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0039a6] to-[#002366] text-white py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/logos/mta-logo-blue.svg" alt="MTA Logo" width={64} height={64} />
            <h1 className="text-lg font-semibold">MTA Intern Portal</h1>
          </div>
          <nav className="space-x-6">
            <a href="https://new.mta.info/about" className="hover:underline">About</a>
            <a href="https://new.mta.info/contact-us" className="hover:underline">Contact Us</a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Welcome to the MTA Intern Portal
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Track your hours and submit adjustment requests
            </p>
            <div className="flex justify-center space-x-4">
            <ShiningButton
              onClick={() => (window.location.href = '/login')}
            >
              Get Started
            </ShiningButton>
            </div>
          </div>
        </main>

        Footer
        <footer className="bg-gradient-to-r from-[#030c1c] to-[#030f26] text-gray-300 py-2 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm">&copy; {new Date().getFullYear()} Metropolitan Transportation Authority. All rights reserved.</p>
            <div className="space-x-4 mt-2">
              <a href="https://new.mta.info/terms-and-conditions" className="hover:underline">Terms of Service</a>
              <a href="https://new.mta.info/privacy-policy" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
