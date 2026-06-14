"use client"
import { Card } from "@/components/ui/Card"
import { BarChart2 } from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts"
import { vibeColor } from "@/lib/utils"

interface VibeChartProps {
  data: { rating: number; created_at: string }[]
}

export function VibeChart({ data }: VibeChartProps) {
  if (data.length === 0) {
    return (
      <Card className="p-12 text-center">
        <BarChart2 className="w-12 h-12 text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-primary mb-2">Sin datos aún</h3>
        <p className="text-text-secondary text-sm">
          Cuando el público empiece a votar la vibe, el gráfico aparecerá acá en tiempo real.
        </p>
      </Card>
    )
  }

  const chartData = data.map(r => ({
    time: new Date(r.created_at).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
    rating: r.rating,
    fill: vibeColor(r.rating),
  }))

  const CustomDot = (props: { cx?: number; cy?: number; payload?: { fill: string } }) => {
    const { cx, cy, payload } = props
    if (!cx || !cy || !payload) return null
    return <circle cx={cx} cy={cy} r={4} fill={payload.fill} strokeWidth={0} />
  }

  return (
    <Card className="p-6">
      <h2 className="font-bold text-text-primary mb-6">Evolución de la vibe</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis
            dataKey="time"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--bg-surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--text-primary)",
            }}
            labelStyle={{ color: "var(--text-secondary)", fontSize: 12 }}
            formatter={(value) => [value, "Vibe"]}
          />
          <ReferenceLine y={5} stroke="var(--border)" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#7c3aed"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: "#7c3aed" }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-error inline-block" />
          Bajo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-warning inline-block" />
          Medio
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1.5 rounded-full bg-success inline-block" />
          Alto
        </span>
      </div>
    </Card>
  )
}
