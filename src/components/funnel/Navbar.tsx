import { Link } from "@tanstack/react-router";

import { brand } from "@/content/funnel";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-sm font-extrabold tracking-tight sm:text-base">{brand.name}</span>
          <span className="text-[10px] tracking-wide text-muted-foreground uppercase sm:text-[11px]">
            {brand.role}
          </span>
        </Link>
        <a
          href="#free-training"
          className="hidden rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-bold tracking-wide text-primary-foreground shadow-glow transition-all hover:brightness-105 sm:inline-flex"
        >
          FREE CLASS
        </a>
      </div>
    </header>
  );
}
