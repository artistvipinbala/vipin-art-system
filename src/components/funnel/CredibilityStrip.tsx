import { credibility } from "@/content/funnel";

export function CredibilityStrip() {
  const items = credibility.filter((c) => c.value.trim() !== "");
  if (items.length === 0) return null;

  return (
    <div className="border-b border-border/60 bg-card/40 px-5 py-6 sm:px-8">
      <dl className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 text-center md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="block text-2xl font-extrabold text-primary sm:text-3xl">
                {item.value}
              </span>
              <span className="mt-1 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {item.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
