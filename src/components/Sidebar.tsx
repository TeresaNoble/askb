import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { VOICE_PROFILE, ToneFlair, CommunicationStyle, ContentFormat, Generation, ContentLength } from '@/utils/voiceProfiles';
import { FileUp } from 'lucide-react';
import { Info } from 'lucide-react';

interface SidebarProps {
  onProfileChange: (profile: {
    communicationStyle: CommunicationStyle;
    contentFormat: ContentFormat;
    generation: Generation;
    length: ContentLength;
    toneFlair: ToneFlair;
    ultraDirect: boolean;
    referenceText?: string;
  }) => void;
}

const Sidebar = ({ onProfileChange }: SidebarProps) => {
  const [communicationStyle, setCommunicationStyle] = useState<CommunicationStyle>("Witty");
  const [contentFormat, setContentFormat] = useState<ContentFormat>("Quick Summary");
  const [generation, setGeneration] = useState<Generation>("Mixed");
  const [length, setLength] = useState<ContentLength>("Medium");
  const [toneFlair, setToneFlair] = useState<number>(50);
  const [ultraDirect, setUltraDirect] = useState(false);
  const [referenceText, setReferenceText] = useState<string>("");
  
  const toneFlairLabel = (): ToneFlair => {
    if (toneFlair < 33) return "Nip";
    if (toneFlair < 66) return "Slash";
    return "Blaze";
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setReferenceText(text);
      updateProfile({ referenceText: text });
    };
    reader.readAsText(file);
  };
  
  const updateProfile = (changes: Partial<ReturnType<typeof getProfile>>) => {
    const newProfile = {
      ...getProfile(),
      ...changes
    };
    onProfileChange(newProfile);
  };
  
  const getProfile = () => ({
    communicationStyle,
    contentFormat,
    generation,
    length,
    toneFlair: toneFlairLabel(),
    ultraDirect,
    referenceText
  });

  return (
    <div className="w-64 h-full bg-white border-r p-4 flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-6">
        <img src="/lovable-uploads/e3bd66cc-d0cd-4e74-b137-84de8c89908a.png" alt="Logo" className="w-12 h-12" />
        <h2 className="text-xl font-semibold">Writing AI</h2>
      </div>

      <div className="space-y-6">
        <TooltipProvider>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Communication Style</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Think, 'If I was my audience, how would I like to be spoken to?'</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              value={communicationStyle} 
              onValueChange={(value: CommunicationStyle) => {
                setCommunicationStyle(value);
                updateProfile({ communicationStyle: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VOICE_PROFILE.communicationStyle).map(([style, description]) => (
                  <SelectItem key={style} value={style}>
                    <div className="flex flex-col">
                      <span>{style}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Content Format</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>What are we going with today, detailed, chatty, action?</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              value={contentFormat} 
              onValueChange={(value: ContentFormat) => {
                setContentFormat(value);
                updateProfile({ contentFormat: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VOICE_PROFILE.contentFormat).map(([format, description]) => (
                  <SelectItem key={format} value={format}>
                    <div className="flex flex-col">
                      <span>{format}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Generation</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This adjusts tone pacing, references, and formality.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              value={generation} 
              onValueChange={(value: Generation) => {
                setGeneration(value);
                updateProfile({ generation: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select generation" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VOICE_PROFILE.generation).map(([gen, description]) => (
                  <SelectItem key={gen} value={gen}>
                    <div className="flex flex-col">
                      <span>{gen}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Content Length</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>How detailed should the response be?</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex gap-2">
              {Object.keys(VOICE_PROFILE.length).map((len) => (
                <Button 
                  key={len} 
                  variant={length === len ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setLength(len as ContentLength);
                    updateProfile({ length: len as ContentLength });
                  }}
                >
                  {len}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Tone Flair</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose how bold you want the writing to sound: Subtly edgy (Nip), sharp but stylish (Slash) or bold and direct (Blaze).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Slider
              value={[toneFlair]}
              onValueChange={([value]) => {
                setToneFlair(value);
                updateProfile({ toneFlair: toneFlairLabel() });
              }}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Nip</span>
              <span>Slash</span>
              <span>Blaze</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label>Ultra-Direct Mode</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Override all personality settings to deliver sharp, efficient content with minimal tone.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                checked={ultraDirect}
                onCheckedChange={(checked) => {
                  setUltraDirect(checked);
                  updateProfile({ ultraDirect: checked });
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="file-upload">Upload Reference Document</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a reference doc. AI is not secure, don't upload secrets or scandals.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Button variant="outline" className="w-full" onClick={() => document.getElementById('file-upload')?.click()}>
              <FileUp className="mr-2 h-4 w-4" /> Upload Reference Doc
            </Button>
            {referenceText && (
              <p className="text-sm text-muted-foreground truncate">
                File uploaded: {(document.getElementById('file-upload') as HTMLInputElement)?.files?.[0]?.name}
              </p>
            )}
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".txt,.pdf,.docx"
            />
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
