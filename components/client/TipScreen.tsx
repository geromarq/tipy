"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, DollarSign, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const PRESET_AMOUNTS = [200, 500, 1000, 2000, 5000]

interface TipScreenProps {
  qrSlug: string
}

export function TipScreen({ qrSlug }: TipScreenProps) {
  const searchParams = useSearchParams()
  const suggestionId = searchParams.get("sid") ?? ""

  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const finalAmount = amount ?? Number(customAmount) ?? 0

  async function handleTip() {
    if (!finalAmount || finalAmount < 100) return
    setLoading(true)
    try {
      const res = await fetch("/api/payments/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestion_id: suggestionId, amount: finalAmount }),
      })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      }
    } catch {
      setLoading(false)
    }
  }

  async function handleSkip() {
    setSkipped(true)
    await fetch(`/api/suggestions/${suggestionId}/finalize`, { method: "POST" })
    setTimeout(() => {
      window.location.href = `/${qrSlug}/suggest/done`
    }, 800)
  }

  if (skipped) {
    return (
      <div className="flex flex-col min-h-dvh items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-black text-text-primary mb-2 text-center">¡Sugerencia enviada!</h2>
        <p className="text-text-secondary text-center text-sm">El DJ ya puede verla. 🎶</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8">
      <div className="flex items-center justify-between mb-10">
        <Link href={`/q/${qrSlug}/suggest/contact?sid=${suggestionId}`} className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-3xl font-black text-text-primary mb-2">¿Le dejás propina?</h1>
          <p className="text-text-secondary text-sm">
            100% opcional. Va directo al DJ por MercadoPago.
          </p>
        </div>

        {/* Preset amounts */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {PRESET_AMOUNTS.map(preset => (
            <button
              key={preset}
              onClick={() => { setAmount(preset); setCustomAmount("") }}
              className={`py-4 rounded-2xl text-center border transition-all font-semibold text-sm ${
                amount === preset
                  ? "border-brand bg-brand/15 text-brand"
                  : "border-border bg-bg-surface-2 text-text-secondary hover:border-brand/30"
              }`}
            >
              {formatCurrency(preset)}
            </button>
          ))}
          {/* Custom */}
          <div className={`relative col-span-1 rounded-2xl border transition-all ${customAmount ? "border-brand" : "border-border"}`}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={e => { setCustomAmount(e.target.value); setAmount(null) }}
              placeholder="Otro"
              className="w-full h-full py-4 pl-7 pr-3 bg-bg-surface-2 rounded-2xl text-text-primary text-sm focus:outline-none"
            />
          </div>
        </div>

        {finalAmount >= 100 && (
          <p className="text-center text-sm text-text-muted mb-6">
            Propina: <span className="text-brand font-semibold">{formatCurrency(finalAmount)}</span>
          </p>
        )}

        <div className="mt-auto space-y-3">
          <Button
            fullWidth
            size="xl"
            onClick={handleTip}
            loading={loading}
            disabled={!finalAmount || finalAmount < 100}
          >
            <DollarSign className="w-5 h-5" />
            Pagar con MercadoPago
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="ghost"
            onClick={handleSkip}
          >
            Solo sugerir sin propina
          </Button>
        </div>
      </div>
    </div>
  )
}
