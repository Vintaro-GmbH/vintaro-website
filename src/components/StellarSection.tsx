import { Card } from "@/components/ui/card";
import { Cpu, Zap, Shield, Sparkles, Brain, Rocket } from "lucide-react";
import { useState } from "react";

const stellarFeatures = [
  {
    icon: Brain,
    title: "Neural Networks",
    description: "Fortschrittliche KI-Modelle für präzise Vorhersagen",
    color: "from-primary to-accent",
    delay: "0ms",
  },
  {
    icon: Zap,
    title: "Lightning Speed",
    description: "Ultraschnelle Verarbeitung in Echtzeit",
    color: "from-accent to-secondary",
    delay: "100ms",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-Level Sicherheit für Ihre Daten",
    color: "from-secondary to-primary",
    delay: "200ms",
  },
  {
    icon: Cpu,
    title: "Smart Processing",
    description: "Intelligente Datenverarbeitung und Analyse",
    color: "from-primary to-secondary",
    delay: "300ms",
  },
  {
    icon: Sparkles,
    title: "Auto Optimization",
    description: "Selbstlernende Systeme für beste Ergebnisse",
    color: "from-accent to-primary",
    delay: "400ms",
  },
  {
    icon: Rocket,
    title: "Scalable",
    description: "Von Startup bis Enterprise - wir skalieren mit",
    color: "from-secondary to-accent",
    delay: "500ms",
  },
];

export const StellarSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="stellar" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-slide-in-up">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
            <span className="text-sm font-medium">Stellar Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Innovationen, die
            <br />
            <span className="text-glow-primary bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              begeistern
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie die Funktionen, die Vintaro zur führenden KI-Lösung machen
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stellarFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`glass-strong p-8 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
                  isHovered ? "glow-primary" : ""
                }`}
                style={{
                  animationDelay: feature.delay,
                  animation: "slide-in-up 0.8s ease-out",
                }}
              >
                {/* Icon with Gradient */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-6 transition-transform duration-500 ${
                    isHovered ? "rotate-12 scale-110" : ""
                  }`}
                >
                  <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                    <Icon
                      className={`w-8 h-8 text-primary transition-all duration-500 ${
                        isHovered ? "scale-110" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>

                {/* Animated Border on Hover */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-xl -z-10 animate-glow-pulse" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up">
          <p className="text-lg text-muted-foreground mb-6">
            Bereit, die Zukunft zu gestalten?
          </p>
          <button className="glass-strong px-8 py-4 rounded-xl font-semibold hover:glow-primary transition-all duration-300 group">
            Alle Features entdecken
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
