"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Card } from "@/components/ui/Card"
import { Check, ExternalLink } from "lucide-react"

interface ProfileFormProps {
  displayName: string
  slug: string
  bio: string
  instagram: string
  avatarUrl: string | null
}

export function ProfileForm({ displayName, slug, bio, instagram, avatarUrl }: ProfileFormProps) {
  const [form, setForm] = useState({ displayName, slug, bio, instagram })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Error guardando perfil")
      setLoading(false)
      return
    }

    setSaved(true)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Avatar placeholder */}
      <Card className="p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-violet-400 flex items-center justify-center flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-2xl font-black text-white">
              {form.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-text-primary">{form.displayName}</p>
          <a
            href={`https://tipy.uy/dj/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand hover:underline flex items-center gap-1"
          >
            tipy.uy/dj/{form.slug}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-bold text-text-primary">Información pública</h2>
        <Input
          label="Nombre artístico"
          value={form.displayName}
          onChange={e => update("displayName", e.target.value)}
          required
        />
        <Input
          label="URL de tu perfil (slug)"
          value={form.slug}
          onChange={e => update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          hint={`tipy.uy/dj/${form.slug}`}
          required
        />
        <Input
          label="Instagram"
          value={form.instagram}
          onChange={e => update("instagram", e.target.value)}
          placeholder="@tu_instagram"
        />
        <Textarea
          label="Bio"
          value={form.bio}
          onChange={e => update("bio", e.target.value)}
          placeholder="Contale algo al público sobre vos..."
          rows={3}
        />
      </Card>

      {error && <p className="text-sm text-error text-center">{error}</p>}

      {saved && (
        <div className="flex items-center justify-center gap-2 text-success text-sm">
          <Check className="w-4 h-4" />
          Perfil guardado
        </div>
      )}

      <Button type="submit" fullWidth size="lg" loading={loading}>
        Guardar cambios
      </Button>
    </form>
  )
}
