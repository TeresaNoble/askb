
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipInfo } from './TooltipInfo';

interface SelectGroupProps {
  label: string;
  tooltip: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Record<string, string>;
}

export const SelectGroup = ({ label, tooltip, value, onValueChange, options }: SelectGroupProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>{label}</Label>
      <TooltipInfo content={tooltip} />
    </div>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([key, description]) => (
          <SelectItem key={key} value={key}>
            <div className="flex flex-col">
              <span>{key}</span>
              <span className="text-xs text-muted-foreground">{description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
