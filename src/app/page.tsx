import { CreatePasteForm } from "@/components/CreatePasteForm";
import {
  Zap,
  Shield,
  Clock,
  Flame,
  Code2,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Code2,
    title: "Syntax Highlighting",
    description:
      "Support for 40+ languages with beautiful syntax highlighting.",
  },
  {
    icon: Clock,
    title: "Auto Expiry",
    description: "Set pastes to expire after 10 minutes, 1 hour, or never.",
  },
  {
    icon: Shield,
    title: "Password Protection",
    description: "Optional password to keep sensitive pastes secure.",
  },
  {
    icon: Flame,
    title: "Burn After Read",
    description: "Self-destructing pastes that delete after first view.",
  },
  {
    icon: Globe,
    title: "Privacy Controls",
    description: "Public, unlisted, or private — you choose visibility.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant paste creation with clean, minimal interface.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Built for developers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Share code snippets
              <br />
              <span className="gradient-text">with confidence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A modern pastebin for developers. Syntax highlighting, expiry
              timers, password protection, and burn-after-read — all in a clean,
              minimal interface.
            </p>
          </div>

          {/* Quick features */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {features.slice(0, 4).map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {feature.title}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Create Form */}
      <section className="relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="p-6 sm:p-8 bg-card/50 border border-border rounded-2xl backdrop-blur-sm">
            <CreatePasteForm />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything you need to share code
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            EnoPaste is designed to be the developer&apos;s go-to tool for
            sharing code snippets, logs, configuration files, and any text
            content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative p-8 sm:p-12 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to share your code?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            No sign-up required. Start pasting and sharing immediately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              View Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
