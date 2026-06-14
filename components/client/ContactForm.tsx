"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, SkipForward, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Link from "next/link"

interface ContactFormProps {
  qrSlug: string
}

export function ContactForm({ qrSlug }: ContactFormProps) {
  const searchParams = useSearchParams()
  const suggestionId = searchParams.get("sid") ?? ""
  const router = useRouter()

  const [name, setName] = useState("")
  const [instagram, setInstagram] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    try {
      await fetch(`/api/suggestions/${suggestionId}/contact`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_name: name || null,
          contact_instagram: instagram || null,
          contact_phone: phone || null,
          contact_email: email || null,
        }),
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleContinue() {
    await handleSave()
    router.push(`/q/${qrSlug}/suggest/tip?sid=${suggestionId}`)
  }

  async function handleSkip() {
    router.push(`/q/${qrSlug}/suggest/tip?sid=${suggestionId}`)
  }

  return (
    <div className="flex flex-col min-h-dvh px-6 py-8">
      <div className="flex items-center justify-between mb-10">
        <Link href={`/q/${qrSlug}/suggest`} className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-text-primary mb-2">Dejá tus datos</h1>
          <p className="text-text-secondary text-sm">
            Todo opcional. Si el DJ acepta o rechaza tu sugerencia, te avisamos.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Input
            label="Nombre o alias"
            placeholder="Ej: Facu 🎉"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            label="Instagram"
            placeholder="@tu_instagram"
            value={instagram}
            onChange={e => setInstagram(e.target.value)}
          />
          <Input
            label="WhatsApp / Teléfono"
            type="tel"
            placeholder="+598 9X XXX XXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            hint="Para avisarte si tu sugerencia fue aceptada"
          />
          <Input
            label="Email"
            type="email"
            placeholder="tu@mail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-auto space-y-3">
          <Button
            fullWidth
            size="xl"
            onClick={handleContinue}
            loading={loading}
          >
            <DollarSign className="w-5 h-5" />
            Agregar propina
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="ghost"
            onClick={handleSkip}
          >
            <SkipForward className="w-4 h-4" />
            Saltar — solo sugerir
          </Button>
        </div>
      </div>
    </div>
  )
}
