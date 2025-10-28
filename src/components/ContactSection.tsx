import { Button } from "@/components/ui/button";
import { Mail, Calendar, MessageSquare } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="glass-strong rounded-3xl p-12 md:p-16 text-center animate-scale-in glow-primary">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Bereit für die
              <br />
              <span className="text-glow-primary bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                KI-Revolution?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihre Vision verwirklichen. 
              Kontaktieren Sie uns für ein unverbindliches Erstgespräch.
            </p>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 cursor-pointer group">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">kontakt@vintaro.ai</p>
              </div>

              <div className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 cursor-pointer group">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Meeting</h3>
                <p className="text-sm text-muted-foreground">Termin buchen</p>
              </div>

              <div className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 cursor-pointer group">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Sofort verfügbar</p>
              </div>
            </div>

            {/* Primary CTA */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary rounded-xl font-semibold text-lg px-12 py-6 group"
            >
              Jetzt Kontakt aufnehmen
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center animate-slide-in-up">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-glow-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Projekte</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-glow-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-glow-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
