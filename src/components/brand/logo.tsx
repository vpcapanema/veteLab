import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
}

export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <svg
      viewBox={variant === "mark" ? "0 0 148 160" : "0 0 690 160"}
      role="img"
      aria-label="VeteLab Laboratório Veterinário"
      className={cn(
        "shrink-0 fill-current",
        variant === "mark" ? "h-10 w-10" : "h-12 w-auto",
        className,
      )}
    >
      <g aria-hidden="true">
        <path d="M8 22c-5 0-8 4-6 10l39 119c1 5 5 7 10 7h19c5 0 8-2 10-7l40-119c2-6-1-10-7-10H94c-5 0-8 2-10 7L61 105 38 29c-2-5-5-7-10-7H8Z" />
        <path
          d="M61 8c0-5 3-8 8-8h17c5 0 8 3 8 8v103h47c5 0 7 3 7 8v16c0 5-2 8-7 8H71c-7 0-10-3-10-10V8Z"
          className="stroke-background stroke-[3]"
          paintOrder="stroke"
        />
      </g>

      {variant === "full" && (
        <g aria-hidden="true">
          <text
            x="165"
            y="103"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="82"
            fontWeight="700"
          >
            VeteLab
          </text>
          <text
            x="169"
            y="137"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="23"
            fontWeight="400"
            letterSpacing="0.6"
          >
            LABORATÓRIO VETERINÁRIO
          </text>
        </g>
      )}
    </svg>
  );
}
