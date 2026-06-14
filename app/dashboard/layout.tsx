import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("users")
    .select("display_name, avatar_url")
    .eq("id", user.id)
    .single()

  return (
    <div className="flex min-h-dvh bg-bg-base">
      <DashboardSidebar
        userName={profile?.display_name ?? user.email ?? "DJ"}
        userAvatar={profile?.avatar_url ?? null}
      />
      <main className="flex-1 overflow-auto lg:ml-64">
        <div className="px-6 py-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
