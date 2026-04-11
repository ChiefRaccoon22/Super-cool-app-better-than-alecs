export interface RatePair {
  id: string;
  question: string;
  optionA: { label: string; emoji: string };
  optionB: { label: string; emoji: string };
}

export const RATE_PAIRS: RatePair[] = [
  {
    id: "truck-war",
    question: "Which truck reigns supreme?",
    optionA: { label: "Ford F-150", emoji: "🚗" },
    optionB: { label: "Ram 1500", emoji: "🛻" },
  },
  {
    id: "fish-hunt",
    question: "Best way to spend Saturday?",
    optionA: { label: "Bass Fishing", emoji: "🐟" },
    optionB: { label: "Deer Hunting", emoji: "🦌" },
  },
  {
    id: "bbq-war",
    question: "The ultimate BBQ protein?",
    optionA: { label: "Brisket", emoji: "🔥" },
    optionB: { label: "Pulled Pork", emoji: "🐖" },
  },
  {
    id: "beer-choice",
    question: "Cooler of choice?",
    optionA: { label: "Bud Light", emoji: "🍺" },
    optionB: { label: "Coors Light", emoji: "🍺" },
  },
  {
    id: "grill-war",
    question: "Real grillers use...?",
    optionA: { label: "Charcoal", emoji: "🔥" },
    optionB: { label: "Gas Grill", emoji: "💨" },
  },
  {
    id: "sport-pick",
    question: "Sunday entertainment?",
    optionA: { label: "Football", emoji: "🏈" },
    optionB: { label: "NASCAR", emoji: "🏎️" },
  },
  {
    id: "side-dish",
    question: "Best BBQ side dish?",
    optionA: { label: "Mac & Cheese", emoji: "🧀" },
    optionB: { label: "Baked Beans", emoji: "🫘" },
  },
  {
    id: "lake-river",
    question: "Better fishing spot?",
    optionA: { label: "Lake Fishing", emoji: "🏞️" },
    optionB: { label: "River Fishing", emoji: "🌊" },
  },
  {
    id: "deer-spot",
    question: "How do you hunt?",
    optionA: { label: "Tree Stand", emoji: "🌲" },
    optionB: { label: "Ground Blind", emoji: "🏕️" },
  },
  {
    id: "sauce-war",
    question: "Best BBQ sauce style?",
    optionA: { label: "Kansas City", emoji: "🍖" },
    optionB: { label: "Texas Style", emoji: "🔥" },
  },
  {
    id: "morning",
    question: "Best time to hunt?",
    optionA: { label: "Sunrise Hunt", emoji: "🌅" },
    optionB: { label: "Evening Hunt", emoji: "🌇" },
  },
  {
    id: "tailgate",
    question: "Tailgate staple?",
    optionA: { label: "Burger", emoji: "🍔" },
    optionB: { label: "Brat", emoji: "🌭" },
  },
  {
    id: "boat-size",
    question: "Boat of choice?",
    optionA: { label: "Bass Boat", emoji: "🚤" },
    optionB: { label: "Pontoon", emoji: "🛥️" },
  },
  {
    id: "dog-breed",
    question: "Best hunting dog?",
    optionA: { label: "Labrador", emoji: "🐕" },
    optionB: { label: "Beagle", emoji: "🐕" },
  },
  {
    id: "season",
    question: "Best hunting season?",
    optionA: { label: "Deer Season", emoji: "🦌" },
    optionB: { label: "Turkey Season", emoji: "🦃" },
  },
  {
    id: "friday-night",
    question: "Friday night tradition?",
    optionA: { label: "HS Football", emoji: "🏈" },
    optionB: { label: "Fish Fry", emoji: "🐟" },
  },
  {
    id: "snow-sport",
    question: "Winter weekend?",
    optionA: { label: "Ice Fishing", emoji: "❄️" },
    optionB: { label: "Snowmobile", emoji: "🏂" },
  },
  {
    id: "coffee-debate",
    question: "Morning coffee?",
    optionA: { label: "Gas Station", emoji: "⛽" },
    optionB: { label: "Home Brewed", emoji: "☕" },
  },
  {
    id: "cooler-brand",
    question: "Which cooler wins?",
    optionA: { label: "Yeti", emoji: "🧊" },
    optionB: { label: "RTIC", emoji: "🧊" },
  },
  {
    id: "pickup-bed",
    question: "Truck bed preference?",
    optionA: { label: "Bed Liner", emoji: "🛻" },
    optionB: { label: "Keep It Clean", emoji: "✨" },
  },
];
