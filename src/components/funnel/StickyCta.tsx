export function StickyCta({ label, href }: { label: string; href: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <a
        href={href}
        className="flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-bold tracking-wide text-ink-foreground"
      >
        {label}
      </a>
    </div>
  );
}
