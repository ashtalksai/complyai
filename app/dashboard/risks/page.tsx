"use client";

import { useState } from "react";
import { AlertTriangle, Filter, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RiskMatrix } from "@/components/dashboard/risk-matrix";
import { mockRisks } from "@/lib/mock-data";
import type { Severity } from "@/lib/types";

const severityColors: Record<Severity, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/10 text-green-400 border-green-500/20",
};

const severityIcons: Record<Severity, string> = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-yellow-400",
  low: "text-green-400",
};

export default function RisksPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredRisks = filter === "all" ? mockRisks : mockRisks.filter((r) => r.severity === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Risk Assessment</h1>
        <p className="text-slate-400 text-sm mt-1">AI-specific risk analysis and mitigation tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Matrix */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Risk Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskMatrix risks={mockRisks} />
          </CardContent>
        </Card>

        {/* Risk Summary */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Risk Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {(["critical", "high", "medium", "low"] as Severity[]).map((severity) => {
                const count = mockRisks.filter((r) => r.severity === severity).length;
                return (
                  <div key={severity} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldAlert className={`h-4 w-4 ${severityIcons[severity]}`} />
                      <span className="text-xs text-slate-400 capitalize">{severity}</span>
                    </div>
                    <span className="text-2xl font-bold text-white font-mono">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
              <p className="text-xs text-slate-400">
                <strong className="text-slate-300">Categories covered:</strong> Data Privacy, API Key Exposure, Model Bias,
                Third-party AI Dependencies, Model Governance, Training Data Compliance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-slate-400" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48 bg-slate-900/50 border-slate-700 text-white">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-slate-400">{filteredRisks.length} risks</span>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <Card key={risk.id} className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${severityIcons[risk.severity]}`} />
                  <div>
                    <span className="text-white font-medium">{risk.category}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={severityColors[risk.severity]}>
                        {risk.severity}
                      </Badge>
                      <span className="text-xs text-slate-500 font-mono">
                        L:{risk.likelihood} I:{risk.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 ml-8">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{risk.description}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mitigation</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{risk.mitigation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
