"use client";

import { useState } from "react";
import { FileText, Loader2, Download, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { mockPolicies } from "@/lib/mock-data";
import type { Policy, PolicyType } from "@/lib/types";

function renderMarkdown(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("# ")) {
      return <h1 key={i} className="text-2xl font-bold text-white mt-6 mb-3">{line.replace("# ", "")}</h1>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={i} className="text-xl font-semibold text-white mt-5 mb-2">{line.replace("## ", "")}</h2>;
    }
    if (line.startsWith("### ")) {
      return <h3 key={i} className="text-lg font-medium text-white mt-4 mb-2">{line.replace("### ", "")}</h3>;
    }
    if (line.startsWith("- **")) {
      const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
      if (match) {
        return (
          <li key={i} className="text-sm text-slate-300 ml-4 mb-1">
            <strong className="text-white">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}
          </li>
        );
      }
    }
    if (line.startsWith("- ")) {
      return <li key={i} className="text-sm text-slate-300 ml-4 mb-1">{line.replace("- ", "")}</li>;
    }
    if (line.startsWith("| ")) {
      return <p key={i} className="text-xs text-slate-400 font-mono mb-0.5">{line}</p>;
    }
    if (line.startsWith("*") && line.endsWith("*")) {
      return <p key={i} className="text-xs text-slate-500 italic mt-4">{line.replace(/\*/g, "")}</p>;
    }
    if (line.match(/^\d+\./)) {
      return <li key={i} className="text-sm text-slate-300 ml-4 mb-1 list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
    }
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }
    return <p key={i} className="text-sm text-slate-300 leading-relaxed mb-1">{line}</p>;
  });
}

export default function PoliciesPage() {
  const [selectedType, setSelectedType] = useState<PolicyType>("ai_usage");
  const [generating, setGenerating] = useState(false);
  const [activePolicy, setActivePolicy] = useState<Policy>(mockPolicies[0]);
  const [history] = useState<Policy[]>(mockPolicies);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const existing = mockPolicies.find((p) => p.type === selectedType);
      if (existing) {
        setActivePolicy(existing);
      }
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Policy Generator</h1>
        <p className="text-slate-400 text-sm mt-1">Generate professional compliance policies with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - History */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Generate New</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={selectedType} onValueChange={(v) => setSelectedType(v as PolicyType)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="ai_usage">AI Usage Policy</SelectItem>
                  <SelectItem value="data_handling">Data Handling Policy</SelectItem>
                  <SelectItem value="model_governance">Model Governance</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleGenerate}
                className="w-full bg-electric hover:bg-electric/90 text-white"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Policy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {history.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => setActivePolicy(policy)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activePolicy.id === policy.id
                      ? "bg-electric/10 border border-electric/20"
                      : "bg-slate-800/30 border border-transparent hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-3.5 w-3.5 text-electric" />
                    <span className="text-xs text-white font-medium truncate">{policy.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-5">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span className="text-xs text-slate-500">
                      {new Date(policy.generatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Policy Viewer */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">{activePolicy.title}</CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Generated on {new Date(activePolicy.generatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardHeader>
            <Separator className="bg-slate-800" />
            <CardContent className="pt-6 max-h-[70vh] overflow-y-auto">
              {generating ? (
                <div className="flex flex-col items-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-electric mb-4" />
                  <p className="text-white font-medium">Generating policy...</p>
                  <p className="text-slate-400 text-sm mt-1">Analyzing your compliance requirements</p>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  {renderMarkdown(activePolicy.content)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
