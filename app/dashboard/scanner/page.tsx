"use client";

import { useState } from "react";
import { ScanSearch, CheckCircle, Loader2, Package, FileCode, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockScanFindings } from "@/lib/mock-data";
import type { ScanFinding, Severity } from "@/lib/types";

const severityColors: Record<Severity, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function ScannerPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<ScanFinding[] | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    setScanning(true);
    setResults(null);
    setTimeout(() => {
      setScanning(false);
      setResults(mockScanFindings);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">GitHub Scanner</h1>
        <p className="text-slate-400 text-sm mt-1">Scan repositories for AI dependencies and compliance risks</p>
      </div>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="pt-6">
          <form onSubmit={handleScan} className="flex gap-3">
            <div className="flex-1 relative">
              <ScanSearch className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input
                placeholder="https://github.com/your-org/your-repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button type="submit" className="bg-electric hover:bg-electric/90 text-white px-6" disabled={scanning}>
              {scanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Scan Repository"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {scanning && (
        <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center py-8">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-electric/20" />
                <div className="absolute inset-0 rounded-full border-2 border-electric border-t-transparent animate-spin" />
                <ScanSearch className="absolute inset-0 m-auto h-8 w-8 text-electric" />
              </div>
              <p className="text-white font-medium">Scanning repository...</p>
              <p className="text-slate-400 text-sm mt-1">Analyzing dependencies and configuration files</p>
              <div className="w-full max-w-xs mt-6 space-y-2">
                {["Cloning repository...", "Analyzing package.json...", "Scanning Python requirements...", "Checking for API keys..."].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 text-xs text-slate-400">
                    {i < 2 ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-electric" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-white font-medium">Scan Complete</span>
              <span className="text-slate-400 text-sm">— {results.length} findings</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className={severityColors.critical}>
                {results.filter((r) => r.riskLevel === "critical").length} Critical
              </Badge>
              <Badge variant="secondary" className={severityColors.high}>
                {results.filter((r) => r.riskLevel === "high").length} High
              </Badge>
              <Badge variant="secondary" className={severityColors.medium}>
                {results.filter((r) => r.riskLevel === "medium").length} Medium
              </Badge>
              <Badge variant="secondary" className={severityColors.low}>
                {results.filter((r) => r.riskLevel === "low").length} Low
              </Badge>
            </div>
          </div>

          {results.map((finding, i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-electric" />
                        <span className="text-white font-medium font-mono">{finding.package}</span>
                      </div>
                      <Badge variant="secondary" className={severityColors[finding.riskLevel]}>
                        {finding.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <FileCode className="h-3.5 w-3.5 text-slate-500" />
                      <span className="text-xs text-slate-400 font-mono">{finding.file}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-300 leading-relaxed">{finding.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!scanning && !results && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="py-16">
            <div className="text-center">
              <ScanSearch className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No scans yet</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Enter a GitHub repository URL above to scan for AI dependencies, API key exposure, and compliance risks.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
