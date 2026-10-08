import { cn } from "@/lib/utils";

/** Szerokość treści: 1200px + gutter 16px (mobile) / 24px (sm+). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
