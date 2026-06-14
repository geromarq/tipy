import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { formatTime } from "@/lib/utils"
import { SplashScreen } from "@/components/client/SplashScreen"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function QRSplashPage({ params }: Props) {
  const { qrSlug } = await params
  const supabase = await createClient()

  const { data: qr } = await supabase
    .from("qr_codes")
    .select(`
      id,
      slug,
      is_active,
      event:events (
        id,
        name,
        venue,
        genre,
        message,
        start_time,
        end_time,
        is_active,
        dj:users (
          id,
          display_name,
          slug,
          bio,
          instagram,
          avatar_url
        )
      )
    `)
    .eq("slug", qrSlug)
    .single()

  if (!qr || !qr.is_active) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const event = (qr.event as any) as {
    id: string
    name: string
    venue: string | null
    genre: string | null
    message: string | null
    start_time: string
    end_time: string
    is_active: boolean
    dj: {
      id: string
      display_name: string
      slug: string
      bio: string | null
      instagram: string | null
      avatar_url: string | null
    }
  }

  if (!event || !event.is_active) notFound()

  return (
    <SplashScreen
      qrSlug={qrSlug}
      djName={event.dj.display_name}
      djSlug={event.dj.slug}
      djInstagram={event.dj.instagram}
      djAvatar={event.dj.avatar_url}
      djBio={event.dj.bio}
      eventName={event.name}
      venue={event.venue}
      genre={event.genre}
      message={event.message}
      endTime={formatTime(event.end_time)}
    />
  )
}
