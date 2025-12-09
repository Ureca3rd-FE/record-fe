import LoaderIcon from "@/assets/loader.svg";
import { cn } from "@/utils/cn";

export default function Loader({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return <LoaderIcon className={cn("text-primary-200 animate-spin", className)} {...props} />;
}
