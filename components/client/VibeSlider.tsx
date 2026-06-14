"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { vibeColor, vibeLabel, getSessionToken } from "@/lib/utils"
import Link from "next/link"

interface VibeSliderProps {
  qrSlug: string
}

export function VibeSlider({ qrSlug }: VibeSliderProps) {
  const [rating, setRating] = useState(7)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const color = vibeColor(rating)
  const label = vibeLabel(rating)

  async function handleSubmit() {
    setLoading(true)
    try {
      await fetch("/api/vibes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qr_slug: qrSlug,
          rating,
          session_token: getSessionToken(),
        }),
      })
      setSubmitted(true)
      setTimeout(() => {
        router.push(`/q/${qrSlug}/vibe/success`)
      }, 1200)
    } catch {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-dvh items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6 animate-vibe-pulse">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-black text-text-primary mb-2">¡Voto enviado!</h2>
        <p className="text-text-secondary text-center">Gracias por compartir tu vibe 🎶</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <Link href={`/q/${qrSlug}/menu`} className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-text-primary mb-2 text-center">Rate the Vibe</h1>
        <p className="text-text-muted text-sm mb-16 text-center">¿Cómo está la noche?</p>

        {/* Current rating display */}
        <div
          className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-12 transition-all duration-300"
          style={{
            background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
            border: `3px solid ${color}44`,
            boxShadow: `0 0 40px ${color}20`,
          }}
        >
          <span className="text-4xl font-black" style={{ color }}>{rating}</span>
          <span className="text-xs text-text-muted mt-0.5">/ 10</span>
        </div>

        {/* Label */}
        <p className="text-xl font-bold mb-10 transition-all duration-300" style={{ color }}>
          {label}
        </p>

        {/* Slider */}
        <div className="w-full max-w-xs mb-4">
          <input
            type="range"
            min={1}
            max={10}
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="vibe-slider"
            style={{
              background: `linear-gradient(to right, #ef4444, #f59e0b, #22c55e)`,
            }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between w-full max-w-xs mb-16">
          <span className="text-xs text-error">😩 Bajón</span>
          <span className="text-xs text-success">🔥 Fuego</span>
        </div>

        <Button
          fullWidth
          size="xl"
          onClick={handleSubmit}
          loading={loading}
          className="max-w-xs"
        >
          Enviar voto
        </Button>
      </div>
    </div>
  )
}
