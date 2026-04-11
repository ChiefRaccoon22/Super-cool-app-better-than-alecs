"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ACHIEVEMENTS, Achievement } from "@/lib/gameState";
import { useGameState } from "@/lib/gameState";

const TIER_LABELS: Record<Achievement["tier"], string> = {
  bronze: "BRONZE",
  silver: "SILVER",
  gold: "GOLD",
  legendary: "LEGENDARY",
};

const TIER_BORDER: Record<Achievement["tier"], string> = {
  bronze: "border-[#cd7f32]/50",
  silver: "border-[#C0C0C0]/50",
  gold: "border-mw-gold/60",
  legendary: "border-mw-gold shadow-[0_0_20px_rgba(212,160,23,0.3)]",
};

const TIER_BG: Record<Achievement["tier"], string> = {
  bronze: "bg-[#cd7f32]/10",
  silver: "bg-[#C0C0C0]/10",
  gold: "bg-mw-gold/10",
  legendary: "bg-gradient-to-br from-mw-gold/20 to-mw-orange/10",
};

export default function AchievementsPage() {
  const { state } = useGameState();
  const unlocked = state.unlockedAchievements;
  const count = unlocked.length;

  return (
    <div className="min-h-screen px-4 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy size={18} className="text-mw-gold" />
          <h1 className="font-display text-2xl font-bold text-mw-cream tracking-widest">
            ACHIEVEMENTS
          </h1>
        </div>
        <p className="font-display text-xs text-mw-cream/40 tracking-wider">
          {count} / {ACHIEVEMENTS.length} UNLOCKED
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-sm mx-auto mb-6"
      >
        <div className="h-2 bg-mw-navy/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-mw-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(count / ACHIEVEMENTS.length) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 60 }}
          />
        </div>
        <div className="flex justify-between font-display text-[10px] text-mw-cream/40 mt-1">
          <span>0</span>
          <span>{ACHIEVEMENTS.length}</span>
        </div>
      </motion.div>

      {/* Achievement grid */}
      <div className="max-w-sm mx-auto grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlocked.includes(a.id);
          const isSecret = a.secret && !isUnlocked;

          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl p-4 border-2 flex flex-col items-center gap-2 text-center transition-all duration-300 ${
                isUnlocked
                  ? `${TIER_BG[a.tier]} ${TIER_BORDER[a.tier]}`
                  : "bg-mw-navy/20 border-mw-navy/30 opacity-60"
              }`}
            >
              <div className={`text-4xl ${!isUnlocked ? "grayscale opacity-30" : ""}`}>
                {isSecret ? "🔒" : a.emoji}
              </div>

              <div className="font-display text-xs font-bold text-mw-cream leading-tight tracking-wide">
                {isSecret ? "???" : a.name}
              </div>

              {!isSecret && (
                <div className="font-display text-[9px] text-mw-cream/50 leading-snug">
                  {a.description}
                </div>
              )}

              {isUnlocked && (
                <div className={`font-display text-[9px] tracking-widest font-bold tier-${a.tier}`}>
                  {TIER_LABELS[a.tier]}
                </div>
              )}

              {!isUnlocked && !isSecret && (
                <div className="font-display text-[9px] text-mw-cream/30 tracking-wider">
                  LOCKED
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {count === ACHIEVEMENTS.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="max-w-sm mx-auto mt-8 text-center bg-gradient-to-br from-mw-gold/20 to-mw-orange/10 border-2 border-mw-gold rounded-3xl p-6"
        >
          <div className="text-5xl mb-2">🌟</div>
          <div className="font-display text-xl font-bold text-mw-gold">
            COMPLETE LEGEND
          </div>
          <div className="font-display text-xs text-mw-cream/60 mt-1">
            ALL ACHIEVEMENTS UNLOCKED. HELL YEAH BROTHER.
          </div>
        </motion.div>
      )}
    </div>
  );
}
