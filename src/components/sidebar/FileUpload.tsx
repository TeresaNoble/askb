
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp } from 'lucide-react';
import { TooltipInfo } from './TooltipInfo';

interface FileUploadProps {
  onFileUpload: (text: string) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileUpload(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor="file-upload">Upload Reference Document</label>
        <TooltipInfo content="Upload a reference doc. AI is not secure, don't upload secrets or scandals." />
      </div>
      <Button variant="outline" className="w-full" onClick={() => document.getElementById('file-upload')?.click()}>
        <FileUp className="mr-2 h-4 w-4" /> Upload Reference Doc
      </Button>
      {fileName && (
        <p className="text-sm text-muted-foreground truncate">
          File uploaded: {fileName}
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
  );
};
