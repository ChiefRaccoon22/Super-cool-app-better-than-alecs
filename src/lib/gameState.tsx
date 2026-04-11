"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GameState {
  totalPoints: number;
  lifetimePoints: number;
  lastPlayedDate: string;
  currentStreak: number;
  longestStreak: number;
  totalClicks: number;
  totalVotesCast: number;
  unlockedItems: string[];
  unlockedAchievements: string[];
  voteHistory: Record<string, { aVotes: number; bVotes: number }>;
  recentEvents: string[];
  eventCategoryTotals: Record<string, number>;
  legendaryEventCount: number;
  lastEventId: string | null;
  firstPlayedAt: string;
}

const STORAGE_KEY = "midwest-mode-state";

const DEFAULT_STATE: GameState = {
  totalPoints: 0,
  lifetimePoints: 0,
  lastPlayedDate: "",
  currentStreak: 0,
  longestStreak: 0,
  totalClicks: 0,
  totalVotesCast: 0,
  unlockedItems: ["basic-lawn"],
  unlockedAchievements: [],
  voteHistory: {},
  recentEvents: [],
  eventCategoryTotals: {},
  legendaryEventCount: 0,
  lastEventId: null,
  firstPlayedAt: new Date().toISOString(),
};

// ─── Storage ──────────────────────────────────────────────────────────────────

export function loadState(): GameState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full — ignore
  }
}

// ─── Streak Logic ─────────────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function updateStreak(state: GameState): GameState {
  const today = todayStr();
  const yesterday = yesterdayStr();
  if (state.lastPlayedDate === today) return state;

  let currentStreak = state.currentStreak;
  if (state.lastPlayedDate === yesterday) {
    currentStreak += 1;
  } else {
    currentStreak = 1;
  }
  const longestStreak = Math.max(state.longestStreak, currentStreak);
  return { ...state, lastPlayedDate: today, currentStreak, longestStreak };
}

// ─── State Updaters ───────────────────────────────────────────────────────────

export function awardPoints(state: GameState, amount: number): GameState {
  return {
    ...state,
    totalPoints: state.totalPoints + amount,
    lifetimePoints: state.lifetimePoints + amount,
  };
}

export function spendPoints(state: GameState, amount: number): GameState {
  return { ...state, totalPoints: Math.max(0, state.totalPoints - amount) };
}

export function recordClick(
  state: GameState,
  eventId: string,
  eventText: string,
  category: string,
  rarity: string
): GameState {
  const recentEvents = [eventText, ...state.recentEvents].slice(0, 5);
  const eventCategoryTotals = { ...state.eventCategoryTotals };
  eventCategoryTotals[category] = (eventCategoryTotals[category] || 0) + 1;
  const legendaryEventCount =
    rarity === "legendary"
      ? state.legendaryEventCount + 1
      : state.legendaryEventCount;
  return {
    ...state,
    totalClicks: state.totalClicks + 1,
    lastEventId: eventId,
    recentEvents,
    eventCategoryTotals,
    legendaryEventCount,
  };
}

export function unlockItem(state: GameState, itemId: string): GameState {
  if (state.unlockedItems.includes(itemId)) return state;
  return { ...state, unlockedItems: [...state.unlockedItems, itemId] };
}

export function castVote(
  state: GameState,
  pairId: string,
  choice: "a" | "b"
): GameState {
  const existing = state.voteHistory[pairId] || { aVotes: 0, bVotes: 0 };
  const updated =
    choice === "a"
      ? { ...existing, aVotes: existing.aVotes + 1 }
      : { ...existing, bVotes: existing.bVotes + 1 };
  return {
    ...state,
    totalVotesCast: state.totalVotesCast + 1,
    voteHistory: { ...state.voteHistory, [pairId]: updated },
  };
}

export function unlockAchievement(
  state: GameState,
  achievementId: string
): GameState {
  if (state.unlockedAchievements.includes(achievementId)) return state;
  return {
    ...state,
    unlockedAchievements: [...state.unlockedAchievements, achievementId],
  };
}

