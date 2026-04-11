export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export interface MidwestEvent {
  id: string;
  text: string;
  emoji: string;
  points: number;
  rarity: Rarity;
  category: "fishing" | "hunting" | "cooking" | "yard" | "sport" | "general";
  triggerConfetti: boolean;
  shakeIntensity: "light" | "medium" | "heavy";
}

export const EVENTS: MidwestEvent[] = [
  // ── Common ─────────────────────────────────────────────────────────────────
  {
    id: "cold-one",
    text: "Just cracked the first cold one of the weekend",
    emoji: "🍺",
    points: 10,
    rarity: "common",
    category: "general",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "perfect-stripe",
    text: "Mowed a perfect stripe in the yard. Neighbors are jealous.",
    emoji: "🌿",
    points: 15,
    rarity: "common",
    category: "yard",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "cornhole",
    text: "Corn hole game. Bag in the hole. First try.",
    emoji: "🌽",
    points: 20,
    rarity: "common",
    category: "sport",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "grill-lit",
    text: "The grill is lit and it's only 9am. No regrets.",
    emoji: "🔥",
    points: 15,
    rarity: "common",
    category: "cooking",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "bluegill",
    text: "Caught a decent-sized bluegill. Respectable.",
    emoji: "🐟",
    points: 20,
    rarity: "common",
    category: "fishing",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "doe-sighting",
    text: "Spotted a doe from the back porch. Called it a good morning.",
    emoji: "🦌",
    points: 25,
    rarity: "common",
    category: "hunting",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "touchdown",
    text: "Your team just punched it in from the one-yard line!",
    emoji: "🏈",
    points: 30,
    rarity: "common",
    category: "sport",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  {
    id: "american-flag",
    text: "Got the flag up before sunrise. America noticed.",
    emoji: "🇺🇸",
    points: 25,
    rarity: "common",
    category: "yard",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  // ── Uncommon ───────────────────────────────────────────────────────────────
  {
    id: "mow-off",
    text: "Your neighbor challenged you to a mow-off. You won.",
    emoji: "🏆",
    points: 35,
    rarity: "uncommon",
    category: "yard",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  {
    id: "trailer-first-try",
    text: "Backed the boat trailer perfectly on the first try. Crowd goes wild.",
    emoji: "🚗",
    points: 40,
    rarity: "uncommon",
    category: "general",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  {
    id: "perfect-split",
    text: "Found the perfect campfire wood split on a single swing.",
    emoji: "🪓",
    points: 35,
    rarity: "uncommon",
    category: "general",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  {
    id: "before-sunup",
    text: "Made it to the stand before sunup. Patience is a virtue.",
    emoji: "🌄",
    points: 35,
    rarity: "uncommon",
    category: "hunting",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "203-brisket",
    text: "Brisket hit 203°F. The meat sweats are incoming.",
    emoji: "🔥",
    points: 45,
    rarity: "uncommon",
    category: "cooking",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  {
    id: "classic-rock",
    text: "Classic rock came on the radio mid-drive. Windows down.",
    emoji: "⚡",
    points: 30,
    rarity: "uncommon",
    category: "general",
    triggerConfetti: false,
    shakeIntensity: "light",
  },
  {
    id: "fish-finder",
    text: "The fish finder just lit up. Something big is down there.",
    emoji: "🐟",
    points: 40,
    rarity: "uncommon",
    category: "fishing",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  {
    id: "kick-return",
    text: "First kick return for a TD of the season. Tailgate erupts.",
    emoji: "🏈",
    points: 45,
    rarity: "uncommon",
    category: "sport",
    triggerConfetti: true,
    shakeIntensity: "medium",
  },
  // ── Rare ───────────────────────────────────────────────────────────────────
  {
    id: "8lb-bass",
    text: "8lb largemouth bass on a topwater lure. Bass fishing SUCCESS.",
    emoji: "🐟",
    points: 60,
    rarity: "rare",
    category: "fishing",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "smoke-ring",
    text: "Perfect smoke ring on the brisket. Competition-grade.",
    emoji: "🔥",
    points: 75,
    rarity: "rare",
    category: "cooking",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "ten-pointer",
    text: "Buck just stepped into the clearing. 10-pointer. Heart is pounding.",
    emoji: "🦌",
    points: 65,
    rarity: "rare",
    category: "hunting",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "stump-pull",
    text: "Your F-150 pulled that stump out on the first try. Unstoppable.",
    emoji: "🚗",
    points: 55,
    rarity: "rare",
    category: "general",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "grand-slam",
    text: "Beer league softball: walked-off with a grand slam. Legendary.",
    emoji: "⚾",
    points: 70,
    rarity: "rare",
    category: "sport",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "ribs",
    text: "Ribs fell right off the bone. The family went silent.",
    emoji: "🍖",
    points: 65,
    rarity: "rare",
    category: "cooking",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "ice-fishing",
    text: "Ice fishing: 5-fish limit before 8am. Nebraska miracle.",
    emoji: "❄️",
    points: 60,
    rarity: "rare",
    category: "fishing",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "tight-campsite",
    text: "Backed the camper into the tightest spot at the state park. First try.",
    emoji: "🚗",
    points: 55,
    rarity: "rare",
    category: "general",
    triggerConfetti: false,
    shakeIntensity: "medium",
  },
  // ── Legendary ──────────────────────────────────────────────────────────────
  {
    id: "12-point",
    text: "A 12-POINT BUCK just walked into your backyard. LEGENDARY.",
    emoji: "🦌",
    points: 150,
    rarity: "legendary",
    category: "hunting",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "whole-hog",
    text: "You just slow-smoked a whole hog for 18 hours. MIDWEST ROYALTY.",
    emoji: "🐖",
    points: 200,
    rarity: "legendary",
    category: "cooking",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "championship",
    text: "YOUR TEAM WON THE CHAMPIONSHIP. HELL YEAH BROTHER!",
    emoji: "🏆",
    points: 250,
    rarity: "legendary",
    category: "sport",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "14lb-bass",
    text: "Caught a 14lb largemouth. State record territory. Bass legend.",
    emoji: "🐟",
    points: 175,
    rarity: "legendary",
    category: "fishing",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "shed-300",
    text: "Found a 300-class whitetail shed in the back forty. Once in a lifetime.",
    emoji: "🦌",
    points: 200,
    rarity: "legendary",
    category: "hunting",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
  {
    id: "county-fair-bbq",
    text: "Your homemade BBQ sauce just won the county fair. LEGEND.",
    emoji: "🔥",
    points: 225,
    rarity: "legendary",
    category: "cooking",
    triggerConfetti: true,
    shakeIntensity: "heavy",
  },
];

// ── Weighted Random Picker ──────────────────────────────────────────────────

export function pickRandomEvent(excludeId: string | null): MidwestEvent {
  const roll = Math.random() * 100;
  let rarity: Rarity;
  if (roll < 5) {
    rarity = "legendary";
  } else if (roll < 20) {
    rarity = "rare";
  } else if (roll < 50) {
    rarity = "uncommon";
  } else {
    rarity = "common";
  }

  const pool = EVENTS.filter(
    (e) => e.rarity === rarity && e.id !== excludeId
  );
  if (pool.length === 0) {
    // fallback — pick any event that isn't the last one
    const fallback = EVENTS.filter((e) => e.id !== excludeId);
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}
