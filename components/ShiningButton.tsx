import { ArrowRight } from "lucide-react";

export default function ShiningButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border-4 border-[#0039a6] border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100 ${className}`}
    >
      <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-[#0039a6] px-6 py-4 font-bold text-xl text-white">
        {children}
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className="absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
        />
      </div>
    </button>
  );
}
