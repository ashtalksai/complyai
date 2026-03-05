import { Scan, ScanFinding, ChecklistItem, Risk, Policy, PricingTier, User } from "./types";

export const mockUser: User = {
  id: "usr_1",
  email: "alex@startupcorp.io",
  name: "Alex Chen",
  company: "StartupCorp",
  tier: "pro",
  createdAt: "2024-01-15T00:00:00Z",
};

export const mockScanFindings: ScanFinding[] = [
  { package: "openai", file: "src/services/chat.ts", riskLevel: "high", description: "OpenAI API client detected. Ensure API keys are stored securely and usage is logged for compliance auditing." },
  { package: "@anthropic-ai/sdk", file: "src/services/analyze.ts", riskLevel: "high", description: "Anthropic Claude SDK found. Review data retention policies and ensure PII is not sent to the API." },
  { package: "langchain", file: "src/agents/pipeline.ts", riskLevel: "critical", description: "LangChain orchestration framework detected. Complex AI pipelines require governance documentation and monitoring." },
  { package: "transformers", file: "ml/model_loader.py", riskLevel: "medium", description: "HuggingFace Transformers library. Verify model licenses and ensure no restricted training data usage." },
  { package: "pinecone-client", file: "src/db/vectors.ts", riskLevel: "medium", description: "Vector database client found. Ensure embedded data complies with data residency requirements." },
  { package: "replicate", file: "src/services/image-gen.ts", riskLevel: "high", description: "Replicate API usage detected. Third-party model hosting requires vendor risk assessment." },
  { package: "tensorflow", file: "ml/train.py", riskLevel: "medium", description: "TensorFlow detected. Custom model training requires documentation of training data provenance." },
  { package: "chromadb", file: "src/db/embeddings.ts", riskLevel: "low", description: "ChromaDB vector store. Local deployment reduces data exposure risk." },
];

export const mockScans: Scan[] = [
  { id: "scan_1", repoUrl: "github.com/startupcorp/ai-chatbot", status: "complete", findings: mockScanFindings.slice(0, 5), scannedAt: "2024-03-01T14:30:00Z" },
  { id: "scan_2", repoUrl: "github.com/startupcorp/ml-pipeline", status: "complete", findings: mockScanFindings.slice(3, 8), scannedAt: "2024-02-28T09:15:00Z" },
  { id: "scan_3", repoUrl: "github.com/startupcorp/data-api", status: "complete", findings: mockScanFindings.slice(0, 3), scannedAt: "2024-02-25T16:45:00Z" },
  { id: "scan_4", repoUrl: "github.com/startupcorp/frontend", status: "complete", findings: [], scannedAt: "2024-02-20T11:00:00Z" },
];

export const mockSOC2Items: ChecklistItem[] = [
  { id: "soc2_1", framework: "soc2", text: "Implement access controls for AI model endpoints", status: "complete", relatedToScan: true },
  { id: "soc2_2", framework: "soc2", text: "Document AI data processing activities", status: "complete", relatedToScan: true },
  { id: "soc2_3", framework: "soc2", text: "Establish incident response plan for AI failures", status: "in_progress", relatedToScan: false },
  { id: "soc2_4", framework: "soc2", text: "Configure audit logging for all AI API calls", status: "in_progress", relatedToScan: true },
  { id: "soc2_5", framework: "soc2", text: "Implement API key rotation policy", status: "complete", relatedToScan: true },
  { id: "soc2_6", framework: "soc2", text: "Define data retention policies for AI-generated content", status: "not_started", relatedToScan: false },
  { id: "soc2_7", framework: "soc2", text: "Conduct vendor risk assessment for AI providers", status: "in_progress", relatedToScan: true },
  { id: "soc2_8", framework: "soc2", text: "Establish change management process for AI models", status: "not_started", relatedToScan: false },
  { id: "soc2_9", framework: "soc2", text: "Implement encryption for data in transit to AI services", status: "complete", relatedToScan: true },
  { id: "soc2_10", framework: "soc2", text: "Create business continuity plan for AI service outages", status: "not_started", relatedToScan: false },
  { id: "soc2_11", framework: "soc2", text: "Document third-party AI sub-processors", status: "in_progress", relatedToScan: true },
  { id: "soc2_12", framework: "soc2", text: "Implement monitoring for AI model drift", status: "not_started", relatedToScan: false },
  { id: "soc2_13", framework: "soc2", text: "Establish secure SDLC practices for AI features", status: "complete", relatedToScan: false },
  { id: "soc2_14", framework: "soc2", text: "Define acceptable use policy for AI tools", status: "in_progress", relatedToScan: false },
];

