"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"

export function RegisterForm() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Error al registrarse")
      setLoading(false)
      return
    }

    if (data.needsConfirmation) {
      setSuccess(true)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  if (success) {
    return (
      <Card className="p-8 text-center">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Revisá tu email</h2>
        <p className="text-text-secondary text-sm">
          Te mandamos un link de confirmación a <strong className="text-text-primary">{email}</strong>.
          Hacé click en el link para activar tu cuenta.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-8">
      <h1 className="text-2xl font-black text-text-primary mb-2">Creá tu cuenta DJ</h1>
      <p className="text-text-secondary text-sm mb-8">Gratis. Sin tarjeta. En 2 minutos.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre artístico o alias"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder="DJ Santi"
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          minLength={8}
          required
        />

        {error && <p className="text-sm text-error text-center">{error}</p>}

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Crear cuenta gratis
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted mt-6">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-brand hover:text-brand-light transition-colors font-medium">
          Iniciar sesión
        </Link>
      </p>
    </Card>
  )
}
