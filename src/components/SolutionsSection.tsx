import { Card } from "@/components/ui/card";
import { Building2, ShoppingCart, HeartPulse, GraduationCap } from "lucide-react";

const solutions = [
  {
    icon: Building2,
    title: "Enterprise AI",
    description: "Skalierbare KI-Lösungen für große Unternehmen und Konzerne",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Intelligente Empfehlungen und Personalisierung für Online-Shops",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "KI-gestützte Diagnose und Patientenbetreuung",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Adaptive Lernsysteme und personalisierte Bildungswege",
    gradient: "from-orange-500 to-red-500",
  },
];

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/10 to-background" />

      <div className="relative container mx-auto px-6">
        <div className="text-center mb-20 animate-slide-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Branchen-spezifische
            <br />
            <span className="text-glow-primary bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Lösungen
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maßgeschneiderte KI-Integration für jede Branche
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="glass-strong rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:scale-105 hover:glow-primary group relative overflow-hidden"
                style={{
                  animation: "scale-in 0.8s ease-out",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.gradient} p-0.5 transition-transform duration-500 group-hover:rotate-12`}>
                    <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground">{solution.description}</p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">Mehr erfahren</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
