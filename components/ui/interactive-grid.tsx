"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function useGridLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ vertical: 0, horizontal: 0 });

  useEffect(() => {
    const updateLayout = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      setLayout({
        vertical: Math.floor(rect.height),
        horizontal: Math.floor(rect.width),
      });
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return {
    layout,
    containerRef,
  };
}

function plotSparseSquares(
  width: number,
  height: number,
  size: number
): { x: number; y: number }[] {
  const squares: { x: number; y: number }[] = [];
  const spacing = size * 1.85; // Increase spacing to reduce density

  for (let x = spacing; x < width - spacing; x += spacing) {
    for (let y = spacing; y < height - spacing; y += spacing) {
      if (Math.random() > 0.7) {
        // Add randomness to sparse grid
        squares.push({ x, y });
      }
    }
  }
  return squares;
}

const size = 28;
const boxClassName = "absolute h-5 w-5 rounded-md bg-transparent p-px group";

function Grid() {
  const {
    layout: { vertical, horizontal },
    containerRef,
  } = useGridLayout();

  const squares = useMemo(
    () => plotSparseSquares(horizontal, vertical, size),
    [horizontal, vertical]
  );

  const cells = useMemo(() => {
    return squares.map(({ x, y }) => (
      <div
        key={`${x}-${y}`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        className={boxClassName}
      >
        <div className="h-full w-full scale-90 rounded bg-[#0039a6]/50 transition-all duration-500 hover:scale-100 hover:bg-[#658edb] hover:rotate-45" />
      </div>
    ));
  }, [squares]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      {cells}
    </div>
  );
}

export default function InteractiveGrid({
  children,
  className,
  contentClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Grid />
      <div className={cn("relative mx-auto h-full w-fit", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
