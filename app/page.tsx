"use client";

import { useState } from "react";
import ShiningButton from '@/components/ShiningButton';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          backgroundImage: "url(/images/background_image_4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col bg-gray-100 bg-opacity-75">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0039a6] to-[#002366] text-white px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/logos/mta-logo-blue.svg" alt="MTA Logo" width={64} height={64} />
            <h1 className="text-lg font-semibold">MTA Intern Portal</h1>
          </div>
          <div className="relative">
            {/* Hamburger Menu for Mobile */}
            <button
              className="lg:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Navigation Links */}
            <nav
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg lg:flex lg:static lg:bg-transparent lg:text-white lg:shadow-none lg:w-auto lg:space-x-6`}
            >
              <a href="https://new.mta.info/about" className="block px-4 py-2 lg:inline hover:underline">
                About
              </a>
              <a href="https://new.mta.info/contact-us" className="block px-4 py-2 lg:inline hover:underline">
                Contact Us
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Welcome to the MTA Intern Portal
            </h2>
            <p className="text-lg text-gray-700 mb-6">Track your hours and submit adjustment requests</p>
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
