
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { TooltipInfo } from './TooltipInfo';
import { ToneFlair } from '@/utils/voiceProfiles';

interface ToneFlairSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const ToneFlairSlider = ({ value, onChange }: ToneFlairSliderProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>Tone Flair</Label>
      <TooltipInfo content="Choose how bold you want the writing to sound: Subtly edgy (Nip), sharp but stylish (Slash) or bold and direct (Blaze)." />
    </div>
    <Slider
      value={[value]}
      onValueChange={([newValue]) => onChange(newValue)}
      max={100}
      step={1}
    />
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>Nip</span>
      <span>Slash</span>
      <span>Blaze</span>
    </div>
  </div>
);
