import { createClient } from "@/lib/supabase/server"
import { VibeChart } from "@/components/dashboard/VibeChart"
import { Card } from "@/components/ui/Card"
import { vibeColor, vibeLabel } from "@/lib/utils"

export default async function VibesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: ratings } = await supabase
    .from("vibe_ratings")
    .select("rating, created_at, event_id")
    .eq("dj_user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(200)

  const data = ratings ?? []

  const avg = data.length > 0
    ? data.reduce((s, r) => s + r.rating, 0) / data.length
    : null

  const avgRounded = avg ? Math.round(avg * 10) / 10 : null

  return (
    <div className="lg:pt-0 pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary">Vibe del público</h1>
        <p className="text-text-muted text-sm mt-1">Cómo reaccionó la pista a lo largo de la noche</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-5 text-center">
          <p className="text-3xl font-black" style={{ color: avgRounded ? vibeColor(avgRounded) : "var(--text-muted)" }}>
            {avgRounded ?? "—"}
          </p>
          <p className="text-xs text-text-muted mt-1">Promedio general</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-3xl font-black text-text-primary">{data.length}</p>
          <p className="text-xs text-text-muted mt-1">Votos totales</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="text-lg font-bold" style={{ color: avgRounded ? vibeColor(avgRounded) : "var(--text-muted)" }}>
            {avgRounded ? vibeLabel(avgRounded) : "—"}
          </p>
          <p className="text-xs text-text-muted mt-1">Estado</p>
        </Card>
      </div>

      {/* Chart */}
      <VibeChart data={data} />
    </div>
  )
}
