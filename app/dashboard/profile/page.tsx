import { createClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/dashboard/ProfileForm"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from("users")
    .select("display_name, slug, bio, instagram, avatar_url")
    .eq("id", user.id)
    .single()

  return (
    <div className="lg:pt-0 pt-16 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary">Mi perfil</h1>
        <p className="text-text-muted text-sm mt-1">Lo que el público ve en tu splash screen</p>
      </div>
      <ProfileForm
        displayName={profile?.display_name ?? ""}
        slug={profile?.slug ?? ""}
        bio={profile?.bio ?? ""}
        instagram={profile?.instagram ?? ""}
        avatarUrl={profile?.avatar_url ?? null}
      />
    </div>
  )
}
