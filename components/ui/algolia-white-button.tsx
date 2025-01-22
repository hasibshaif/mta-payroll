import React from "react";

export default function AlgoliaWhiteButton({
  onClick,
  disabled,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded border-0 bg-[#0039a6] px-4 font-mono leading-none text-white no-underline shadow-[#0039a6] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[#0047cf] focus:shadow-[#D6D6E7_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#D6D6E7_0_3px_7px_inset] ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[#0047cf] active:bg-[#0047cf]"
      }`}
      role="button"
    >
      {children}
    </button>
  );
}
