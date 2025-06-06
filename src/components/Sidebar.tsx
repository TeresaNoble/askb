
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VOICE_PROFILE, ToneFlair, CommunicationStyle, ContentFormat, Generation, ContentLength } from '@/utils/voiceProfiles';
import { TooltipInfo } from './sidebar/TooltipInfo';
import { SelectGroup } from './sidebar/SelectGroup';
import { ToneFlairSlider } from './sidebar/ToneFlairSlider';
import { FileUpload } from './sidebar/FileUpload';

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

  const toneFlairLabel = (value: number = toneFlair): ToneFlair => {
    if (value < 33) return "Nip";
    if (value < 66) return "Slash";
    return "Blaze";
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
        <SelectGroup
          label="Communication Style"
          tooltip="Think, 'If I was my audience, how would I like to be spoken to?'"
          value={communicationStyle}
          onValueChange={(value: CommunicationStyle) => {
            setCommunicationStyle(value);
            updateProfile({ communicationStyle: value });
          }}
          options={VOICE_PROFILE.communicationStyle}
        />

        <SelectGroup
          label="Content Format"
          tooltip="What are we going with today, detailed, chatty, action?"
          value={contentFormat}
          onValueChange={(value: ContentFormat) => {
            setContentFormat(value);
            updateProfile({ contentFormat: value });
          }}
          options={VOICE_PROFILE.contentFormat}
        />

        <SelectGroup
          label="Generation"
          tooltip="This adjusts tone pacing, references, and formality."
          value={generation}
          onValueChange={(value: Generation) => {
            setGeneration(value);
            updateProfile({ generation: value });
          }}
          options={VOICE_PROFILE.generation}
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Content Length</Label>
            <TooltipInfo content="How detailed should the response be?" />
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

        <ToneFlairSlider
          value={toneFlair}
          onChange={(value) => {
            setToneFlair(value);
            updateProfile({ toneFlair: toneFlairLabel(value) });
          }}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label>Ultra-Direct Mode</Label>
              <TooltipInfo content="Override all personality settings to deliver sharp, efficient content with minimal tone." />
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

        <FileUpload 
          onFileUpload={(text) => {
            setReferenceText(text);
            updateProfile({ referenceText: text });
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
