export type ItemCategory =
  | "yard"
  | "hunting"
  | "fishing"
  | "cooking"
  | "vehicles"
  | "entertainment"
  | "pets";

export interface SpreadItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  category: ItemCategory;
  unlockMessage: string;
}

export const ITEMS: SpreadItem[] = [
  {
    id: "basic-lawn",
    name: "Freshly Mowed Lawn",
    emoji: "🌿",
    description: "The foundation of any respectable spread.",
    price: 0,
    category: "yard",
    unlockMessage: "Home sweet home!",
  },
  {
    id: "american-flag",
    name: "American Flag",
    emoji: "🇺🇸",
    description: "Full size. Pole and everything.",
    price: 50,
    category: "yard",
    unlockMessage: "Let freedom ring!",
  },
  {
    id: "cornhole-set",
    name: "Corn Hole Set",
    emoji: "🌽",
    description: "Custom painted boards. Ready for tailgate season.",
    price: 75,
    category: "entertainment",
    unlockMessage: "Bags in the hole!",
  },
  {
    id: "weber-grill",
    name: "Weber Kettle Grill",
    emoji: "🔥",
    description: "Classic charcoal. Purists only.",
    price: 100,
    category: "cooking",
    unlockMessage: "Time to grill!",
  },
  {
    id: "fire-pit",
    name: "Stone Fire Pit",
    emoji: "🪵",
    description: "Hand-laid stone. Good for stories.",
    price: 150,
    category: "yard",
    unlockMessage: "Pull up a chair!",
  },
  {
    id: "fishing-poles",
    name: "Rod & Reel Combo",
    emoji: "🎣",
    description: "Medium-heavy action. All-purpose setup.",
    price: 150,
    category: "fishing",
    unlockMessage: "Let's go fishing!",
  },
  {
    id: "deer-mount",
    name: "8-Point Deer Mount",
    emoji: "🦌",
    description: "Hanging above the fireplace where it belongs.",
    price: 200,
    category: "hunting",
    unlockMessage: "That's a shooter!",
  },
  {
    id: "trophy-case",
    name: "Trophy Display Case",
    emoji: "🏆",
    description: "For all the hardware you've earned.",
    price: 300,
    category: "hunting",
    unlockMessage: "Show it off!",
  },
  {
    id: "offset-smoker",
    name: "Offset Smoker",
    emoji: "💨",
    description: "Texas style. Oak and hickory only.",
    price: 350,
    category: "cooking",
    unlockMessage: "Low and slow, brother!",
  },
  {
    id: "tailgate-setup",
    name: "Full Tailgate Setup",
    emoji: "🏈",
    description: "Generator, big screen, folding chairs — the works.",
    price: 450,
    category: "entertainment",
    unlockMessage: "Game day is ready!",
  },
  {
    id: "deer-stand",
    name: "Elevated Deer Stand",
    emoji: "🌲",
    description: "16-foot ladder stand. Private property only.",
    price: 400,
    category: "hunting",
    unlockMessage: "Eyes in the sky!",
  },
  {
    id: "bass-boat",
    name: "Bass Boat",
    emoji: "🚤",
    description: "14-footer with trolling motor. Tournament ready.",
    price: 500,
    category: "fishing",
    unlockMessage: "Time to shred some water!",
  },
  {
    id: "atv",
    name: "Four-Wheeler / ATV",
    emoji: "🏍️",
    description: "400cc. Good for the back forty.",
    price: 600,
    category: "vehicles",
    unlockMessage: "WOO! Hit the trails!",
  },
  {
    id: "hunting-blind",
    name: "Custom Hunting Blind",
    emoji: "🏕️",
    description: "Insulated. Scent-controlled. Serious setup.",
    price: 800,
    category: "hunting",
    unlockMessage: "They'll never see you coming!",
  },
  {
    id: "whole-hog-smoker",
    name: "Whole Hog Rotisserie",
    emoji: "🐖",
    description: "For when the Weber just isn't enough.",
    price: 750,
    category: "cooking",
    unlockMessage: "Whole hog, whole day!",
  },
  {
    id: "f150",
    name: "Ford F-150 (Lifted)",
    emoji: "🚗",
    description: "6-inch lift. Spray-in bedliner. Non-negotiable.",
    price: 1000,
    category: "vehicles",
    unlockMessage: "BUILT FORD TOUGH!",
  },
  {
    id: "fishing-dock",
    name: "Private Fishing Dock",
    emoji: "🎣",
    description: "Your own dock. No more public launches.",
    price: 1500,
    category: "fishing",
    unlockMessage: "Cast from your own dock!",
  },
  {
    id: "lake-cabin",
    name: "Lake Cabin",
    emoji: "🏠",
    description: "3 beds, 1 bath, lake access. The dream.",
    price: 2000,
    category: "yard",
    unlockMessage: "LIVING THE DREAM, BROTHER!",
  },
  {
    id: "barn-cat",
    name: "Barn Cat",
    emoji: "🐱",
    description: "Best mouser in three counties. She runs this place.",
    price: 100,
    category: "pets",
    unlockMessage: "She runs this place now!",
  },
  {
    id: "farm-dog",
    name: "Farm Dog",
    emoji: "🐕",
    description: "Every spread needs a good dog.",
    price: 125,
    category: "pets",
    unlockMessage: "Good boy!",
  },
  {
    id: "dog-house",
    name: "Deluxe Dog House",
    emoji: "🏡",
    description: "Climate controlled. He earned it.",
    price: 250,
    category: "pets",
    unlockMessage: "Living large, good boy!",
  },
  {
    id: "trained-retriever",
    name: "Trained Retriever",
    emoji: "🦮",
    description: "AKC registered. Fetches everything, every time.",
    price: 600,
    category: "pets",
    unlockMessage: "Best hunting partner you've ever had!",
  },
];

export const SPREAD_TIERS = [
  { min: 0, max: 2, label: "BARE LAND", emoji: "🌾" },
  { min: 3, max: 5, label: "STARTER SPREAD", emoji: "🏡" },
  { min: 6, max: 9, label: "COUNTRY BOY", emoji: "🌲" },
  { min: 10, max: 13, label: "BACKWOODS LEGEND", emoji: "🦌" },
  { min: 14, max: 17, label: "MIDWEST ROYALTY", emoji: "👑" },
  { min: 18, max: 21, label: "FULL SPREAD", emoji: "🐾" },
  { min: 22, max: 22, label: "THE FULL SPREAD", emoji: "🌟" },
];

export function getSpreadTier(unlockedCount: number) {
  return (
    SPREAD_TIERS.find(
      (t) => unlockedCount >= t.min && unlockedCount <= t.max
    ) || SPREAD_TIERS[0]
  );
}
