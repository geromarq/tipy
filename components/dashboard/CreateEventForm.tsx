"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Card } from "@/components/ui/Card"
import { QrCode, Download } from "lucide-react"

export function CreateEventForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [qrData, setQrData] = useState<{ slug: string; qrUrl: string } | null>(null)
  const [form, setForm] = useState({
    name: "",
    venue: "",
    genre: "",
    message: "",
    start_time: "",
    end_time: "",
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.slug && data.qrUrl) {
        setQrData(data)
      }
    } finally {
      setLoading(false)
    }
  }

  if (qrData) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-black text-text-primary mb-2">¡Evento creado!</h2>
        <p className="text-text-secondary text-sm mb-6">
          Tu QR está listo. Imprimilo y pegalo en el venue.
        </p>

        {/* QR preview */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-2xl">
            <img src={qrData.qrUrl} alt="QR Code" className="w-48 h-48" />
          </div>
        </div>

        <p className="text-xs text-text-muted mb-6">
          Link: <span className="text-brand">tipy.uy/q/{qrData.slug}</span>
        </p>

        <div className="flex gap-3 justify-center">
          <a href={qrData.qrUrl} download={`tipy-qr-${qrData.slug}.png`}>
            <Button variant="secondary">
              <Download className="w-4 h-4" />
              Descargar QR
            </Button>
          </a>
          <Button onClick={() => router.push("/dashboard/events")}>
            Ver todos los eventos
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 space-y-4">
        <h2 className="font-bold text-text-primary">Datos del evento</h2>
        <Input
          label="Nombre del evento *"
          value={form.name}
          onChange={e => update("name", e.target.value)}
          placeholder="Ej: Fiesta en Club X"
          required
        />
        <Input
          label="Venue / Lugar"
          value={form.venue}
          onChange={e => update("venue", e.target.value)}
          placeholder="Ej: Club Venue, Montevideo"
        />
        <Input
          label="Género musical"
          value={form.genre}
          onChange={e => update("genre", e.target.value)}
          placeholder="Ej: Tech House / Techno"
        />
        <Textarea
          label="Mensaje de bienvenida"
          value={form.message}
          onChange={e => update("message", e.target.value)}
          placeholder="Ej: Esta noche vamos a explotar el lugar. ¡Bienvenidos!"
          rows={3}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-bold text-text-primary">Horario</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Inicio *"
            type="datetime-local"
            value={form.start_time}
            onChange={e => update("start_time", e.target.value)}
            required
          />
          <Input
            label="Fin *"
            type="datetime-local"
            value={form.end_time}
            onChange={e => update("end_time", e.target.value)}
            required
          />
        </div>
      </Card>

      <Button type="submit" fullWidth size="lg" loading={loading}>
        <QrCode className="w-5 h-5" />
        Crear evento y generar QR
      </Button>
    </form>
  )
}
