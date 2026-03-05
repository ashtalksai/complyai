export type Tier = "free" | "starter" | "pro" | "enterprise";
export type ScanStatus = "pending" | "scanning" | "complete" | "failed";
export type ChecklistStatus = "not_started" | "in_progress" | "complete";
export type Framework = "soc2" | "eu_ai_act";
export type Severity = "critical" | "high" | "medium" | "low";
export type PolicyType = "ai_usage" | "data_handling" | "model_governance";

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  tier: Tier;
  createdAt: string;
}

export interface ScanFinding {
  package: string;
  file: string;
  riskLevel: Severity;
  description: string;
}

export interface Scan {
  id: string;
  repoUrl: string;
  status: ScanStatus;
  findings: ScanFinding[];
  scannedAt: string;
}

export interface ChecklistItem {
  id: string;
  framework: Framework;
  text: string;
  status: ChecklistStatus;
  relatedToScan: boolean;
}

export interface Risk {
  id: string;
  category: string;
  severity: Severity;
  likelihood: number;
  impact: number;
  description: string;
  mitigation: string;
}

export interface Policy {
  id: string;
  type: PolicyType;
  title: string;
  content: string;
  generatedAt: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
