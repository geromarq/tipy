import { cn } from "@/lib/utils"
import { type HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "violet" | "elevated"
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        {
          "bg-bg-surface border border-border": variant === "default",
          "glass": variant === "glass",
          "glass-violet": variant === "violet",
          "bg-bg-surface-2 border border-border shadow-xl": variant === "elevated",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
