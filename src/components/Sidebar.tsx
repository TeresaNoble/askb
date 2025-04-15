
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const VOICE_PROFILE = {
  communicationStyle: [
    "Direct",
    "Encouraging",
    "Playful",
    "Witty",
    "Professional",
    "Warm",
    "Bold"
  ],
  contentFormat: [
    "Step-by-Step",
    "Quick Summary",
    "Detailed Breakdown",
    "Action List",
    "Analytical",
    "Conversational"
  ],
  generation: [
    "Gen Alpha",
    "Gen Z",
    "Millennials",
    "Wise Millennials",
    "Gen X",
    "Boomers",
    "Silent Generation",
    "Mixed"
  ]
};

const Sidebar = () => {
  const [toneFlair, setToneFlair] = useState(50);
  const [ultraDirect, setUltraDirect] = useState(false);

  return (
    <div className="w-64 h-full bg-white border-r p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-6">
        <img src="/lovable-uploads/e3bd66cc-d0cd-4e74-b137-84de8c89908a.png" alt="Logo" className="w-8 h-8" />
        <h2 className="text-xl font-semibold">Writing AI</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Communication Style</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {VOICE_PROFILE.communicationStyle.map((style) => (
                <SelectItem key={style} value={style.toLowerCase()}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Content Format</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              {VOICE_PROFILE.contentFormat.map((format) => (
                <SelectItem key={format} value={format.toLowerCase()}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Generation</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select generation" />
            </SelectTrigger>
            <SelectContent>
              {VOICE_PROFILE.generation.map((gen) => (
                <SelectItem key={gen} value={gen.toLowerCase()}>
                  {gen}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tone Flair</Label>
          <Slider
            value={[toneFlair]}
            onValueChange={([value]) => setToneFlair(value)}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Nip</span>
            <span>Slash</span>
            <span>Blaze</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Ultra-Direct Mode</Label>
          <Switch
            checked={ultraDirect}
            onCheckedChange={setUltraDirect}
          />
        </div>

        <Button variant="outline" className="w-full">
          Upload Reference Doc
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
