import { createClient } from "@/lib/supabase/server"
import { SuggestionsLiveList } from "@/components/dashboard/SuggestionsLiveList"
import { Badge } from "@/components/ui/Badge"

export default async function SuggestionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: suggestions } = await supabase
    .from("suggestions")
    .select("*")
    .eq("dj_user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  const pending = (suggestions ?? []).filter(s => s.status === "pending").length

  return (
    <div className="lg:pt-0 pt-16">
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary">Sugerencias</h1>
          <p className="text-text-muted text-sm mt-1">Se actualizan en tiempo real</p>
        </div>
        {pending > 0 && (
          <Badge variant="violet" className="text-sm">
            {pending} pendiente{pending > 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      <SuggestionsLiveList
        initialSuggestions={suggestions ?? []}
        djUserId={user.id}
      />
    </div>
  )
}
