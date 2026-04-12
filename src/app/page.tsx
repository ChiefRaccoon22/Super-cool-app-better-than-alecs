"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowLeftRight, Flame, Fish, Crosshair, Trophy, TreePine } from "lucide-react";
import { useGameState, ACHIEVEMENTS } from "@/lib/gameState";

function StatCard({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-mw-green/20 border border-mw-green/40 rounded-2xl p-4 flex flex-col items-center gap-1"
    >
      <div className="text-mw-gold">{icon}</div>
      <div className="font-display text-2xl font-bold text-mw-cream">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="font-display text-[10px] tracking-widest text-mw-cream/50 text-center">
        {label}
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { state } = useGameState();
  const streakActive = state.currentStreak >= 3;

  return (
    <div className="min-h-screen px-4 pt-4 pb-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-12 pb-6"
      >
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gold-shine tracking-wide leading-none">
          MIDWEST MODE
        </h1>
        <p className="font-display text-sm tracking-[0.3em] text-mw-cream/60 mt-2">
          HELL YEAH BROTHER
        </p>
      </motion.div>

      {/* Streak */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`mx-auto max-w-sm mb-6 rounded-2xl p-4 text-center border ${
          state.currentStreak >= 7
            ? "bg-mw-orange/20 border-mw-orange/60 shadow-[0_0_20px_rgba(199,91,26,0.3)]"
            : state.currentStreak >= 1
            ? "bg-mw-green/20 border-mw-green/40"
            : "bg-mw-navy/50 border-mw-cream/10"
        }`}
      >
        {state.currentStreak >= 1 ? (
          <div className="flex items-center justify-center gap-2">
            <span className={`text-2xl ${streakActive ? "animate-pulse" : ""}`}>🔥</span>
            <div>
              <span className="font-display text-2xl font-bold text-mw-orange">
                {state.currentStreak}
              </span>
              <span className="font-display text-sm text-mw-cream/70 ml-1">DAY STREAK</span>
              {state.longestStreak > state.currentStreak && (
                <div className="font-display text-[10px] text-mw-cream/40 tracking-wider">
                  BEST: {state.longestStreak} DAYS
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="font-display text-sm tracking-widest text-mw-cream/40">
            START YOUR STREAK TODAY
          </div>
        )}
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6">
        <StatCard icon={<Trophy size={20} />} value={state.totalPoints} label="MIDWEST POINTS" delay={0.15} />
        <StatCard icon={<Flame size={20} />} value={state.currentStreak} label="DAY STREAK" delay={0.2} />
        <StatCard icon={<TreePine size={20} />} value={state.unlockedItems.length} label="ITEMS OWNED" delay={0.25} />
        <StatCard icon={<Trophy size={20} />} value={`${state.unlockedAchievements.length}/${ACHIEVEMENTS.length}`} label="ACHIEVEMENTS" delay={0.3} />
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 max-w-sm mx-auto mb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="flex-1">
          <Link href="/button">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="bg-mw-red border border-mw-gold/40 rounded-xl p-4 text-center cursor-pointer">
              <Zap className="mx-auto mb-1 text-mw-gold" size={24} />
              <div className="font-display text-sm font-bold text-mw-cream tracking-wider">HIT THE BUTTON</div>
            </motion.div>
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex-1">
          <Link href="/rate">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="bg-mw-navy border border-mw-gold/40 rounded-xl p-4 text-center cursor-pointer">
              <ArrowLeftRight className="mx-auto mb-1 text-mw-gold" size={24} />
              <div className="font-display text-sm font-bold text-mw-cream tracking-wider">RATE IT</div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Recent events */}
      {state.recentEvents.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="max-w-sm mx-auto">
          <div className="font-display text-xs tracking-widest text-mw-cream/40 mb-2">RECENT EVENTS</div>
          <div className="space-y-2">
            {state.recentEvents.map((evt, i) => (
              <div key={i} className="bg-mw-green/10 border border-mw-green/20 rounded-xl px-4 py-2 text-sm text-mw-cream/70">
                {evt}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="max-w-sm mx-auto mt-6 grid grid-cols-3 gap-2 text-center">
        <div className="bg-mw-navy/50 rounded-xl p-3">
          <Fish size={16} className="mx-auto text-blue-400 mb-1" />
          <div className="font-display text-lg font-bold text-mw-cream">{state.eventCategoryTotals["fishing"] || 0}</div>
          <div className="font-display text-[9px] text-mw-cream/40 tracking-wider">FISH HITS</div>
        </div>
        <div className="bg-mw-navy/50 rounded-xl p-3">
          <Crosshair size={16} className="mx-auto text-mw-orange mb-1" />
          <div className="font-display text-lg font-bold text-mw-cream">{state.eventCategoryTotals["hunting"] || 0}</div>
          <div className="font-display text-[9px] text-mw-cream/40 tracking-wider">HUNT HITS</div>
        </div>
        <div className="bg-mw-navy/50 rounded-xl p-3">
          <Flame size={16} className="mx-auto text-mw-red mb-1" />
          <div className="font-display text-lg font-bold text-mw-cream">{state.eventCategoryTotals["cooking"] || 0}</div>
          <div className="font-display text-[9px] text-mw-cream/40 tracking-wider">BBQ HITS</div>
        </div>
      </motion.div>
    </div>
  );
}
