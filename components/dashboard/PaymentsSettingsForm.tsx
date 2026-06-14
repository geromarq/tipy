"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Shield, Check, ExternalLink } from "lucide-react"

interface PaymentsSettingsFormProps {
  hasCredentials: boolean
  publicKey: string | null
  updatedAt: string | null
}

export function PaymentsSettingsForm({ hasCredentials, publicKey, updatedAt }: PaymentsSettingsFormProps) {
  const [accessToken, setAccessToken] = useState("")
  const [newPublicKey, setNewPublicKey] = useState(publicKey ?? "")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!accessToken.trim() || !newPublicKey.trim()) return
    setLoading(true)
    setError("")

    const res = await fetch("/api/payments/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: accessToken, public_key: newPublicKey }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Error guardando credenciales")
      setLoading(false)
      return
    }

    setSaved(true)
    setAccessToken("")
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Security notice */}
      <Card variant="violet" className="p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-text-primary text-sm mb-1">Almacenamiento seguro</p>
            <p className="text-xs text-text-secondary">
              Tu Access Token se cifra con AES-256 antes de guardarse. Nunca se expone al público ni aparece en el código del cliente. Solo se usa en el servidor para procesar pagos.
            </p>
          </div>
        </div>
      </Card>

      {/* Current status */}
      {hasCredentials && (
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">MercadoPago conectado</p>
              {updatedAt && (
                <p className="text-xs text-text-muted">
                  Última actualización: {new Date(updatedAt).toLocaleDateString("es-AR")}
                </p>
              )}
            </div>
            <Badge variant="success" className="ml-auto">Activo</Badge>
          </div>
        </Card>
      )}

      {/* Form */}
      <Card className="p-6">
        <h2 className="font-bold text-text-primary mb-1">
          {hasCredentials ? "Actualizar credenciales" : "Conectar MercadoPago"}
        </h2>
        <p className="text-xs text-text-muted mb-6">
          Encontrá tus credenciales en{" "}
          <a
            href="https://www.mercadopago.com.ar/developers/panel/app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline inline-flex items-center gap-1"
          >
            Panel de Desarrolladores MP
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Access Token de producción"
            type="password"
            value={accessToken}
            onChange={e => setAccessToken(e.target.value)}
            placeholder="APP_USR-..."
            hint="Empieza con APP_USR- (no usar test token en producción)"
            required
          />
          <Input
            label="Public Key"
            value={newPublicKey}
            onChange={e => setNewPublicKey(e.target.value)}
            placeholder="APP_USR-..."
            hint="Tu clave pública de MercadoPago"
            required
          />

          {error && <p className="text-sm text-error">{error}</p>}

          {saved && (
            <div className="flex items-center gap-2 text-success text-sm">
              <Check className="w-4 h-4" />
              Credenciales guardadas correctamente
            </div>
          )}

          <Button type="submit" fullWidth loading={loading}>
            <Shield className="w-4 h-4" />
            {hasCredentials ? "Actualizar credenciales" : "Guardar y conectar"}
          </Button>
        </form>
      </Card>

      {/* Info box */}
      <Card className="p-5 space-y-2 text-sm">
        <h3 className="font-semibold text-text-primary">¿Cómo funciona el pago?</h3>
        <ul className="space-y-1.5 text-text-secondary text-xs">
          <li>• El público paga con MercadoPago en su celular</li>
          <li>• El dinero se acredita en tu cuenta de MercadoPago</li>
          <li>• El plazo de acreditación mínimo es de <strong className="text-text-primary">21 días</strong></li>
          <li>• Si rechazás una sugerencia, la propina se reembolsa automáticamente</li>
          <li>• Tipy no retiene comisión — solo MercadoPago aplica su fee estándar</li>
        </ul>
      </Card>
    </div>
  )
}
