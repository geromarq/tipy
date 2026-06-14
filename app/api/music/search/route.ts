import { NextResponse } from "next/server"

let spotifyToken: { token: string; expiresAt: number } | null = null

async function getSpotifyToken(): Promise<string | null> {
  if (spotifyToken && Date.now() < spotifyToken.expiresAt) return spotifyToken.token

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  if (!clientId || !clientSecret) return null

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })
    const data = await res.json()
    if (data.access_token) {
      spotifyToken = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
      return data.access_token
    }
  } catch {}
  return null
}

interface TrackResult {
  title: string
  artist: string
  album?: string
  image_url?: string
  source: "spotify" | "lastfm"
}

async function searchSpotify(query: string): Promise<TrackResult[]> {
  const token = await getSpotifyToken()
  if (!token) return []

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const data = await res.json()
    return (data.tracks?.items ?? []).map((track: {
      name: string
      artists: { name: string }[]
      album: { name: string; images: { url: string }[] }
    }) => ({
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      image_url: track.album.images[0]?.url,
      source: "spotify" as const,
    }))
  } catch {
    return []
  }
}

async function searchLastFm(query: string): Promise<TrackResult[]> {
  const apiKey = process.env.LASTFM_API_KEY
  if (!apiKey) return []

  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&api_key=${apiKey}&format=json&limit=5`
    )
    const data = await res.json()
    return (data.results?.trackmatches?.track ?? []).map((track: {
      name: string
      artist: string
      image: { "#text": string; size: string }[]
    }) => ({
      title: track.name,
      artist: track.artist,
      image_url: track.image?.find((i) => i.size === "medium")?.["#text"] || undefined,
      source: "lastfm" as const,
    }))
  } catch {
    return []
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")?.trim()

  if (!query) {
    return NextResponse.json({ tracks: [] })
  }

  let tracks = await searchSpotify(query)
  if (tracks.length === 0) {
    tracks = await searchLastFm(query)
  }

  return NextResponse.json({ tracks })
}
