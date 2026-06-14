"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError("Email o contraseña incorrectos")
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <Card className="p-8">
      <h1 className="text-2xl font-black text-text-primary mb-2">Bienvenido de vuelta</h1>
      <p className="text-text-secondary text-sm mb-8">Ingresá a tu dashboard de DJ</p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="••••••••"
          required
        />

        {error && <p className="text-sm text-error text-center">{error}</p>}

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Entrar
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted mt-6">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="text-brand hover:text-brand-light transition-colors font-medium">
          Registrate gratis
        </Link>
      </p>
    </Card>
  )
}
