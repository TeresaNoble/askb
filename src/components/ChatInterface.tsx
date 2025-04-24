import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Download, Info, RefreshCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { UserProfile, buildInstructions } from '@/utils/voiceProfiles';
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  userProfile: UserProfile;
}

const ChatInterface = ({ userProfile }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  const [downloadFormat, setDownloadFormat] = useState<'text' | 'word'>('text');

  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
    
    setLastPrompt(input);
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    setInput('');
    setShowInstructions(false);
    setIsGenerating(true);
    
    try {
      const instructions = buildInstructions(userProfile);
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            { role: 'system', content: instructions },
            ...messages,
            userMessage
          ]
        }
      });

      if (error) throw error;

      const assistantMessage: Message = { 
        role: 'assistant',
        content: data.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = { 
        role: 'assistant',
        content: 'Sorry, there was an error generating a response. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReuse = async () => {
    if (!lastPrompt || isGenerating) return;
    setInput(lastPrompt);
  };

  const handleDownload = () => {
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    if (assistantMessages.length === 0) return;
    
    const content = assistantMessages[assistantMessages.length - 1].content;
    
    if (downloadFormat === 'word') {
      const header = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Export HTML to Word Document with JavaScript</title></head><body>';
      const footer = "</body></html>";
      const sourceHTML = header + content.replace(/\n/g, "<br>") + footer;
      
      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      const fileDownload = document.createElement("a");
      
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = 'content.doc';
      fileDownload.click();
      document.body.removeChild(fileDownload);
    } else {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      const words = lastPrompt.toLowerCase().match(/\b\w+\b/g) || ['content'];
      const baseFilename = words.slice(0, 2).join('');
      const date = new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }).replace(/ /g, '');
      
      a.href = url;
      a.download = `${baseFilename}_${date}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-semibold">Content Writer AI</h1>
      </div>
      <ScrollArea className="flex-1 p-4">
        {showInstructions && messages.length === 0 && (
          <div className="p-6 bg-secondary/10 rounded-lg mb-4">
            <h3 className="font-medium text-lg mb-2">How It Works</h3>
            <p className="mb-4">
              Let me know your audience and perhaps a file to reference in the sidebar, then type your message idea below. This could be:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>A short email to your boss</li>
              <li>A Slack announcement for your team</li>
              <li>An explainer for a doc</li>
              <li>Even a birthday card line for your dog groomers aunt</li>
            </ul>
            <p>
              Once you type your message idea below, I'll rewrite it for your audience,
              or it'll be something you can be inspired by!
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg max-w-[80%] ${
              message.role === 'user'
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'bg-[#FDE1D3] text-black border-2 border-[#F97316]'
            }`}
          >
            {message.content.split('\n').map((line, i) => (
              <p key={i} className={i > 0 ? 'mt-2' : ''}>
                {line}
              </p>
            ))}
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex items-center text-muted-foreground mb-4">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Stirring the sass...</span>
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2 mb-2">
          {lastPrompt && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReuse}
              disabled={isGenerating}
            >
              <RefreshCcw className="h-3 w-3 mr-1" /> Reuse Last Prompt
            </Button>
          )}
          {messages.some(m => m.role === 'assistant') && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setDownloadFormat('text');
                  handleDownload();
                }}
              >
                <Download className="h-3 w-3 mr-1" /> Text
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setDownloadFormat('word');
                  handleDownload();
                }}
              >
                <Download className="h-3 w-3 mr-1" /> Word
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you writing?"
            className="flex-1"
            rows={3}
          />
          <Button 
            onClick={handleSend} 
            className="self-end"
            disabled={isGenerating || !input.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Working...
              </>
            ) : (
              'Send'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
