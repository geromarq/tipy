import { createClient } from "@/lib/supabase/server"
import { PaymentsSettingsForm } from "@/components/dashboard/PaymentsSettingsForm"

export default async function PaymentsSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: creds } = await supabase
    .from("mp_credentials")
    .select("public_key, updated_at")
    .eq("user_id", user.id)
    .single()

  return (
    <div className="lg:pt-0 pt-16 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary">Configurar pagos</h1>
        <p className="text-text-muted text-sm mt-1">
          Conectá tu cuenta de MercadoPago para recibir propinas
        </p>
      </div>
      <PaymentsSettingsForm
        hasCredentials={!!creds}
        publicKey={creds?.public_key ?? null}
        updatedAt={creds?.updated_at ?? null}
      />
    </div>
  )
}
