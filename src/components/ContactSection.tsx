import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, MessageSquare, Phone } from "lucide-react";
import { ConsentModal } from "@/components/stella/ConsentModal";
import { ChatDrawer } from "@/components/stella/ChatDrawer";

export const ContactSection = () => {
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [consentType, setConsentType] = useState<'call' | 'chat'>('call');
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);

  // Feature flags from environment
  const callEnabled = import.meta.env.NEXT_PUBLIC_STELLA_CALL === '1';
  const chatEnabled = import.meta.env.NEXT_PUBLIC_STELLA_CHAT === '1';

  const handleCallClick = () => {
    if (!callEnabled) return;
    setConsentType('call');
    setConsentModalOpen(true);
  };

  const handleChatClick = () => {
    if (!chatEnabled) return;
    setConsentType('chat');
    setConsentModalOpen(true);
  };

  const handleConsentAccept = async () => {
    try {
      // Log consent to backend
      await fetch('http://localhost:3001/api/stella/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: consentType, consent: true }),
      });

      // Proceed with the action
      if (consentType === 'call') {
        // For calls, just proceed to the phone number (link stays the same for now)
        window.location.href = 'tel:+43512385144';
      } else {
        // For chat, open the drawer
        setChatDrawerOpen(true);
      }
    } catch (error) {
      console.error('[CONSENT] Failed to log consent:', error);
    }
  };

  const handleConsentDecline = async () => {
    try {
      // Log declined consent
      await fetch('http://localhost:3001/api/stella/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: consentType, consent: false }),
      });
    } catch (error) {
      console.error('[CONSENT] Failed to log decline:', error);
    }
  };

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
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <TooltipProvider>
                {/* AI Call Agent */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`glass p-6 rounded-2xl transition-all duration-300 group relative ${
                        callEnabled
                          ? 'hover:glow-primary cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={handleCallClick}
                    >
                      <Badge
                        variant="secondary"
                        className="absolute top-3 right-3 text-xs bg-primary/20 text-primary border-primary/30"
                      >
                        Beta
                      </Badge>
                      <Phone className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-2">Call (AI-Callagent)</h3>
                      <p className="text-sm text-muted-foreground">KI-gestützt</p>
                    </div>
                  </TooltipTrigger>
                  {!callEnabled && (
                    <TooltipContent>
                      <p>Bald verfügbar</p>
                    </TooltipContent>
                  )}
                </Tooltip>

                {/* Email */}
                <div className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 cursor-pointer group">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">kontakt@vintaro.ai</p>
                </div>

                {/* Meeting */}
                <div className="glass p-6 rounded-2xl hover:glow-primary transition-all duration-300 cursor-pointer group">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Meeting</h3>
                  <p className="text-sm text-muted-foreground">Termin buchen</p>
                </div>

                {/* Live Chat */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`glass p-6 rounded-2xl transition-all duration-300 group relative ${
                        chatEnabled
                          ? 'hover:glow-primary cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={handleChatClick}
                    >
                      <Badge
                        variant="secondary"
                        className="absolute top-3 right-3 text-xs bg-primary/20 text-primary border-primary/30"
                      >
                        Beta
                      </Badge>
                      <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">KI-Assistent</p>
                    </div>
                  </TooltipTrigger>
                  {!chatEnabled && (
                    <TooltipContent>
                      <p>Bald verfügbar</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
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

      {/* Modals and Drawers */}
      <ConsentModal
        open={consentModalOpen}
        onOpenChange={setConsentModalOpen}
        type={consentType}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
        language="de"
      />
      <ChatDrawer open={chatDrawerOpen} onOpenChange={setChatDrawerOpen} />
    </section>
  );
};
