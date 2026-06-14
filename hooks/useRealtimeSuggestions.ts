"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Tables } from "@/types/database"

type Suggestion = Tables<"suggestions">

export function useRealtimeSuggestions(
  djUserId: string,
  initialData: Suggestion[]
) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialData)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`suggestions-${djUserId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "suggestions",
          filter: `dj_user_id=eq.${djUserId}`,
        },
        payload => {
          if (payload.eventType === "INSERT") {
            setSuggestions(prev => [payload.new as Suggestion, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setSuggestions(prev =>
              prev.map(s => s.id === payload.new.id ? payload.new as Suggestion : s)
            )
          } else if (payload.eventType === "DELETE") {
            setSuggestions(prev => prev.filter(s => s.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [djUserId])

  return suggestions
}