// ─── Achievement Checking ─────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  tier: "bronze" | "silver" | "gold" | "legendary";
  secret: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-blood",
    name: "First Blood",
    description: "Hit the button for the first time.",
    emoji: "🩸",
    tier: "bronze",
    secret: false,
  },
  {
    id: "warming-up",
    name: "Warming Up",
    description: "Hit the button 10 times.",
    emoji: "🔥",
    tier: "bronze",
    secret: false,
  },
  {
    id: "grill-master",
    name: "Grill Master",
    description: "Hit the button 50 times.",
    emoji: "🍖",
    tier: "silver",
    secret: false,
  },
  {
    id: "button-legend",
    name: "Button Legend",
    description: "Hit the button 200 times.",
    emoji: "🏆",
    tier: "gold",
    secret: false,
  },
  {
    id: "point-collector",
    name: "Point Collector",
    description: "Earn 500 lifetime points.",
    emoji: "💰",
    tier: "bronze",
    secret: false,
  },
  {
    id: "high-roller",
    name: "High Roller",
    description: "Earn 5,000 lifetime points.",
    emoji: "💎",
    tier: "silver",
    secret: false,
  },
  {
    id: "midwest-royalty",
    name: "Midwest Royalty",
    description: "Earn 25,000 lifetime points.",
    emoji: "👑",
    tier: "gold",
    secret: false,
  },
  {
    id: "hell-yeah",
    name: "Hell Yeah Brother",
    description: "Maintain a 3-day streak.",
    emoji: "🤠",
    tier: "bronze",
    secret: false,
  },
  {
    id: "on-fire",
    name: "On Fire",
    description: "Maintain a 7-day streak.",
    emoji: "🔥",
    tier: "silver",
    secret: false,
  },
  {
    id: "iron-man",
    name: "Iron Man",
    description: "Maintain a 30-day streak.",
    emoji: "💪",
    tier: "gold",
    secret: false,
  },
  {
    id: "property-owner",
    name: "Property Owner",
    description: "Unlock your first item.",
    emoji: "🏡",
    tier: "bronze",
    secret: false,
  },
  {
    id: "serious-collector",
    name: "Serious Collector",
    description: "Unlock 8 items for your Spread.",
    emoji: "🦌",
    tier: "silver",
    secret: false,
  },
  {
    id: "the-full-spread",
    name: "THE FULL SPREAD",
    description: "Collect every single item.",
    emoji: "🌟",
    tier: "legendary",
    secret: false,
  },
  {
    id: "opinionated",
    name: "Opinionated",
    description: "Cast your first vote.",
    emoji: "🗳️",
    tier: "bronze",
    secret: false,
  },
  {
    id: "town-hall",
    name: "Town Hall Regular",
    description: "Cast 50 votes.",
    emoji: "📊",
    tier: "silver",
    secret: false,
  },
  {
    id: "legendary-moment",
    name: "LEGENDARY MOMENT",
    description: "Trigger a legendary event.",
    emoji: "⚡",
    tier: "gold",
    secret: true,
  },
  {
    id: "bass-pro",
    name: "Bass Pro",
    description: "Trigger 5 fishing events.",
    emoji: "🐟",
    tier: "silver",
    secret: false,
  },
  {
    id: "pitmaster",
    name: "Pitmaster",
    description: "Trigger 5 BBQ/cooking events.",
    emoji: "🔥",
    tier: "silver",
    secret: false,
  },
  {
    id: "buck-fever",
    name: "Buck Fever",
    description: "Trigger 5 hunting events.",
    emoji: "🦌",
    tier: "silver",
    secret: false,
  },
  {
    id: "loaded",
    name: "Loaded",
    description: "Own the F-150, Bass Boat, and ATV.",
    emoji: "🚗",
    tier: "gold",
    secret: true,
  },
];

export function checkAchievements(
  state: GameState
): { state: GameState; newlyUnlocked: Achievement[] } {
  const newlyUnlocked: Achievement[] = [];
  let updated = state;

  const conditions: Record<string, boolean> = {
    "first-blood": state.totalClicks >= 1,
    "warming-up": state.totalClicks >= 10,
    "grill-master": state.totalClicks >= 50,
    "button-legend": state.totalClicks >= 200,
    "point-collector": state.lifetimePoints >= 500,
    "high-roller": state.lifetimePoints >= 5000,
    "midwest-royalty": state.lifetimePoints >= 25000,
    "hell-yeah": state.currentStreak >= 3,
    "on-fire": state.currentStreak >= 7,
    "iron-man": state.currentStreak >= 30,
    "property-owner": state.unlockedItems.length >= 2,
    "serious-collector": state.unlockedItems.length >= 8,
    "the-full-spread": state.unlockedItems.length >= 18,
    opinionated: state.totalVotesCast >= 1,
    "town-hall": state.totalVotesCast >= 50,
    "legendary-moment": state.legendaryEventCount >= 1,
    "bass-pro": (state.eventCategoryTotals["fishing"] || 0) >= 5,
    pitmaster: (state.eventCategoryTotals["cooking"] || 0) >= 5,
    "buck-fever": (state.eventCategoryTotals["hunting"] || 0) >= 5,
    loaded:
      state.unlockedItems.includes("f150") &&
      state.unlockedItems.includes("bass-boat") &&
      state.unlockedItems.includes("atv"),
  };

  for (const achievement of ACHIEVEMENTS) {
    if (
      !state.unlockedAchievements.includes(achievement.id) &&
      conditions[achievement.id]
    ) {
      updated = unlockAchievement(updated, achievement.id);
      newlyUnlocked.push(achievement);
    }
  }

  return { state: updated, newlyUnlocked };
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface GameStateContextValue {
  state: GameState;
  updateState: (fn: (s: GameState) => GameState) => Achievement[];
  achievementQueue: Achievement[];
  dismissAchievement: () => void;
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setStateRaw] = useState<GameState>(() => DEFAULT_STATE);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const stateRef = useRef<GameState>(state);

  // Load from localStorage on mount + update streak
  useEffect(() => {
    const loaded = updateStreak(loadState());
    saveState(loaded);
    stateRef.current = loaded;
    setStateRaw(loaded);
  }, []);

  const updateState = useCallback((fn: (s: GameState) => GameState): Achievement[] => {
    const next = fn(stateRef.current);
    const { state: withAchievements, newlyUnlocked } = checkAchievements(next);
    saveState(withAchievements);
    stateRef.current = withAchievements;
    setStateRaw(withAchievements);
    if (newlyUnlocked.length > 0) {
      setAchievementQueue((q) => [...q, ...newlyUnlocked]);
    }
    return newlyUnlocked;
  }, []);

  const dismissAchievement = useCallback(() => {
    setAchievementQueue((q) => q.slice(1));
  }, []);

  return (
    <GameStateContext.Provider
      value={{ state, updateState, achievementQueue, dismissAchievement }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState(): GameStateContextValue {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be inside GameStateProvider");
  return ctx;
}
