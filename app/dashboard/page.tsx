"use client";

import Link from "next/link";
import { ScanSearch, FileText, AlertTriangle, ArrowRight, GitBranch, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScoreRing } from "@/components/dashboard/score-ring";
import { mockScans } from "@/lib/mock-data";

const riskOverview = [
  { label: "Critical", count: 2, color: "bg-red-500" },
  { label: "High", count: 5, color: "bg-orange-500" },
  { label: "Medium", count: 12, color: "bg-yellow-500" },
  { label: "Low", count: 8, color: "bg-green-500" },
];

const quickActions = [
  { label: "New Scan", href: "/dashboard/scanner", icon: ScanSearch },
  { label: "Generate Policy", href: "/dashboard/policies", icon: FileText },
  { label: "View Risks", href: "/dashboard/risks", icon: AlertTriangle },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of your AI compliance posture</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Score */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <ScoreRing score={73} />
          </CardContent>
        </Card>

        {/* Risk Overview */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Risk Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {riskOverview.map((r) => (
                <div key={r.label} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                    <span className="text-xs text-slate-400">{r.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-white font-mono">{r.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <Button
                  variant="outline"
                  className="w-full justify-between border-slate-700 text-slate-300 hover:text-white hover:border-electric/30 mb-0"
                >
                  <span className="flex items-center gap-2">
                    <action.icon className="h-4 w-4 text-electric" />
                    {action.label}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base">Recent Scans</CardTitle>
          <Link href="/dashboard/scanner">
            <Button variant="ghost" size="sm" className="text-electric hover:text-electric/80">
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Repository</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Findings</TableHead>
                <TableHead className="text-slate-400">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScans.map((scan) => (
                <TableRow key={scan.id} className="border-slate-800">
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-slate-500" />
                      {scan.repoUrl.replace("github.com/", "")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        scan.status === "complete"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }
                    >
                      {scan.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 font-mono">{scan.findings.length}</TableCell>
                  <TableCell className="text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(scan.scannedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
