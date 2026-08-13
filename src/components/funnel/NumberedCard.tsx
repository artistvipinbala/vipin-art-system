export function NumberedCard({
  no,
  title,
  text,
}: {
  no: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-card">
      <span className="text-xs font-bold tracking-[0.2em] text-primary">{no}</span>
      <h3 className="text-mal mt-3 text-base font-bold sm:text-lg">{title}</h3>
      <p className="text-mal mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
