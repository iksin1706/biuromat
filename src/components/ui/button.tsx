import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// CTA: zaokrąglenie rounded-lg (14 px), waga 600, wciśnięcie = scale(0.97). Wygląd primary: .btn-primary w globals.css.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold tracking-[-0.01em] transition-[background-color,color,transform] duration-200 ease-apple active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary:
          "bg-foreground/[0.04] text-foreground ring-1 ring-inset ring-input backdrop-blur-md hover:bg-foreground/[0.08]",
        ghost: "text-foreground hover:bg-muted",
        link: "rounded-none text-link hover:underline active:scale-100",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5.5 text-[0.9375rem]",
        lg: "h-13 px-7 text-body",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = VariantProps<typeof buttonVariants> & React.ComponentProps<typeof Link>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type ButtonProps = VariantProps<typeof buttonVariants> & React.ComponentProps<"button">;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
