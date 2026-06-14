import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ExternalLink, X } from "lucide-react"
import Link from "next/link"
import type { Tables } from "@/types/database"
import { TipyLogo } from "@/components/ui/TipyLogo"

interface Props {
  params: Promise<{ djSlug: string }>
  searchParams: Promise<{ from?: string }>
}

export default async function DJPublicProfilePage({ params, searchParams }: Props) {
  const { djSlug } = await params
  const { from } = await searchParams
  const showClose = from === "vibe"

  const supabase = await createClient()

  const { data: djData } = await supabase
    .from("users")
    .select("id, display_name, slug, bio, instagram, avatar_url")
    .eq("slug", djSlug)
    .single()

  const dj = djData as Tables<"users"> | null
  if (!dj) notFound()

  // Get active event
  const { data: eventData } = await supabase
    .from("events")
    .select("name, genre, message, end_time, venue")
    .eq("user_id", dj.id)
    .eq("is_active", true)
    .order("start_time", { ascending: false })
    .limit(1)
    .maybeSingle()

  const event = eventData as Tables<"events"> | null

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8">
      {/* Header */}
      {showClose && (
        <div className="flex justify-end mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors">
            <X className="w-4 h-4" />
            Cerrar
          </Link>
        </div>
      )}

      {/* DJ Profile */}
      <div className="flex flex-col items-center text-center mb-10">
        {dj.avatar_url ? (
          <img
            src={dj.avatar_url}
            alt={dj.display_name}
            className="w-28 h-28 rounded-full object-cover border-2 border-brand/40 mb-4"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-brand to-violet-400 flex items-center justify-center border-2 border-brand/40 mb-4">
            <span className="text-5xl font-black text-white">
              {dj.display_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <h1 className="text-3xl font-black text-text-primary mb-1">{dj.display_name}</h1>

        {dj.instagram && (
          <a
            href={`https://instagram.com/${dj.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-muted hover:text-text-secondary text-sm mb-3 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            @{dj.instagram.replace("@", "")}
          </a>
        )}

        {dj.bio && (
          <p className="text-text-secondary text-sm max-w-sm">{dj.bio}</p>
        )}
      </div>

      {/* Active event */}
      {event && (
        <div className="glass-violet rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold text-success uppercase tracking-wide">Tocando ahora</span>
          </div>
          <h3 className="font-bold text-text-primary mb-1">{event.name}</h3>
          {event.genre && <p className="text-sm text-violet-300 mb-1">{event.genre}</p>}
          {event.message && <p className="text-sm text-text-muted italic">"{event.message}"</p>}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto text-center">
        <div className="flex flex-col items-center gap-1">
          <TipyLogo size="xs" />
          <span className="text-xs text-text-muted">tipy.uy</span>
        </div>
      </div>
    </div>
  )
}
