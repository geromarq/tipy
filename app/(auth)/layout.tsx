import { SmallDecorativeShapes } from "@/components/ui/DecorativeShapes"
import { TipyLogo } from "@/components/ui/TipyLogo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <SmallDecorativeShapes />
      <div className="mb-10">
        <TipyLogo size="lg" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
