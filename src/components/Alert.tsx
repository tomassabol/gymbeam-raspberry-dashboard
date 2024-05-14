import { cn } from "@/lib/utils";
import { AlertDescription } from "./ui/alert";
import type { AlertProps } from "./UpdateAlertContainer";

export function UpdateAlert(props: AlertProps) {
  return (
    <p className={(props.className, "w-fit px-1 h-fit")}>
      <AlertDescription className="text-xs flex gap-x-1 items-center">
        <span
          className={cn("font-bold text-lg", {
            "text-green-600": props.live,
            "text-red-600": !props.live,
            "text-yellow-400": !props.live && !props.updatedAt,
          })}
        >
          •
        </span>
        {!props.live && !props.updatedAt
          ? "Fetching data..."
          : props.live && props.updatedAt
            ? "Live results"
            : `Updated at ${props.updatedAt?.toLocaleTimeString().replace(/:\d+ /, " ")}`}
      </AlertDescription>
    </p>
  );
}
