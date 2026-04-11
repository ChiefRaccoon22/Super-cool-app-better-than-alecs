"use client";

import confetti from "canvas-confetti";

export function fireCommonConfetti(): void {
  confetti({
    particleCount: 40,
    spread: 50,
    origin: { y: 0.6 },
    colors: ["#2D5016", "#C75B1A", "#F5E6C8"],
  });
}

export function fireRareConfetti(): void {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#D4A017", "#C0392B", "#F5E6C8", "#2D5016"],
    scalar: 1.2,
  });
}

export function fireLegendaryConfetti(): void {
  const duration = 1500;
  const animationEnd = Date.now() + duration;
  const colors = ["#D4A017", "#C0392B", "#F5E6C8", "#2D5016", "#1B2A4A", "#C75B1A"];

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      scalar: 1.4,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      scalar: 1.4,
    });
    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

export function fireAchievementConfetti(): void {
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: ["#D4A017", "#C75B1A", "#F5E6C8"],
  });
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: ["#D4A017", "#C75B1A", "#F5E6C8"],
  });
}

export function fireUnlockConfetti(x: number, y: number): void {
  confetti({
    particleCount: 30,
    spread: 40,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
    colors: ["#D4A017", "#2D5016", "#C75B1A"],
    scalar: 0.8,
  });
}
