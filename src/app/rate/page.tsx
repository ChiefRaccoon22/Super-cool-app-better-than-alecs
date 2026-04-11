"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, ChevronRight } from "lucide-react";
import { RATE_PAIRS, RatePair } from "@/lib/rateItems";
import { useGameState, awardPoints, castVote } from "@/lib/gameState";
import { soundManager } from "@/lib/audio";

// Shuffle helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function VoteBar({ aVotes, bVotes }: { aVotes: number; bVotes: number }) {
  const total = aVotes + bVotes;
  const aPct = total === 0 ? 50 : Math.round((aVotes / total) * 100);
  const bPct = 100 - aPct;

  return (
    <div className="w-full">
      <div className="flex justify-between font-display text-xs text-mw-cream/60 mb-1">
        <span>{aPct}%</span>
        <span>{bPct}%</span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-mw-navy/50 gap-0.5">
        <motion.div
          className="bg-mw-orange rounded-full"
          initial={{ width: "50%" }}
          animate={{ width: `${aPct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
        <motion.div
          className="bg-mw-navy rounded-full flex-1"
          initial={{ width: "50%" }}
          animate={{ width: `${bPct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        />
      </div>
      <div className="flex justify-between font-display text-[10px] text-mw-cream/40 mt-1">
        <span>{aVotes.toLocaleString()} votes</span>
        <span>{bVotes.toLocaleString()} votes</span>
      </div>
    </div>
  );
}

export default function RatePage() {
  const { state, updateState } = useGameState();
  const [queue, setQueue] = useState<RatePair[]>(() => shuffle(RATE_PAIRS));
  const [idx, setIdx] = useState(0);
  const [voted, setVoted] = useState<"a" | "b" | null>(null);
  const [showNext, setShowNext] = useState(false);

  const currentPair = queue[idx % queue.length];
  const tallies = state.voteHistory[currentPair.id] || { aVotes: 0, bVotes: 0 };

  const vote = useCallback(
    (choice: "a" | "b") => {
      if (voted) return;
      soundManager.play("vote");
      setVoted(choice);
      updateState((s) => {
        let next = castVote(s, currentPair.id, choice);
        next = awardPoints(next, 5);
        return next;
      });
      setTimeout(() => setShowNext(true), 1500);
    },
    [voted, currentPair.id, updateState]
  );

  const nextPair = useCallback(() => {
    setVoted(null);
    setShowNext(false);
    setIdx((i) => {
      const next = i + 1;
      // reshuffle when we wrap
      if (next % queue.length === 0) {
        setQueue(shuffle(RATE_PAIRS));
      }
      return next;
    });
  }, [queue.length]);

  return (
    <div className="min-h-screen px-4 pt-16 pb-24 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <ArrowLeftRight size={18} className="text-mw-gold" />
          <h1 className="font-display text-2xl font-bold text-mw-cream tracking-widest">
            RATE IT
          </h1>
        </div>
        <p className="font-display text-xs text-mw-cream/40 tracking-wider">
          YOUR OPINION MATTERS, BROTHER
        </p>
        <div className="font-display text-xs text-mw-gold/60 mt-1">
          {state.totalVotesCast} VOTES CAST · +5 PTS PER VOTE
        </div>
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPair.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="text-center my-4">
            <p className="font-display text-base font-bold text-mw-cream tracking-wide">
              {currentPair.question}
            </p>
          </div>

          {/* Options */}
          <div className="flex gap-3 mb-6">
            {/* Option A */}
            <motion.button
              whileHover={!voted ? { scale: 1.04, y: -4 } : {}}
              whileTap={!voted ? { scale: 0.96 } : {}}
              onClick={() => vote("a")}
              disabled={!!voted}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border-2 transition-all duration-200 ${
                voted === "a"
                  ? "border-green-400 bg-green-400/10 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                  : voted === "b"
                  ? "border-mw-navy/40 bg-mw-navy/20 opacity-50"
                  : "border-mw-orange/40 bg-mw-orange/10 hover:border-mw-orange hover:bg-mw-orange/20"
              }`}
            >
              <span className="text-4xl">{currentPair.optionA.emoji}</span>
              <span className="font-display text-sm font-bold text-mw-cream tracking-wide text-center">
                {currentPair.optionA.label}
              </span>
              {voted === "a" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400 text-lg"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>

            {/* VS divider */}
            <div className="flex items-center">
              <div className="font-display text-sm font-bold text-mw-cream/30">VS</div>
            </div>

            {/* Option B */}
            <motion.button
              whileHover={!voted ? { scale: 1.04, y: -4 } : {}}
              whileTap={!voted ? { scale: 0.96 } : {}}
              onClick={() => vote("b")}
              disabled={!!voted}
              className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-2 border-2 transition-all duration-200 ${
                voted === "b"
                  ? "border-green-400 bg-green-400/10 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                  : voted === "a"
                  ? "border-mw-navy/40 bg-mw-navy/20 opacity-50"
                  : "border-mw-navy/60 bg-mw-navy/30 hover:border-mw-gold/60 hover:bg-mw-gold/10"
              }`}
            >
              <span className="text-4xl">{currentPair.optionB.emoji}</span>
              <span className="font-display text-sm font-bold text-mw-cream tracking-wide text-center">
                {currentPair.optionB.label}
              </span>
              {voted === "b" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400 text-lg"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Vote results */}
          <AnimatePresence>
            {voted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <VoteBar
                  aVotes={tallies.aVotes + (voted === "a" ? 1 : 0)}
                  bVotes={tallies.bVotes + (voted === "b" ? 1 : 0)}
                />
                <div className="text-center mt-2">
                  <span className="font-display text-xs text-mw-gold">+5 PTS EARNED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button */}
          <AnimatePresence>
            {showNext && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextPair}
                className="w-full bg-mw-orange border border-mw-gold/40 rounded-2xl py-4 flex items-center justify-center gap-2 font-display font-bold text-mw-cream tracking-widest"
              >
                NEXT MATCHUP
                <ChevronRight size={18} />
              </motion.button>
            )}
          </AnimatePresence>

          {!voted && (
            <p className="text-center font-display text-xs text-mw-cream/30 tracking-widest mt-4">
              TAP TO VOTE
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
