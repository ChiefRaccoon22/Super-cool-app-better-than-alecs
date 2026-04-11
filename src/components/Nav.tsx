"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, ArrowLeftRight, TreePine, Trophy } from "lucide-react";

const tabs = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/button", label: "THE BUTTON", icon: Zap },
  { href: "/rate", label: "RATE IT", icon: ArrowLeftRight },
  { href: "/spread", label: "SPREAD", icon: TreePine },
  { href: "/achievements", label: "WINS", icon: Trophy },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-mw-navy border-t-2 border-mw-gold/40 safe-area-bottom">
      <div className="flex items-stretch">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all duration-150 ${
                active
                  ? "text-mw-gold border-t-2 border-mw-gold -mt-px"
                  : "text-mw-cream/50 hover:text-mw-cream/80 border-t-2 border-transparent -mt-px"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="font-display text-[9px] tracking-wider leading-none">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
