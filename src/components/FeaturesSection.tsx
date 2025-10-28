import { Code2, Palette, Gauge, Lock } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "API-First Design",
    description: "Nahtlose Integration in bestehende Systeme durch moderne REST & GraphQL APIs",
  },
  {
    icon: Palette,
    title: "Custom Solutions",
    description: "Maßgeschneiderte KI-Lösungen, perfekt auf Ihre Anforderungen zugeschnitten",
  },
  {
    icon: Gauge,
    title: "Real-Time Analytics",
    description: "Live-Dashboards und Insights für datengetriebene Entscheidungen",
  },
  {
    icon: Lock,
    title: "DSGVO-Konform",
    description: "Vollständige Compliance mit europäischen Datenschutzstandards",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="animate-slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technologie, die
              <br />
              <span className="text-glow-secondary bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Ihr Business transformiert
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Unsere KI-Plattform vereint modernste Technologie mit 
              benutzerfreundlichem Design. Entwickelt für Unternehmen, 
              die echte Ergebnisse erzielen wollen.
            </p>

            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 group cursor-pointer"
                    style={{
                      animation: "slide-in-right 0.8s ease-out",
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="relative animate-scale-in">
            <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
              {/* Animated Code Block */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <div className="space-y-2">
                  <div className="text-secondary">
                    <span className="text-muted-foreground">import</span> AI{" "}
                    <span className="text-muted-foreground">from</span> 'vintaro'
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-accent">const</span> solution{" "}
                    <span className="text-primary">=</span>{" "}
                    <span className="text-secondary">await</span> AI.
                    <span className="text-accent">solve</span>({"{"}
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    problem: <span className="text-green-400">'complex'</span>,
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    speed: <span className="text-green-400">'lightning'</span>,
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    quality: <span className="text-green-400">'stellar'</span>
                  </div>
                  <div className="text-muted-foreground">{"}"});</div>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <div className="text-green-400">
                    ✓ Solution deployed successfully
                  </div>
                  <div className="text-primary animate-glow-pulse">
                    → Performance: 99.9% uptime
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float-slow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
