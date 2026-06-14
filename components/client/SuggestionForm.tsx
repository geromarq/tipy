"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Music2, X, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { Card } from "@/components/ui/Card"
import type { MatchedTrack } from "@/types/database"
import Link from "next/link"

interface SuggestionFormProps {
  qrSlug: string
}

interface TrackResult {
  title: string
  artist: string
  album?: string
  image_url?: string
  source: "spotify" | "lastfm"
}

export function SuggestionForm({ qrSlug }: SuggestionFormProps) {
  const [text, setText] = useState("")
  const [matchedTrack, setMatchedTrack] = useState<MatchedTrack | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<TrackResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSearch() {
    if (!searchQuery.trim()) return
    setSearching(true)
    try {
      const res = await fetch(`/api/music/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setSearchResults(data.tracks || [])
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  function selectTrack(track: TrackResult) {
    setMatchedTrack(track)
    setText(`${track.title} - ${track.artist}`)
    setShowSearch(false)
    setSearchResults([])
    setSearchQuery("")
  }

  async function handleSubmit() {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qr_slug: qrSlug,
          text: text.trim(),
          matched_track: matchedTrack,
        }),
      })
      const data = await res.json()
      if (data.suggestion_id) {
        router.push(`/q/${qrSlug}/suggest/contact?sid=${data.suggestion_id}`)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link href={`/q/${qrSlug}/menu`} className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-text-primary mb-2">Sugerí música</h1>
          <p className="text-text-secondary text-sm">
            Escribí el nombre de la canción, artista, género, o lo que quieras decirle al DJ.
          </p>
        </div>

        {/* Matched track preview */}
        {matchedTrack && (
          <div className="mb-4 flex items-center gap-3 p-3 rounded-xl glass-violet border border-brand/20">
            {matchedTrack.image_url && (
              <img src={matchedTrack.image_url} alt={matchedTrack.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{matchedTrack.title}</p>
              <p className="text-xs text-text-muted truncate">{matchedTrack.artist}</p>
            </div>
            <button onClick={() => { setMatchedTrack(null); setText("") }} className="text-text-muted hover:text-text-secondary flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main textarea */}
        <div className="mb-4">
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Ej: Pon algo de house de los 90s, o Daft Punk - One More Time..."
            rows={5}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-text-muted">{text.length}/300</span>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center gap-2 text-sm text-brand hover:text-brand-light transition-colors mb-6"
        >
          <Search className="w-4 h-4" />
          Buscar canción específica
          <Sparkles className="w-3.5 h-3.5" />
        </button>

        {/* Search panel */}
        {showSearch && (
          <div className="mb-6 animate-slide-up">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Buscar canción o artista..."
                className="flex-1 px-4 py-3 rounded-xl bg-bg-surface-2 border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-brand"
              />
              <Button onClick={handleSearch} loading={searching} size="md">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((track, i) => (
                  <button
                    key={i}
                    onClick={() => selectTrack(track)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-bg-surface-2 hover:bg-bg-surface-3 border border-border hover:border-brand/30 transition-all text-left"
                  >
                    {track.image_url ? (
                      <img src={track.image_url} alt={track.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-bg-surface-3 flex items-center justify-center flex-shrink-0">
                        <Music2 className="w-5 h-5 text-text-muted" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{track.title}</p>
                      <p className="text-xs text-text-muted truncate">{track.artist}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="mt-auto">
          <Button
            fullWidth
            size="xl"
            onClick={handleSubmit}
            loading={loading}
            disabled={!text.trim()}
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-center text-xs text-text-muted mt-3">
            Después podés agregar una propina (opcional)
          </p>
        </div>
      </div>
    </div>
  )
}
