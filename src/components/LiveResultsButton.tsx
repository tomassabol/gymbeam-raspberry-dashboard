import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { OctagonPause, RotateCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function LiveResultsButton({
  setIsLive,
  className,
  live,
}: {
  setIsLive: (isLive: boolean) => void;
  className?: React.PropsWithoutRef<{ className: string }>;
  live: boolean;
}) {
  return (
    <div className="h-fit">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-help">
            <Button
              className={cn(className, "text-xs p-2 w-8 h-8")}
              variant="secondary"
              onClick={() => setIsLive(!live)}
            >
              {live ? <OctagonPause /> : <RotateCw />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">
            {live ? "Pause live results." : "Enable live results."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
