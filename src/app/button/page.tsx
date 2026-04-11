"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGameState,
  awardPoints,
  recordClick,
} from "@/lib/gameState";
import { pickRandomEvent, MidwestEvent } from "@/lib/events";
import { soundManager } from "@/lib/audio";
import {
  fireRareConfetti,
  fireLegendaryConfetti,
} from "@/lib/confetti";

interface FloatingPts {
  id: number;
  x: number;
  y: number;
  pts: number;
}

const RARITY_COLORS: Record<string, string> = {
  common: "text-mw-cream",
  uncommon: "text-green-400",
  rare: "text-blue-400",
  legendary: "text-mw-gold",
};

const RARITY_LABELS: Record<string, string> = {
  common: "COMMON",
  uncommon: "UNCOMMON",
  rare: "RARE",
  legendary: "LEGENDARY",
};

const SHAKE_VARIANTS = {
  idle: { x: 0, y: 0 },
  light: {
    x: [0, -3, 3, -2, 2, 0],
    transition: { duration: 0.3 },
  },
  medium: {
    x: [0, -6, 6, -4, 4, -2, 0],
    transition: { duration: 0.4 },
  },
  heavy: {
    x: [0, -10, 10, -8, 8, -4, 4, 0],
    transition: { duration: 0.5 },
  },
};

export default function ButtonPage() {
  const { state, updateState } = useGameState();
  const [shaking, setShaking] = useState<"idle" | "light" | "medium" | "heavy">("idle");
  const [currentEvent, setCurrentEvent] = useState<MidwestEvent | null>(null);
  const [showEvent, setShowEvent] = useState(false);
  const [floaters, setFloaters] = useState<FloatingPts[]>([]);
  const [sessionPts, setSessionPts] = useState(0);
  const floaterIdRef = useRef(0);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Pick event
      const event = pickRandomEvent(state.lastEventId);

      // Sound
      soundManager.play("click");

      // Screen shake
      setShaking(event.shakeIntensity);
      setTimeout(() => setShaking("idle"), 600);

      // Update state
      updateState((s) => {
        let next = recordClick(s, event.id, event.text, event.category, event.rarity);
        next = awardPoints(next, event.points);
        return next;
      });

      // Session points
      setSessionPts((p) => p + event.points);

      // Floating points
      const id = ++floaterIdRef.current;
      setFloaters((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, pts: event.points },
      ]);
      setTimeout(() => {
        setFloaters((prev) => prev.filter((f) => f.id !== id));
      }, 1600);

      // Show event popup
      setCurrentEvent(event);
      setShowEvent(true);

      // Sound based on rarity (delayed)
      setTimeout(() => {
        if (event.rarity === "legendary") {
          soundManager.play("legendary");
        } else if (event.rarity === "rare") {
          soundManager.play("points-rare");
        } else if (event.rarity === "uncommon") {
          soundManager.play("points-uncommon");
        } else {
          soundManager.play("points-common");
        }
      }, 120);

      // Confetti
      if (event.rarity === "legendary") {
        fireLegendaryConfetti();
      } else if (event.rarity === "rare" || event.triggerConfetti) {
        fireRareConfetti();
      }

      // Auto-dismiss popup
      setTimeout(() => setShowEvent(false), 3200);
    },
    [state.lastEventId, updateState]
  );

  const nextAchievementClick =
    state.totalClicks < 1
      ? 1
      : state.totalClicks < 10
      ? 10
      : state.totalClicks < 50
      ? 50
      : state.totalClicks < 200
      ? 200
      : null;

  const clickProgress = nextAchievementClick
    ? Math.min(state.totalClicks / nextAchievementClick, 1)
    : 1;

  return (
    <motion.div
      animate={SHAKE_VARIANTS[shaking]}
      className="flex flex-col items-center min-h-screen px-4 pt-16 pb-24 select-none"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <div className="font-display text-xs tracking-widest text-mw-cream/50 mb-1">
          SESSION POINTS
        </div>
        <div className="font-display text-3xl font-bold text-mw-gold">
          +{sessionPts.toLocaleString()}
        </div>
      </motion.div>

      {/* The Button */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="btn-glow relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-mw-red border-4 border-mw-gold flex flex-col items-center justify-center cursor-pointer will-change-transform overflow-hidden"
          >
            {/* Inner ring */}
            <div className="absolute inset-3 rounded-full border-2 border-mw-gold/30 pointer-events-none" />
            <div className="absolute inset-6 rounded-full border border-mw-gold/15 pointer-events-none" />

            <span className="text-4xl mb-1">🤠</span>
            <span className="font-display text-xl font-bold text-mw-cream tracking-widest">
              PRESS IT
            </span>
            <span className="font-display text-xs text-mw-cream/60 tracking-widest mt-0.5">
              BROTHER
            </span>
          </motion.button>

          {/* Click counter below button */}
          <div className="mt-6 text-center">
            <div className="font-display text-2xl font-bold text-mw-cream">
              {state.totalClicks.toLocaleString()}
            </div>
            <div className="font-display text-xs text-mw-cream/50 tracking-wider">
              TOTAL CLICKS
            </div>
            {nextAchievementClick && (
              <div className="mt-2 w-40">
                <div className="flex justify-between text-[10px] text-mw-cream/40 font-display mb-1">
                  <span>NEXT MILESTONE</span>
                  <span>{nextAchievementClick}</span>
                </div>
                <div className="h-1.5 bg-mw-cream/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-mw-gold rounded-full"
                    animate={{ width: `${clickProgress * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Last event card */}
      <AnimatePresence>
        {showEvent && currentEvent && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 left-4 right-4 max-w-md mx-auto z-40 cursor-pointer"
            onClick={() => setShowEvent(false)}
          >
            <div
              className={`bg-mw-navy border-2 rounded-2xl p-5 text-center shadow-2xl ${
                currentEvent.rarity === "legendary"
                  ? "border-mw-gold shadow-[0_0_30px_rgba(212,160,23,0.4)]"
                  : currentEvent.rarity === "rare"
                  ? "border-blue-400/60"
                  : "border-mw-green/60"
              }`}
            >
              <motion.div
                animate={{ scale: [0.5, 1.3, 1], rotate: [0, -10, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-2"
              >
                {currentEvent.emoji}
              </motion.div>
              <p className="text-mw-cream font-medium text-sm mb-2 leading-snug">
                {currentEvent.text}
              </p>
              <div className="font-display text-2xl font-bold text-mw-gold">
                +{currentEvent.points} PTS
              </div>
              <div
                className={`font-display text-xs tracking-widest mt-1 ${
                  RARITY_COLORS[currentEvent.rarity]
                }`}
              >
                {RARITY_LABELS[currentEvent.rarity]}
              </div>
              {currentEvent.rarity === "legendary" && (
                <div className="mt-2 font-display text-xs text-mw-gold/60 tracking-widest animate-pulse">
                  HELL YEAH BROTHER
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating point numbers */}
      {floaters.map((f) => (
        <motion.div
          key={f.id}
          initial={{ x: f.x, y: f.y, opacity: 1, scale: 1 }}
          animate={{ y: f.y - 90, opacity: 0, scale: 1.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed pointer-events-none z-50 font-display text-xl font-bold text-mw-gold"
          style={{ left: 0, top: 0 }}
        >
          +{f.pts}
        </motion.div>
      ))}
    </motion.div>
  );
}
