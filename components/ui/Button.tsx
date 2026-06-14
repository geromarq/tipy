"use client"
import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"
import { Loader2 } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-brand hover:bg-brand-light active:scale-[0.98] text-white shadow-lg shadow-brand/25": variant === "primary",
            "bg-bg-surface-3 hover:bg-bg-surface-4 active:scale-[0.98] text-text-primary border border-border": variant === "secondary",
            "bg-transparent hover:bg-bg-surface-2 active:scale-[0.98] text-text-secondary": variant === "ghost",
            "bg-error/10 hover:bg-error/20 active:scale-[0.98] text-error border border-error/20": variant === "danger",
            "bg-transparent border border-brand/40 hover:border-brand hover:bg-brand/10 active:scale-[0.98] text-brand": variant === "outline",
          },
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2.5": size === "md",
            "text-base px-6 py-3": size === "lg",
            "text-lg px-8 py-4": size === "xl",
          },
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
