"use client";

import { cn } from "@/lib/utils";
import type { Risk } from "@/lib/types";

interface RiskMatrixProps {
  risks: Risk[];
}

const cellColor = (likelihood: number, impact: number) => {
  const score = likelihood * impact;
  if (score >= 16) return "bg-red-500/30 border-red-500/50";
  if (score >= 9) return "bg-orange-500/25 border-orange-500/40";
  if (score >= 4) return "bg-yellow-500/20 border-yellow-500/35";
  return "bg-green-500/15 border-green-500/30";
};

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const getRisksInCell = (likelihood: number, impact: number) =>
    risks.filter((r) => r.likelihood === likelihood && r.impact === impact);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[400px]">
        <div className="flex items-end mb-2">
          <div className="w-20" />
          <div className="flex-1 text-center text-xs text-slate-400 font-medium uppercase tracking-wider">
            Impact
          </div>
        </div>
        <div className="flex">
          <div className="w-20 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider -rotate-90 whitespace-nowrap">
              Likelihood
            </span>
          </div>
          <div className="flex-1 grid grid-cols-5 gap-1">
            {[5, 4, 3, 2, 1].map((likelihood) =>
              [1, 2, 3, 4, 5].map((impact) => {
                const cellRisks = getRisksInCell(likelihood, impact);
                return (
                  <div
                    key={`${likelihood}-${impact}`}
                    className={cn(
                      "aspect-square rounded-md border flex items-center justify-center text-xs font-mono relative group",
                      cellColor(likelihood, impact)
                    )}
                    title={cellRisks.map((r) => r.category).join(", ") || undefined}
                  >
                    {cellRisks.length > 0 && (
                      <span className="text-white font-bold">{cellRisks.length}</span>
                    )}
                  </div>
                );
              })
            )}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={`label-${i}`} className="text-center text-xs text-slate-500 mt-1 font-mono">
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
