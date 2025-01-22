import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function DashboardHeader({ heading }: { heading: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#0039a6] to-[#002366] text-white px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/logos/mta-logo-blue.svg"
            alt="MTA Logo"
            width={56}
            height={56}
          />
          <h1 className="text-lg font-semibold">{heading}</h1>
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
            <a
              href="/intern/profile"
              className="block px-4 py-2 lg:inline hover:underline"
            >
              Profile
            </a>
            <a
              href="/intern/help"
              className="block px-4 py-2 lg:inline hover:underline"
            >
              Help
            </a>
            <a
              href="/auth/login"
              className="block px-4 py-2 lg:inline hover:underline"
            >
              Logout
            </a>
          </nav>
        </div>
    </header>
  );
}
