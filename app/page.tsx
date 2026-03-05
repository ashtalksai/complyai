import Link from "next/link";
import { Shield, ScanSearch, ClipboardCheck, AlertTriangle, FileText, Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTiers, testimonials } from "@/lib/mock-data";

const features = [
  {
    icon: ScanSearch,
    title: "GitHub Scanner",
    description: "Automatically detect AI dependencies, API keys, and compliance risks across your repositories.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Checklists",
    description: "Pre-built SOC 2 and EU AI Act checklists tailored for AI-first companies.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Visual risk matrix with AI-specific categories: model bias, data privacy, API exposure, and more.",
  },
  {
    icon: FileText,
    title: "Policy Generator",
    description: "Generate professional AI usage policies, data handling documents, and governance frameworks in seconds.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-navy/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-electric" />
            <span className="text-lg font-bold text-white">ComplyAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-electric hover:bg-electric/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-violet/5 to-transparent animate-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-electric/10 text-electric border-electric/20 px-4 py-1.5">
            Trusted by 200+ AI startups
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            AI compliance on{" "}
            <span className="bg-gradient-to-r from-electric to-violet bg-clip-text text-transparent">
              autopilot
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Scan your repositories for AI risks, track compliance across SOC 2 and EU AI Act,
            and generate policies — all from one dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-electric hover:bg-electric/90 text-white px-8 h-12 text-base">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:text-white px-8 h-12 text-base">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need for AI compliance
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From automated scanning to policy generation, ComplyAI handles the complexity so you can focus on building.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-slate-900/50 border-slate-800 hover:border-electric/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-electric/10 flex items-center justify-center mb-3">
                    <feature.icon className="h-6 w-6 text-electric" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-400">Start free. Scale as you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`bg-slate-900/50 border-slate-800 flex flex-col ${
                  tier.highlighted ? "border-electric ring-1 ring-electric/30 relative" : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-electric text-white border-0 px-3">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-white font-mono">{tier.price}</span>
                    <span className="text-slate-400">{tier.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="h-4 w-4 text-electric mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? "bg-electric hover:bg-electric/90 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by AI teams
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-slate-900/50 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-electric/10 to-violet/10 rounded-2xl border border-slate-800 p-12">
            <Shield className="h-12 w-12 text-electric mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to automate your AI compliance?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Join 200+ startups using ComplyAI to stay compliant without the overhead.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-electric hover:bg-electric/90 text-white px-8 h-12 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-electric" />
            <span className="text-sm text-slate-400">ComplyAI</span>
          </div>
          <p className="text-xs text-slate-500">&copy; 2024 ComplyAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
