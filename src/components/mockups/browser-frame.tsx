import { cn } from "@/lib/utils";

/** Ramka okna przeglądarki wokół zrzutu ekranu aplikacji. */
export function BrowserFrame({
  url = "app.biuromat.pl",
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl bg-[#f6f7fb] shadow-product ring-1 ring-white/10", className)}>
      <div className="flex h-8 items-center gap-2 border-b border-[#e3e8f0] bg-white px-3.5">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-[#dfe5ee]" />
          ))}
        </span>
        <span className="mx-auto rounded-pill bg-[#eef2f7] px-10 py-0.5 text-[11px] text-navy-500">{url}</span>
        <span className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}
