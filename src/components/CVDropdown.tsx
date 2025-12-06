import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileDown, Play } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Props {
  enUrl?: string;
  frUrl?: string;
  videoUrl?: string;
}

export default function CVDropdown({ enUrl = '/cv/Cv_English.pdf', frUrl = '/cv/cv.pdf', videoUrl }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline-glow" className="gap-2">
            <FileDown className="w-4 h-4" />
            Download CV
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-[12rem] bg-card/95 backdrop-blur-md border border-border shadow-lg">
          <DropdownMenuItem 
            onClick={() => handleDownload(enUrl, 'CV_English.pdf')}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
          >
            <FileDown className="w-4 h-4 mr-2" />
            English PDF
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => handleDownload(frUrl, 'CV_Francais.pdf')}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Français PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {videoUrl && (
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Play className="w-4 h-4" />
              Watch CV Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-md border-border">
            <DialogHeader>
              <DialogTitle>My CV Video</DialogTitle>
              <DialogDescription>
                A brief introduction to my background and experience
              </DialogDescription>
            </DialogHeader>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
