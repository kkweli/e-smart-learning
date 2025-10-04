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
  const { geminiApiKey, setGeminiApiKey } = useApp();
  const [apiKey, setApiKey] = useState(geminiApiKey);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved successfully.",
    });
  };

  const handleTestApi = async () => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter an API key first",
        variant: "destructive"
      });
      return;
    }

    setIsTestingApi(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
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
          description: "API key is valid and working correctly.",
        });
      } else {
        toast({
          title: "Error",
          description: "API key is invalid or has expired.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to test API key. Please check your connection.",
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
              <CardTitle>Google Gemini API Key</CardTitle>
            </div>
            <CardDescription>
              Configure your API key to enable AI-powered features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSaveApiKey} className="bg-gradient-primary">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Save API Key
              </Button>
              <Button 
                onClick={handleTestApi} 
                variant="outline"
                disabled={isTestingApi}
              >
                {isTestingApi ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3 border border-border/50">
              <h4 className="font-semibold text-sm">How to get your API key:</h4>
              <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Visit Google AI Studio</li>
                <li>Sign in with your Google account</li>
                <li>Click "Get API Key" in the top navigation</li>
                <li>Create a new API key or use an existing one</li>
                <li>Copy and paste it above</li>
              </ol>
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Open Google AI Studio
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-sm mb-2">Important Notes:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• The API key is stored only in your browser session</li>
                <li>• Google Gemini offers a generous free tier</li>
                <li>• Never share your API key with others</li>
                <li>• Rate limits apply based on your API usage</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
