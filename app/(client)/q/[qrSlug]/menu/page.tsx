import Link from "next/link"
import { Star, ArrowLeft } from "lucide-react"
import { TipyLogo } from "@/components/ui/TipyLogo"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function MenuPage({ params }: Props) {
  const { qrSlug } = await params

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8">
      {/* Back + Logo */}
      <div className="flex items-center justify-between mb-12">
        <Link
          href={`/q/${qrSlug}`}
          className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </Link>
        <TipyLogo size="xs" />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5">
        <p className="text-text-muted text-sm text-center mb-2">¿Qué querés hacer?</p>

        {/* Rate the Vibe */}
        <Link href={`/q/${qrSlug}/vibe`} className="block group">
          <div className="relative overflow-hidden rounded-3xl p-8 text-center border border-border group-hover:border-brand/40 transition-all duration-200 group-active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.08) 50%, rgba(34,197,94,0.08) 100%)"
            }}
          >
            {/* Gradient background strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
              style={{ background: "linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)" }}
            />
            <div className="text-5xl mb-4">🎚️</div>
            <h2 className="text-2xl font-black text-text-primary mb-2">Rate the Vibe</h2>
            <p className="text-text-secondary text-sm">¿Cómo está la noche? Votá del 🔴 al 🟢</p>
          </div>
        </Link>

        {/* Sugerir Música */}
        <Link href={`/q/${qrSlug}/suggest`} className="block group">
          <div className="relative overflow-hidden rounded-3xl p-8 text-center border border-border group-hover:border-brand/40 bg-gradient-to-br from-brand/8 to-violet-900/10 transition-all duration-200 group-active:scale-[0.98]">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand opacity-60" />
            <div className="text-5xl mb-4">🎵</div>
            <h2 className="text-2xl font-black text-text-primary mb-2">Sugerir Música</h2>
            <p className="text-text-secondary text-sm">Mandale una canción al DJ con o sin propina</p>
          </div>
        </Link>
      </div>

      <p className="text-center text-xs text-text-muted mt-8">
        Powered by <span className="text-brand font-medium">tipy.uy</span>
      </p>
    </div>
  )
}