export const mockEUAIActItems: ChecklistItem[] = [
  { id: "eu_1", framework: "eu_ai_act", text: "Classify AI systems by risk category (minimal/limited/high/unacceptable)", status: "complete", relatedToScan: true },
  { id: "eu_2", framework: "eu_ai_act", text: "Implement transparency requirements for AI-generated content", status: "in_progress", relatedToScan: true },
  { id: "eu_3", framework: "eu_ai_act", text: "Document technical specifications of AI models in use", status: "in_progress", relatedToScan: true },
  { id: "eu_4", framework: "eu_ai_act", text: "Establish human oversight mechanisms for high-risk AI", status: "not_started", relatedToScan: false },
  { id: "eu_5", framework: "eu_ai_act", text: "Conduct fundamental rights impact assessment", status: "not_started", relatedToScan: false },
  { id: "eu_6", framework: "eu_ai_act", text: "Implement data governance measures for training data", status: "in_progress", relatedToScan: true },
  { id: "eu_7", framework: "eu_ai_act", text: "Create risk management system documentation", status: "complete", relatedToScan: false },
  { id: "eu_8", framework: "eu_ai_act", text: "Ensure AI system accuracy, robustness, and cybersecurity", status: "not_started", relatedToScan: true },
  { id: "eu_9", framework: "eu_ai_act", text: "Implement record-keeping for AI system operations", status: "in_progress", relatedToScan: false },
  { id: "eu_10", framework: "eu_ai_act", text: "Provide clear instructions for AI system deployment", status: "complete", relatedToScan: false },
  { id: "eu_11", framework: "eu_ai_act", text: "Establish conformity assessment procedures", status: "not_started", relatedToScan: false },
  { id: "eu_12", framework: "eu_ai_act", text: "Register high-risk AI systems in EU database", status: "not_started", relatedToScan: false },
  { id: "eu_13", framework: "eu_ai_act", text: "Implement bias detection and mitigation measures", status: "in_progress", relatedToScan: true },
  { id: "eu_14", framework: "eu_ai_act", text: "Define post-market monitoring procedures", status: "not_started", relatedToScan: false },
  { id: "eu_15", framework: "eu_ai_act", text: "Ensure GDPR alignment for AI data processing", status: "complete", relatedToScan: true },
];

export const mockRisks: Risk[] = [
  { id: "risk_1", category: "Data Privacy", severity: "critical", likelihood: 4, impact: 5, description: "PII data being sent to third-party AI APIs without proper anonymization. Customer data in prompts may be retained by AI providers.", mitigation: "Implement PII detection and redaction pipeline before sending data to AI APIs. Review data processing agreements with all AI vendors." },
  { id: "risk_2", category: "API Key Exposure", severity: "critical", likelihood: 3, impact: 5, description: "Hardcoded API keys found in repository for OpenAI and Anthropic services. Keys have broad permissions without usage limits.", mitigation: "Rotate all exposed keys immediately. Implement secrets management (e.g., AWS Secrets Manager). Add pre-commit hooks to prevent key commits." },
  { id: "risk_3", category: "Model Bias", severity: "high", likelihood: 4, impact: 4, description: "AI chatbot responses show demographic bias in customer support interactions. No bias testing framework is in place.", mitigation: "Implement bias evaluation metrics. Use diverse test datasets. Add human review for edge cases. Document bias testing procedures." },
  { id: "risk_4", category: "Third-party AI Dependencies", severity: "high", likelihood: 3, impact: 4, description: "Heavy reliance on single AI vendor (OpenAI) without fallback. Service disruptions would halt core product features.", mitigation: "Implement multi-provider abstraction layer. Add fallback to Anthropic/local models. Define SLA requirements in vendor agreements." },
  { id: "risk_5", category: "Model Governance", severity: "high", likelihood: 3, impact: 4, description: "No version tracking for AI model configurations and prompts. Unable to reproduce or audit past AI decisions.", mitigation: "Implement prompt versioning system. Log all model parameters per request. Create model registry with approval workflow." },
  { id: "risk_6", category: "Training Data Compliance", severity: "high", likelihood: 4, impact: 3, description: "Custom fine-tuning uses customer data without explicit consent for model training. Unclear data lineage for training datasets.", mitigation: "Obtain explicit consent for training data usage. Implement data lineage tracking. Ensure right to deletion includes training data." },
  { id: "risk_7", category: "Data Privacy", severity: "high", likelihood: 3, impact: 4, description: "Vector database stores customer embeddings without encryption at rest. Embedding inversion attacks could expose original data.", mitigation: "Enable encryption at rest for vector stores. Implement access controls on embedding collections. Regular security audits of vector infrastructure." },
  { id: "risk_8", category: "Model Bias", severity: "medium", likelihood: 3, impact: 3, description: "Content generation model produces inconsistent quality across languages. Non-English outputs have higher error rates.", mitigation: "Add multilingual quality metrics. Implement language-specific evaluation pipelines. Consider dedicated models for key languages." },
  { id: "risk_9", category: "Third-party AI Dependencies", severity: "medium", likelihood: 2, impact: 3, description: "Using deprecated model versions that may be removed without notice. No monitoring for provider deprecation announcements.", mitigation: "Subscribe to provider changelogs. Implement model version monitoring. Plan migration timeline for deprecated models." },
  { id: "risk_10", category: "Model Governance", severity: "low", likelihood: 2, impact: 2, description: "AI-generated content is not labeled as such in user-facing interfaces. May conflict with upcoming transparency regulations.", mitigation: "Add AI disclosure labels to all generated content. Implement metadata tagging for AI outputs. Review against EU AI Act transparency requirements." },
];

