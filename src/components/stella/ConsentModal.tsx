import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import legalContent from '@/content/legal.json';

interface ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'call' | 'chat';
  onAccept: () => void;
  onDecline: () => void;
  language?: 'de' | 'en';
}

export const ConsentModal = ({
  open,
  onOpenChange,
  type,
  onAccept,
  onDecline,
  language = 'de',
}: ConsentModalProps) => {
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const content = legalContent.consent[type][language];

  // Focus trap: focus accept button when modal opens
  useEffect(() => {
    if (open && acceptButtonRef.current) {
      acceptButtonRef.current.focus();
    }
  }, [open]);

  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleDecline = () => {
    onDecline();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] glass-strong"
        aria-describedby="consent-description"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-primary" aria-hidden="true" />
            <DialogTitle className="text-xl">{content.title}</DialogTitle>
          </div>
          <DialogDescription id="consent-description" className="text-base">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ul className="space-y-3" role="list">
            {content.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1" aria-hidden="true">
                  •
                </span>
                <span className="text-sm text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          <a
            href="/datenschutz"
            className="underline hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.privacyLink}
          </a>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleDecline}
            className="glass"
          >
            {content.declineButton}
          </Button>
          <Button
            ref={acceptButtonRef}
            type="button"
            onClick={handleAccept}
            className="bg-primary hover:bg-primary/90 glow-primary"
            aria-label={`${content.acceptButton} - ${content.title}`}
          >
            {content.acceptButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
