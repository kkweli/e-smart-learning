import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const FloatingChatButton = ({ isOpen, onClick }: FloatingChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-primary hover:scale-110 z-50 animate-pulse-glow"
      size="icon"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <MessageSquare className="h-6 w-6" />
      )}
    </Button>
  );
};
