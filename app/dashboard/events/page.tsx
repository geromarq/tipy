import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Plus, QrCode, Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatDate, formatTime } from "@/lib/utils"

export default async function EventsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: events } = await supabase
    .from("events")
    .select(`
      id, name, venue, genre, start_time, end_time, is_active,
      qr_codes (id, slug, label, is_active)
    `)
    .eq("user_id", user.id)
    .order("start_time", { ascending: false })

  return (
    <div className="lg:pt-0 pt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary">Eventos & QRs</h1>
          <p className="text-text-muted text-sm mt-1">Creá y gestioná tus eventos</p>
        </div>
        <Link href="/dashboard/events/new">
          <Button>
            <Plus className="w-4 h-4" />
            Nuevo evento
          </Button>
        </Link>
      </div>

      {!events || events.length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Sin eventos aún</h2>
          <p className="text-text-secondary text-sm mb-6">
            Creá tu primer evento y generá un QR para tu próxima fecha.
          </p>
          <Link href="/dashboard/events/new">
            <Button>
              <Plus className="w-4 h-4" />
              Crear primer evento
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map(event => {
            const qrs = (event.qr_codes as { id: string; slug: string; label: string | null; is_active: boolean }[]) ?? []
            return (
              <Card key={event.id} className="p-5 hover:border-brand/20 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-text-primary">{event.name}</h3>
                      <Badge variant={event.is_active ? "success" : "default"}>
                        {event.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                      {event.venue && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(event.start_time)} · {formatTime(event.start_time)} — {formatTime(event.end_time)}
                      </span>
                      {event.genre && <span>🎵 {event.genre}</span>}
                    </div>
                  </div>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* QRs */}
                {qrs.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {qrs.map(qr => (
                      <div key={qr.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-surface-2 border border-border">
                        <QrCode className="w-3.5 h-3.5 text-text-muted" />
                        <span className="text-xs text-text-secondary">{qr.label || qr.slug}</span>
                        {qr.is_active && <div className="w-1.5 h-1.5 rounded-full bg-success" />}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
