"use client"
import { useRealtimeSuggestions } from "@/hooks/useRealtimeSuggestions"
import type { Tables } from "@/types/database"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"
import { Music2, Check, X, User, Clock } from "lucide-react"
import { useState } from "react"
import type { MatchedTrack } from "@/types/database"

type Suggestion = Tables<"suggestions">

interface SuggestionsLiveListProps {
  initialSuggestions: Suggestion[]
  djUserId: string
}

export function SuggestionsLiveList({ initialSuggestions, djUserId }: SuggestionsLiveListProps) {
  const suggestions = useRealtimeSuggestions(djUserId, initialSuggestions)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleAccept(id: string) {
    setLoadingId(id)
    await fetch(`/api/suggestions/${id}/accept`, { method: "POST" })
    setLoadingId(null)
  }

  async function handleReject(id: string) {
    setLoadingId(id)
    await fetch(`/api/suggestions/${id}/reject`, { method: "POST" })
    setLoadingId(null)
  }

  if (suggestions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Music2 className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-primary mb-2">Sin sugerencias aún</h3>
        <p className="text-text-secondary text-sm">
          Cuando el público escanee tu QR y sugiera canciones, aparecerán acá en tiempo real.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {suggestions.map(s => {
        const track = s.matched_track as MatchedTrack | null
        return (
          <Card key={s.id} className={`p-5 transition-all ${s.status === "pending" ? "border-brand/20" : ""}`}>
            <div className="flex items-start gap-4">
              {/* Track image or icon */}
              <div className="flex-shrink-0">
                {track?.image_url ? (
                  <img src={track.image_url} alt={track.title} className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-brand/15 flex items-center justify-center">
                    <Music2 className="w-6 h-6 text-brand" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium text-text-primary">{s.text}</p>
                  <Badge
                    variant={s.status === "accepted" ? "success" : s.status === "rejected" ? "error" : "violet"}
                    className="flex-shrink-0"
                  >
                    {s.status === "pending" ? "Pendiente" : s.status === "accepted" ? "✓ Aceptada" : "✗ Rechazada"}
                  </Badge>
                </div>

                {track && (
                  <p className="text-xs text-text-muted mb-2">
                    🎵 {track.title} — {track.artist}
                  </p>
                )}

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                  {s.contact_name && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {s.contact_name}
                    </span>
                  )}
                  {s.contact_instagram && <span>@{s.contact_instagram.replace("@", "")}</span>}
                  {s.tip_pool > 0 && (
                    <span className="text-warning font-medium">
                      💰 Pool: {formatCurrency(s.tip_pool)}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(s.created_at).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions — only for pending */}
            {s.status === "pending" && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  size="sm"
                  onClick={() => handleAccept(s.id)}
                  loading={loadingId === s.id}
                  className="flex-1"
                >
                  <Check className="w-4 h-4" />
                  Aceptar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleReject(s.id)}
                  loading={loadingId === s.id}
                  className="flex-1"
                >
                  <X className="w-4 h-4" />
                  Rechazar
                  {s.tip_pool > 0 && " + reembolsar"}
                </Button>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
