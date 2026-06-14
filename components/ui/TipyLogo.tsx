import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TipyLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  showText?: boolean
  href?: string
  className?: string
}

const sizes = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 48,
  xl: 72,
}

export function TipyLogo({ size = "md", showText = true, href = "/", className }: TipyLogoProps) {
  const px = sizes[size]

  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logo.png"
        alt="Tipy"
        width={px}
        height={px}
        className="object-contain"
        priority
      />
      {showText && (
        <span
          className={cn(
            "font-black text-text-primary tracking-tight leading-none",
            {
              "text-xs": size === "xs",
              "text-base": size === "sm",
              "text-xl": size === "md",
              "text-2xl": size === "lg",
              "text-4xl": size === "xl",
            }
          )}
        >
          tipy
        </span>
      )}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

// Icon-only variant (just the image, no text)
export function TipyIcon({ size = "md", className }: { size?: keyof typeof sizes; className?: string }) {
  const px = sizes[size]
  return (
    <Image
      src="/logo.png"
      alt="Tipy"
      width={px}
      height={px}
      className={cn("object-contain", className)}
      priority
    />
  )
}