export const mockPolicies: Policy[] = [
  {
    id: "pol_1",
    type: "ai_usage",
    title: "AI Usage Policy",
    generatedAt: "2024-02-20T10:00:00Z",
    content: `# AI Usage Policy

## 1. Purpose and Scope

This policy establishes guidelines for the responsible use of artificial intelligence (AI) systems within StartupCorp. It applies to all employees, contractors, and third-party partners who develop, deploy, or interact with AI systems as part of their work.

## 2. Definitions

- **AI System**: Any software that uses machine learning, natural language processing, computer vision, or other AI techniques to perform tasks.
- **Foundation Model**: Large pre-trained models (e.g., GPT-4, Claude) used as a base for applications.
- **AI-Generated Content**: Any text, image, code, or other output produced by an AI system.

## 3. Approved AI Tools and Services

The following AI services are approved for business use:
- OpenAI API (GPT-4, GPT-4 Turbo) for customer-facing features
- Anthropic Claude for internal analysis and content generation
- HuggingFace models for on-premise NLP tasks
- Custom fine-tuned models deployed on our infrastructure

All other AI tools require approval from the Engineering Lead and Compliance Officer before use.

## 4. Data Handling Requirements

### 4.1 Prohibited Data in AI Prompts
- Social Security Numbers, financial account numbers
- Protected health information (PHI)
- Passwords, API keys, or authentication tokens
- Customer data without explicit processing consent

### 4.2 Data Classification
All data sent to AI services must be classified according to our data classification framework:
- **Public**: May be sent to any approved AI service
- **Internal**: May be sent to approved services with encryption in transit
- **Confidential**: Requires anonymization before AI processing
- **Restricted**: Must not be sent to external AI services under any circumstances

## 5. Development Guidelines

### 5.1 Prompt Engineering
- All production prompts must be version-controlled
- System prompts must include safety guardrails
- Prompt injection defenses must be implemented and tested
- Output validation must be performed before displaying to users

### 5.2 Model Selection
- Prefer the most recent stable model versions
- Document model selection rationale
- Maintain fallback options for critical features
- Test with multiple models before production deployment

## 6. Monitoring and Logging

All AI API calls must be logged with:
- Timestamp and request ID
- Model identifier and version
- Token usage and estimated cost
- Response latency
- Error codes (if applicable)

Logs must be retained for a minimum of 12 months for compliance auditing.

## 7. Incident Response

AI-related incidents (hallucinations, bias, security breaches) must be reported immediately to the Compliance team. The incident response process includes:
1. Immediate containment (disable affected feature if necessary)
2. Root cause analysis within 24 hours
3. Remediation plan within 72 hours
4. Post-incident review and policy updates

## 8. Compliance and Review

This policy will be reviewed quarterly and updated as regulations evolve. All AI developers must complete annual AI ethics and compliance training.

*Last updated: March 2024*
*Policy owner: Compliance Team*
*Next review: June 2024*`,
  },
  {
    id: "pol_2",
    type: "data_handling",
    title: "AI Data Handling Policy",
    generatedAt: "2024-02-18T14:30:00Z",
    content: `# AI Data Handling Policy

## 1. Purpose

This policy defines how StartupCorp collects, processes, stores, and disposes of data used in conjunction with AI systems. It ensures compliance with GDPR, CCPA, and emerging AI-specific regulations.

## 2. Data Collection

### 2.1 Consent Requirements
- Explicit consent must be obtained before using customer data for AI processing
- Consent forms must clearly state that AI/ML systems will process the data
- Users must be informed of the specific AI use cases for their data
- Opt-out mechanisms must be readily available and functional

### 2.2 Data Minimization
- Collect only the minimum data necessary for the AI function
- Remove unnecessary fields before sending to AI services
- Implement automatic data masking for sensitive fields
- Regular audits to identify and remove unnecessary data collection

## 3. Data Processing

### 3.1 Processing Boundaries
- Customer data must be processed within approved geographic regions
- Cross-border data transfers require legal review and appropriate safeguards
- AI vendor data processing agreements must be reviewed annually
- Sub-processor lists must be maintained and updated

### 3.2 Anonymization and Pseudonymization
- PII must be anonymized before use in model training
- Pseudonymization is required for analytics and reporting
- Re-identification risk assessments must be conducted quarterly
- Anonymization techniques must be documented and validated

## 4. Data Storage

### 4.1 Encryption Standards
- All AI training data must be encrypted at rest (AES-256)
- Data in transit to AI APIs must use TLS 1.3
- Vector embeddings must be stored in encrypted databases
- Encryption keys must be managed through a dedicated KMS

### 4.2 Retention Periods
- AI interaction logs: 12 months
- Model training datasets: Duration of model lifecycle + 6 months
- Generated content: Per customer retention settings
- Audit trails: 7 years minimum

## 5. Data Disposal

### 5.1 Deletion Procedures
- Honor data deletion requests within 30 days
- Ensure deletion from all AI training datasets and vector stores
- Verify deletion from AI vendor systems per DPA terms
- Document deletion confirmation for compliance records

### 5.2 Model Unlearning
- When data subjects request deletion, assess impact on trained models
- Implement model retraining procedures if fine-tuned on deleted data
- Maintain data lineage to trace which data influenced which models

## 6. Third-Party AI Vendors

### 6.1 Vendor Assessment
- Complete vendor risk assessment before onboarding AI providers
- Review data processing addendums (DPAs) annually
- Monitor vendor security certifications (SOC 2, ISO 27001)
- Maintain exit strategy for each AI vendor

### 6.2 Data Sharing Agreements
- No customer data shared with AI vendors without DPA in place
- Vendors must not use our data to train their general models
- Audit rights must be included in all AI vendor contracts
- Sub-processor notification requirements must be established

## 7. Compliance Monitoring

- Monthly data processing activity reviews
- Quarterly data protection impact assessments for AI features
- Annual comprehensive audit of AI data handling practices
- Continuous monitoring of regulatory changes affecting AI data use

*Last updated: February 2024*
*Policy owner: Data Protection Officer*
*Next review: May 2024*`,
  },
  {
    id: "pol_3",
    type: "model_governance",
    title: "AI Model Governance Document",
    generatedAt: "2024-02-15T09:00:00Z",
    content: `# AI Model Governance Framework

## 1. Overview

This document establishes the governance framework for all AI and machine learning models developed, deployed, or integrated by StartupCorp. It defines roles, responsibilities, processes, and standards for the entire model lifecycle.

## 2. Governance Structure

### 2.1 AI Governance Committee
- **Chair**: Chief Technology Officer
- **Members**: Engineering Lead, Data Science Lead, Compliance Officer, Product Manager
- **Meeting Cadence**: Monthly, with ad-hoc sessions for critical issues
- **Responsibilities**: Model approval, risk oversight, policy updates

### 2.2 Model Owner Responsibilities
Each AI model must have a designated owner responsible for:
- Model documentation and registry maintenance
- Performance monitoring and drift detection
- Compliance with this governance framework
- Incident response coordination

## 3. Model Lifecycle Management

### 3.1 Development Phase
- Define clear business objectives and success metrics
- Document training data sources, preprocessing, and augmentation
- Implement version control for code, data, and model artifacts
- Conduct bias and fairness assessments before deployment

### 3.2 Validation Phase
- Independent model validation by a team other than developers
- Performance testing against defined benchmarks
- Security assessment including adversarial testing
- Compliance review against applicable regulations

### 3.3 Deployment Phase
- Staged rollout (canary > limited > full deployment)
- A/B testing against baseline where applicable
- Automated monitoring and alerting setup
- Rollback procedures documented and tested

### 3.4 Monitoring Phase
- Real-time performance metric tracking
- Weekly drift detection analysis
- Monthly bias and fairness re-evaluation
- Quarterly comprehensive model review

### 3.5 Retirement Phase
- Formal deprecation notice (minimum 90 days)
- Migration plan to replacement model
- Data and artifact archival procedures
- Post-retirement audit trail maintenance

## 4. Model Registry

All AI models must be registered in the central model registry with:
- Unique model identifier and version
- Business purpose and use case description
- Training data summary and data lineage
- Performance metrics and validation results
- Risk classification and compliance status
- Owner and stakeholder information

## 5. Risk Classification

### 5.1 Risk Levels
- **Low Risk**: Internal tools, non-customer-facing, limited data sensitivity
- **Medium Risk**: Customer-facing features, moderate data sensitivity
- **High Risk**: Decision-making systems, sensitive data, regulated domains
- **Critical Risk**: Autonomous decisions affecting rights, safety, or finances

### 5.2 Controls by Risk Level
| Control | Low | Medium | High | Critical |
|---------|-----|--------|------|----------|
| Documentation | Basic | Detailed | Comprehensive | Comprehensive + External Review |
| Testing | Standard | Enhanced | Rigorous | Rigorous + Third-party Audit |
| Monitoring | Weekly | Daily | Real-time | Real-time + Human Oversight |
| Review Cadence | Quarterly | Monthly | Bi-weekly | Weekly |

## 6. Ethical Guidelines

- AI systems must not discriminate based on protected characteristics
- Transparency in AI decision-making must be maintained
- Human oversight must be available for all high-risk decisions
- User privacy must be respected throughout the model lifecycle
- AI systems must include appropriate disclaimers and disclosures

## 7. Compliance Requirements

- Maintain alignment with EU AI Act risk categories
- Ensure SOC 2 Type II controls cover AI operations
- GDPR Article 22 compliance for automated decision-making
- Regular regulatory horizon scanning for new AI regulations

*Last updated: February 2024*
*Document owner: AI Governance Committee*
*Next review: May 2024*`,
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with basic AI compliance scanning",
    features: ["1 repository", "Basic dependency scan", "Community support", "Basic risk overview"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Essential compliance tools for small teams",
    features: ["5 repositories", "SOC2 checklist", "Weekly scans", "Email support", "Basic risk matrix", "Compliance dashboard"],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/month",
    description: "Complete compliance suite for growing companies",
    features: ["25 repositories", "All compliance frameworks", "Daily scans", "Risk matrix & assessment", "Policy generator", "Priority support", "Slack integration", "Custom reports"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "/month",
    description: "Unlimited scale with dedicated support",
    features: ["Unlimited repositories", "Custom policy templates", "Real-time scanning", "Dedicated account manager", "SSO & SAML", "Custom integrations", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const testimonials = [
  {
    name: "Sarah Kim",
    role: "CTO",
    company: "DataFlow AI",
    quote: "ComplyAI saved us months of work preparing for our SOC 2 audit. The automated scanning caught dependencies we didn't even know about.",
  },
  {
    name: "Marcus Rivera",
    role: "VP Engineering",
    company: "NeuralStack",
    quote: "We went from zero compliance documentation to audit-ready in 3 weeks. The policy generator alone is worth the price of admission.",
  },
  {
    name: "Priya Patel",
    role: "CTO",
    company: "Synthex",
    quote: "As an AI-first startup, compliance felt overwhelming. ComplyAI turned it into a manageable, automated workflow. Essential tool for any AI company.",
  },
];
