"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState, Achievement } from "@/lib/gameState";
import { fireAchievementConfetti } from "@/lib/confetti";
import { soundManager } from "@/lib/audio";

const TIER_LABELS: Record<Achievement["tier"], string> = {
  bronze: "BRONZE",
  silver: "SILVER",
  gold: "GOLD",
  legendary: "LEGENDARY",
};

const TIER_CLASSES: Record<Achievement["tier"], string> = {
  bronze: "tier-bronze",
  silver: "tier-silver",
  gold: "tier-gold",
  legendary: "tier-legendary",
};

export default function AchievementToast() {
  const { achievementQueue, dismissAchievement } = useGameState();
  const current = achievementQueue[0] ?? null;

  useEffect(() => {
    if (!current) return;
    soundManager.play("achievement");
    fireAchievementConfetti();
    const timer = setTimeout(dismissAchievement, 4000);
    return () => clearTimeout(timer);
  }, [current?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 cursor-pointer"
          onClick={dismissAchievement}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-mw-navy border-2 border-mw-gold rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-display text-sm tracking-widest text-mw-gold/70 mb-2">
              ACHIEVEMENT UNLOCKED
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl mb-4"
            >
              {current.emoji}
            </motion.div>
            <div className="font-display text-2xl font-bold text-mw-cream mb-2">
              {current.name}
            </div>
            <div className="text-mw-cream/70 text-sm mb-4">
              {current.description}
            </div>
            <div
              className={`font-display text-xs tracking-widest font-bold ${TIER_CLASSES[current.tier]}`}
            >
              {TIER_LABELS[current.tier]}
            </div>
            <div className="text-mw-cream/40 text-xs mt-4">tap to dismiss</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
