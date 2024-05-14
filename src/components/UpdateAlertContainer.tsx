import { Tooltip } from "@radix-ui/react-tooltip";
import { UpdateAlert } from "./Alert";
import { AlertCircle } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { LiveResultsButton } from "./LiveResultsButton";

export type AlertProps = {
  setIsLive: (isLive: boolean) => void;
  className?: React.PropsWithoutRef<{ className: string }>;
} & (
  | {
      live: true;
      updatedAt: never;
    }
  | {
      live: false;
      updatedAt: Date;
    }
);

export function UpdateAlertContainer(props: AlertProps) {
  return (
    <div className={cn(props.className, "flex md:gap-1 items-center w-fit")}>
      <div className="h-fit">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              {/* @ts-expect-error */}
              <UpdateAlert updatedAt={props.updatedAt} live={props.live} />
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex gap-1 w-52">
                <AlertCircle className="h-5 w-5" />
                <p className="text-xs">
                  Live results have a negative impact on performance and user
                  experience.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <LiveResultsButton setIsLive={props.setIsLive} live={props.live} />
    </div>
  );
}
