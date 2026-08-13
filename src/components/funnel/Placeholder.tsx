import { cn } from "@/lib/utils";

/**
 * Clearly labelled replaceable asset slot.
 * Owner: replace the corresponding entry in src/content/funnel.ts with a real asset.
 */
export function Placeholder({
  label,
  className,
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/60 p-6 text-center",
        ratio,
        className,
      )}
    >
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:text-sm">
        {label}
      </span>
    </div>
  );
}
