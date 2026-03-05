"use client";

import { useState } from "react";
import { ClipboardCheck, ScanSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockSOC2Items, mockEUAIActItems } from "@/lib/mock-data";
import type { ChecklistItem, ChecklistStatus } from "@/lib/types";

const statusColors: Record<ChecklistStatus, string> = {
  complete: "bg-green-500/10 text-green-400 border-green-500/20",
  in_progress: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  not_started: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const statusLabels: Record<ChecklistStatus, string> = {
  complete: "Complete",
  in_progress: "In Progress",
  not_started: "Not Started",
};

function ChecklistSection({ items: initialItems }: { items: ChecklistItem[] }) {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "complete" ? "not_started" : "complete" as ChecklistStatus }
          : item
      )
    );
  };

  const completedCount = items.filter((i) => i.status === "complete").length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400">
              {completedCount} of {items.length} items complete
            </span>
            <span className="text-sm font-mono text-white">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-slate-800" />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="bg-slate-900/50 border-slate-800">
            <CardContent className="py-4 px-5">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={item.status === "complete"}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="mt-0.5 border-slate-600 data-[state=checked]:bg-electric data-[state=checked]:border-electric"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${item.status === "complete" ? "text-slate-500 line-through" : "text-white"}`}>
                    {item.text}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className={statusColors[item.status]}>
                      {statusLabels[item.status]}
                    </Badge>
                    {item.relatedToScan && (
                      <Badge variant="secondary" className="bg-electric/10 text-electric border-electric/20">
                        <ScanSearch className="h-3 w-3 mr-1" />
                        Scan Finding
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Compliance Checklists</h1>
        <p className="text-slate-400 text-sm mt-1">Track your compliance progress across frameworks</p>
      </div>

      <Tabs defaultValue="soc2" className="space-y-6">
        <TabsList className="bg-slate-900/50 border border-slate-800">
          <TabsTrigger value="soc2" className="data-[state=active]:bg-electric data-[state=active]:text-white">
            <ClipboardCheck className="h-4 w-4 mr-1.5" />
            SOC 2
          </TabsTrigger>
          <TabsTrigger value="eu_ai_act" className="data-[state=active]:bg-electric data-[state=active]:text-white">
            <ClipboardCheck className="h-4 w-4 mr-1.5" />
            EU AI Act
          </TabsTrigger>
        </TabsList>
        <TabsContent value="soc2">
          <ChecklistSection items={mockSOC2Items} />
        </TabsContent>
        <TabsContent value="eu_ai_act">
          <ChecklistSection items={mockEUAIActItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
