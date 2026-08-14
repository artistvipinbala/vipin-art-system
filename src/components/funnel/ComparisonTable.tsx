import { Check, Minus } from "lucide-react";

import { offers } from "@/content/funnel";

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-surface">
          <tr>
            <th className="px-4 py-4 font-bold sm:px-6">Feature</th>
            <th className="px-3 py-4 text-center font-bold text-muted-foreground sm:px-6">
              Doing it alone
            </th>
            <th className="px-3 py-4 text-center font-bold sm:px-6">Self-Paced</th>
            <th className="px-3 py-4 text-center font-bold text-primary sm:px-6">
              Personal Support
            </th>
          </tr>
        </thead>
        <tbody>
          {offers.comparison.map((row) => (
            <tr key={row.feature} className="border-t border-border">
              <td className="px-4 py-4 sm:px-6">{row.feature}</td>
              <td className="px-3 py-4 sm:px-6">
                <Cell on={row.alone} />
              </td>
              <td className="px-3 py-4 sm:px-6">
                <Cell on={row.self} />
              </td>
              <td className="px-3 py-4 sm:px-6">
                <Cell on={row.support} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ on }: { on: boolean }) {
  return (
    <span className="flex justify-center">
      {on ? (
        <Check className="h-5 w-5 text-primary" aria-label="Included" />
      ) : (
        <Minus className="h-5 w-5 text-muted-foreground/60" aria-label="Not included" />
      )}
    </span>
  );
}
