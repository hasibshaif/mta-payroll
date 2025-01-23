"use client";
import React from "react";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textColor?: string;
  buttonOverlayColor?: string;
  borderColor?: string;
  iconColor?: string;
  className?: string;
}

export default function DownloadButton({
  text = "Download",
  textColor = "white",
  buttonOverlayColor = "white",
  borderColor = "white",
  iconColor = "#0039a6",
  className,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      style={{ borderColor: borderColor }}
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center w-auto overflow-hidden rounded-full border-2 border-white bg-[#0039a6] px-12 py-4 font-medium shadow-md transition duration-300 ease-out",
        className,
      )}
    >
      <span
        style={{ background: buttonOverlayColor }}
        className={cn(
          "ease absolute inset-0 flex h-full w-full translate-y-full items-center justify-center bg-white text-[#0039a6] duration-300 group-hover:translate-y-0",
        )}
      >
        <Download style={{ color: iconColor }} />
      </span>
      <span
        style={{ color: textColor }}
        className={cn(
          "absolute flex h-full w-full transform items-center justify-center font-bold transition-all duration-300 ease-in-out group-hover:-translate-y-full",
        )}
      >
        {text}
      </span>
      <span className="invisible relative">Download</span>
    </button>
  );
}
