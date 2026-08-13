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
    <div className="bg-gradient-card rounded-2xl border border-border p-6 shadow-card transition-all hover:border-primary/50">
      <span className="text-xs font-bold tracking-[0.2em] text-primary">{no}</span>
      <h3 className="text-mal mt-3 text-base font-bold sm:text-lg">{title}</h3>
      <p className="text-mal mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
