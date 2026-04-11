"use client";

import { useEffect, useRef, useState } from "react";
import { useGameState } from "@/lib/gameState";

export default function PointsCounter() {
  const { state } = useGameState();
  const [display, setDisplay] = useState(0);
  const [flash, setFlash] = useState(false);
  const prevRef = useRef(state.totalPoints);

  useEffect(() => {
    const target = state.totalPoints;
    if (target === prevRef.current) return;

    // Flash green on increase
    if (target > prevRef.current) {
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
    }

    // Animate count
    const start = prevRef.current;
    const diff = target - start;
    const duration = Math.min(600, Math.abs(diff) * 2);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    prevRef.current = target;
  }, [state.totalPoints]);

  // Init display
  useEffect(() => {
    setDisplay(state.totalPoints);
    prevRef.current = state.totalPoints;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed top-3 right-3 z-50 flex items-center gap-1 px-3 py-1.5 rounded-full bg-mw-navy/90 border border-mw-gold/50 backdrop-blur-sm transition-all duration-300 ${
        flash ? "border-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)]" : ""
      }`}
    >
      <span className="text-mw-gold text-sm">🏆</span>
      <span
        className={`font-display text-sm font-bold transition-colors duration-300 ${
          flash ? "text-green-400" : "text-mw-gold"
        }`}
      >
        {display.toLocaleString()}
      </span>
    </div>
  );
}
