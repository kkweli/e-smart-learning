import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Key, CheckCircle2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const navigate = useNavigate();
  const { geminiApiKey } = useApp();
  const [isTestingApi, setIsTestingApi] = useState(false);
  const { toast } = useToast();

  const handleTestApi = async () => {
    if (!geminiApiKey) {
      toast({
        title: "Configuration Error",
        description: "AI features are not properly configured. Please contact support.",
        variant: "destructive"
      });
      return;
    }

    setIsTestingApi(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }]
          })
        }
      );

      if (response.ok) {
        toast({
          title: "Success! ✓",
          description: "AI features are working correctly.",
        });
      } else {
        toast({
          title: "Service Unavailable",
          description: "AI features are temporarily unavailable. Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI services. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-hero border-b border-border/50">
        <div className="container py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="container py-12 max-w-3xl">
        <Card className="bg-gradient-card border-border/50 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>AI Features Status</CardTitle>
            </div>
            <CardDescription>
              Check the status of AI-powered learning features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
              <div className={`w-3 h-3 rounded-full ${geminiApiKey ? 'bg-success' : 'bg-destructive'}`} />
              <div>
                <p className="font-medium">
                  {geminiApiKey ? 'AI Features Active' : 'AI Features Unavailable'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {geminiApiKey ? 'Google Gemini integration is working' : 'AI features are not configured'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleTestApi}
                variant="outline"
                disabled={isTestingApi || !geminiApiKey}
              >
                {isTestingApi ? 'Testing...' : 'Test AI Connection'}
              </Button>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-sm mb-2">AI Features Include:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Contextual learning assistance during courses</li>
                <li>• AI-powered Q&A for lesson content</li>
                <li>• Smart study recommendations</li>
                <li>• Instant help with complex topics</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <h4 className="font-semibold text-sm mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                If AI features are not working, please contact support for assistance.
                The service may be temporarily unavailable due to API limits or maintenance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
