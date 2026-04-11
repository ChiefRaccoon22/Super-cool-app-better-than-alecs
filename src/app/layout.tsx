import type { Metadata } from "next";
import "./globals.css";
import { GameStateProvider } from "@/lib/gameState";
import Nav from "@/components/Nav";
import PointsCounter from "@/components/PointsCounter";
import AchievementToast from "@/components/AchievementToast";

export const metadata: Metadata = {
  title: "MIDWEST MODE",
  description: "The most unhinged dopamine machine in the flyover states.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-mw-navy bg-texture min-h-screen">
        <GameStateProvider>
          <PointsCounter />
          <AchievementToast />
          <main className="pb-20 min-h-screen">{children}</main>
          <Nav />
        </GameStateProvider>
      </body>
    </html>
  );
}
