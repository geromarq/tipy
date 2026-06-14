import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Lightbulb, TrendingUp, DollarSign, QrCode, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const today = new Date().toISOString().slice(0, 10)

  // Parallel data fetching
  const [suggestionsRes, vibesRes, tipsRes, activeQrsRes, profileRes] = await Promise.all([
    supabase
      .from("suggestions")
      .select("id, text, status, tip_pool, created_at")
      .eq("dj_user_id", user.id)
      .gte("created_at", today)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("vibe_ratings")
      .select("rating")
      .eq("dj_user_id", user.id)
      .gte("created_at", today),
    supabase
      .from("tip_transactions")
      .select("amount")
      .eq("dj_user_id", user.id)
      .eq("status", "approved")
      .gte("created_at", today),
    supabase
      .from("qr_codes")
      .select("id, slug, label")
      .eq("is_active", true)
      .in("event_id",
        (await supabase.from("events").select("id").eq("user_id", user.id).eq("is_active", true)).data?.map(e => e.id) ?? []
      )
      .limit(3),
    supabase.from("users").select("display_name").eq("id", user.id).single(),
  ])

  const suggestions = suggestionsRes.data ?? []
  const vibes = vibesRes.data ?? []
  const tips = tipsRes.data ?? []
  const activeQrs = activeQrsRes.data ?? []
  const profile = profileRes.data

  const avgVibe = vibes.length > 0
    ? Math.round(vibes.reduce((s, v) => s + v.rating, 0) / vibes.length * 10) / 10
    : null

  const totalTips = tips.reduce((s, t) => s + t.amount, 0)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches"

  return (
    <div className="lg:pt-0 pt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-text-muted text-sm">{greeting}</p>
          <h1 className="text-3xl font-black text-text-primary">{profile?.display_name ?? "DJ"} 👋</h1>
        </div>
        <Link href="/dashboard/events/new">
          <Button size="sm">
            <Plus className="w-4 h-4" />
            Nuevo evento
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Sugerencias hoy",
            value: suggestions.length.toString(),
            icon: Lightbulb,
            color: "text-brand",
          },
          {
            label: "Vibe promedio",
            value: avgVibe ? `${avgVibe}/10` : "—",
            icon: TrendingUp,
            color: "text-success",
          },
          {
            label: "Propinas hoy",
            value: totalTips > 0 ? formatCurrency(totalTips) : "—",
            icon: DollarSign,
            color: "text-warning",
          },
          {
            label: "QRs activos",
            value: activeQrs.length.toString(),
            icon: QrCode,
            color: "text-text-primary",
          },
        ].map(stat => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
            <p className="text-2xl font-black text-text-primary">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Recent suggestions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Sugerencias recientes</h2>
            <Link href="/dashboard/suggestions">
              <Button variant="ghost" size="sm">
                Ver todas <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <Lightbulb className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-muted">Aún no hay sugerencias hoy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map(s => (
                <Link key={s.id} href={`/dashboard/suggestions/${s.id}`} className="block">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-bg-surface-2 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary truncate">{s.text}</p>
                      {s.tip_pool > 0 && (
                        <p className="text-xs text-warning mt-0.5">💰 {formatCurrency(s.tip_pool)} en pool</p>
                      )}
                    </div>
                    <Badge
                      variant={s.status === "accepted" ? "success" : s.status === "rejected" ? "error" : "default"}
                    >
                      {s.status === "pending" ? "Pendiente" : s.status === "accepted" ? "Aceptada" : "Rechazada"}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Active QRs */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">QRs activos</h2>
            <Link href="/dashboard/events">
              <Button variant="ghost" size="sm">
                Gestionar <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {activeQrs.length === 0 ? (
            <div className="text-center py-8">
              <QrCode className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-muted mb-4">No tenés QRs activos</p>
              <Link href="/dashboard/events/new">
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                  Crear evento
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeQrs.map(qr => (
                <div key={qr.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-surface-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{qr.label || qr.slug}</p>
                    <p className="text-xs text-text-muted">tipy.uy/q/{qr.slug}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
