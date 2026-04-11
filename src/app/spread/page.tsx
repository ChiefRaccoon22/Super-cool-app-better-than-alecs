"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Lock, CheckCircle } from "lucide-react";
import { ITEMS, getSpreadTier } from "@/lib/items";
import { useGameState, spendPoints, unlockItem } from "@/lib/gameState";
import { soundManager } from "@/lib/audio";
import { fireUnlockConfetti } from "@/lib/confetti";

const CATEGORY_LABELS: Record<string, string> = {
  yard: "YARD",
  hunting: "HUNTING",
  fishing: "FISHING",
  cooking: "COOKING",
  vehicles: "VEHICLES",
  entertainment: "ENTERTAINMENT",
};

export default function SpreadPage() {
  const { state, updateState } = useGameState();
  const [unlockMsg, setUnlockMsg] = useState<string | null>(null);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const tier = getSpreadTier(state.unlockedItems.length);
  const nextTier = (() => {
    const idx = [0, 3, 6, 10, 14, 18].findIndex((v) => state.unlockedItems.length < v);
    return idx === -1 ? null : [0, 3, 6, 10, 14, 18][idx];
  })();

  const handleUnlock = (itemId: string, price: number, msg: string, cardEl: HTMLDivElement | null) => {
    if (state.totalPoints < price) return;
    soundManager.play("unlock");
    setJustUnlocked(itemId);
    updateState((s) => {
      let next = spendPoints(s, price);
      next = unlockItem(next, itemId);
      return next;
    });
    setUnlockMsg(msg);
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      fireUnlockConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    setTimeout(() => {
      setJustUnlocked(null);
      setUnlockMsg(null);
    }, 2500);
  };

  // Sort: unlocked first, then by price
  const sorted = [...ITEMS].sort((a, b) => {
    const aOwned = state.unlockedItems.includes(a.id);
    const bOwned = state.unlockedItems.includes(b.id);
    if (aOwned && !bOwned) return -1;
    if (!aOwned && bOwned) return 1;
    return a.price - b.price;
  });

  return (
    <div className="min-h-screen px-4 pt-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h1 className="font-display text-2xl font-bold text-mw-cream tracking-widest">
          YOUR SPREAD
        </h1>
        <p className="font-display text-xs text-mw-cream/40 tracking-wider">
          BUILD YOUR MIDWESTERN EMPIRE
        </p>
      </motion.div>

      {/* Tier card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-sm mx-auto mb-4 bg-mw-green/20 border border-mw-gold/30 rounded-2xl p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="font-display text-xs text-mw-cream/50 tracking-wider">YOUR TIER</div>
            <div className="font-display text-lg font-bold text-mw-gold flex items-center gap-1">
              <span>{tier.emoji}</span> {tier.label}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-xs text-mw-cream/50">ITEMS</div>
            <div className="font-display text-lg font-bold text-mw-cream">
              {state.unlockedItems.length} / 18
            </div>
          </div>
        </div>
        {nextTier !== null && (
          <div>
            <div className="flex justify-between font-display text-[10px] text-mw-cream/40 mb-1">
              <span>PROGRESS TO NEXT TIER</span>
              <span>{state.unlockedItems.length}/{nextTier}</span>
            </div>
            <div className="h-2 bg-mw-navy/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-mw-gold rounded-full"
                animate={{ width: `${(state.unlockedItems.length / nextTier) * 100}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Points available */}
      <div className="max-w-sm mx-auto mb-4 text-center">
        <span className="font-display text-sm text-mw-gold">
          🏆 {state.totalPoints.toLocaleString()} pts available to spend
        </span>
      </div>

      {/* Unlock message toast */}
      <AnimatePresence>
        {unlockMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-sm mx-auto mb-4 bg-mw-green/30 border border-mw-gold/50 rounded-2xl p-3 text-center"
          >
            <div className="font-display text-sm font-bold text-mw-gold">{unlockMsg}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item grid */}
      <div className="max-w-sm mx-auto grid grid-cols-2 gap-3">
        {sorted.map((item, i) => {
          const owned = state.unlockedItems.includes(item.id);
          const affordable = !owned && state.totalPoints >= item.price;
          const isNew = justUnlocked === item.id;

          return (
            <motion.div
              key={item.id}
              ref={(el) => { cardRefs.current[item.id] = el; }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isNew ? [1, 1.12, 0.95, 1.05, 1] : 1,
              }}
              transition={{
                delay: i * 0.04,
                scale: isNew ? { duration: 0.5, times: [0, 0.3, 0.5, 0.7, 1] } : undefined,
              }}
              className={`rounded-2xl p-4 border-2 flex flex-col items-center gap-2 relative overflow-hidden transition-all duration-200 ${
                owned
                  ? "bg-mw-green/25 border-mw-gold/50"
                  : affordable
                  ? "bg-mw-navy/40 border-mw-gold/60 shadow-[0_0_12px_rgba(212,160,23,0.2)]"
                  : "bg-mw-navy/20 border-mw-navy/40 opacity-70"
              }`}
            >
              {/* Shimmer on new unlock */}
              {isNew && (
                <div className="absolute inset-0 shimmer-gold opacity-10 pointer-events-none" />
              )}

              <span className={`text-4xl ${!owned && !affordable ? "grayscale opacity-50" : ""}`}>
                {item.emoji}
              </span>
              <div className="font-display text-xs font-bold text-mw-cream text-center leading-tight tracking-wide">
                {item.name}
              </div>
              <div className="font-display text-[9px] text-mw-cream/40 text-center tracking-wider">
                {CATEGORY_LABELS[item.category]}
              </div>

              {owned ? (
                <div className="flex items-center gap-1 text-mw-gold font-display text-[10px] tracking-wider">
                  <CheckCircle size={12} />
                  OWNED
                </div>
              ) : item.price === 0 ? (
                <div className="font-display text-[10px] text-mw-cream/50 tracking-wider">FREE</div>
              ) : (
                <div className="w-full flex flex-col items-center gap-1.5">
                  <div className={`font-display text-xs font-bold ${affordable ? "text-mw-gold" : "text-mw-cream/40"}`}>
                    🏆 {item.price.toLocaleString()}
                  </div>
                  {affordable && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleUnlock(item.id, item.price, item.unlockMessage, cardRefs.current[item.id])
                      }
                      className="w-full bg-mw-gold text-mw-navy font-display text-[10px] font-bold tracking-widest rounded-xl py-1.5"
                    >
                      UNLOCK
                    </motion.button>
                  )}
                  {!affordable && (
                    <div className="flex items-center gap-1 text-mw-cream/30 font-display text-[10px]">
                      <Lock size={10} />
                      LOCKED
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
