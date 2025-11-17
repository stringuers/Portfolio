import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileDown } from 'lucide-react';

interface Props {
  enUrl?: string;
  frUrl?: string;
}

export default function CVDropdown({ enUrl = '/cv/Cv_English.pdf', frUrl = '/cv/cv.pdf' }: Props) {
  // Simple, clear dropdown with direct download options for English and French CVs.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileDown className="w-4 h-4" />
          Download CV
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[12rem] bg-card/80 backdrop-blur-sm border border-border">
        <DropdownMenuItem asChild>
          <a href={enUrl} download className="w-full px-3 py-2 hover:bg-background/40 transition-colors">Download English</a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href={frUrl} download className="w-full px-3 py-2 hover:bg-background/40 transition-colors">Télécharger (Français)</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
