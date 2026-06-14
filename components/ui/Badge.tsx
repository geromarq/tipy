import { cn } from "@/lib/utils"
import { type HTMLAttributes } from "react"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "violet" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-bg-surface-3 text-text-secondary": variant === "default",
          "bg-success/15 text-success": variant === "success",
          "bg-warning/15 text-warning": variant === "warning",
          "bg-error/15 text-error": variant === "error",
          "bg-brand/15 text-brand-light": variant === "violet",
          "border border-border text-text-muted": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
