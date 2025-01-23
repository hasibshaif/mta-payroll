"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface Link {
  href: string;
  label: string;
}

interface DashboardHeaderProps {
  heading: string;
  links: Link[]; // Array of links
}

export default function Header({ heading, links }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-gradient-to-r from-[#0039a6] to-[#002366] text-white px-20 py-2 flex justify-between items-center rounded-b-full">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.push("/")}>
          <Image
            src="/logos/mta-logo-blue.svg"
            alt="MTA Logo"
            width={56}
            height={56}
          />
        </button>
        <h1 className="text-2xl font-semibold">{heading}</h1>
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
          } absolute right-0 mt-2 w-40 bg-white text-black text-xl shadow-lg rounded-lg lg:flex lg:static lg:bg-transparent lg:text-white lg:shadow-none lg:w-auto lg:space-x-6`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-2 lg:inline hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
