import Link from "next/link"
import { Music2, User } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function VibeSuccessPage({ params }: Props) {
  const { qrSlug } = await params
  const supabase = await createClient()

  const { data: qr } = await supabase
    .from("qr_codes")
    .select("event:events(dj:users(slug))")
    .eq("slug", qrSlug)
    .single()

  if (!qr) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const event = (qr.event as any) as { dj: { slug: string } }
  const djSlug = event?.dj?.slug ?? ""

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8 items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-black text-text-primary mb-2">¡Voto enviado!</h1>
          <p className="text-text-secondary text-sm">Tu vibe está en la pista. ¿Qué más querés hacer?</p>
        </div>

        <div className="space-y-4">
          <Link href={`/q/${qrSlug}/suggest`} className="block group">
            <div className="relative overflow-hidden rounded-3xl p-7 text-center border border-border group-hover:border-brand/40 bg-gradient-to-br from-brand/8 to-violet-900/10 transition-all duration-200 group-active:scale-[0.98]">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand opacity-60" />
              <Music2 className="w-8 h-8 text-brand mx-auto mb-3" />
              <h2 className="text-lg font-bold text-text-primary">Sugerir Música</h2>
              <p className="text-xs text-text-secondary mt-1">Mandá tu canción al DJ</p>
            </div>
          </Link>

          <Link href={`/dj/${djSlug}?from=vibe`} className="block group">
            <div className="rounded-3xl p-7 text-center border border-border group-hover:border-border/80 transition-all duration-200 group-active:scale-[0.98]">
              <User className="w-8 h-8 text-text-muted mx-auto mb-3" />
              <h2 className="text-lg font-bold text-text-primary">Ver DJ</h2>
              <p className="text-xs text-text-secondary mt-1">Volvé al perfil del DJ</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
