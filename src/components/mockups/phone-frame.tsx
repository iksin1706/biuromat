import { cn } from "@/lib/utils";

/**
 * Ramka telefonu wokół zrzutu lub nagrania widoku mobilnego. Szerokość ustala rodzic/className.
 * `statusBar={false}` — dla nagrań z telefonu, które mają własny pasek statusu
 * (wyspa i wskaźnik domu zostają jako nakładka).
 */
export function PhoneFrame({
  className,
  statusBar = true,
  children,
}: {
  className?: string;
  statusBar?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-[2.6rem] bg-navy-800 p-2 shadow-product ring-1 ring-white/15", className)}>
      <div className="relative overflow-hidden rounded-[2.1rem] bg-white">
        {statusBar && (
          <div className="flex h-7 items-center justify-between bg-white px-6 text-[10px] font-semibold text-navy-950">
            <span>9:41</span>
            <span className="h-2 w-3.5 rounded-[2px] bg-navy-950" aria-hidden />
          </div>
        )}
        <span
          aria-hidden
          className="absolute top-1.5 left-1/2 z-10 h-[18px] w-[70px] -translate-x-1/2 rounded-full bg-navy-950"
        />
        {children}
        <span
          aria-hidden
          className="absolute bottom-1.5 left-1/2 z-10 h-1 w-20 -translate-x-1/2 rounded-full bg-navy-950/70"
        />
      </div>
    </div>
  );
}
