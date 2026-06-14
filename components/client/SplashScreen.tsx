"use client"
import Link from "next/link"
import { ExternalLink, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SmallDecorativeShapes } from "@/components/ui/DecorativeShapes"
import { TipyLogo } from "@/components/ui/TipyLogo"

interface SplashScreenProps {
  qrSlug: string
  djName: string
  djSlug: string
  djInstagram: string | null
  djAvatar: string | null
  djBio: string | null
  eventName: string
  venue: string | null
  genre: string | null
  message: string | null
  endTime: string
}

export function SplashScreen({
  qrSlug,
  djName,
  djSlug,
  djInstagram,
  djAvatar,
  djBio,
  eventName,
  venue,
  genre,
  message,
  endTime,
}: SplashScreenProps) {
  return (
    <div className="relative flex flex-col min-h-dvh overflow-hidden">
      <SmallDecorativeShapes />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-bg-base to-bg-base pointer-events-none" />

      <div className="relative flex flex-col flex-1 px-6 pt-12 pb-8">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <TipyLogo size="sm" />
        </div>

        {/* DJ Avatar */}
        <div className="flex flex-col items-center mb-8 animate-slide-up">
          <div className="relative mb-4">
            {djAvatar ? (
              <img
                src={djAvatar}
                alt={djName}
                className="w-24 h-24 rounded-full object-cover border-2 border-brand/40"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-violet-400 flex items-center justify-center border-2 border-brand/40">
                <span className="text-3xl font-black text-white">
                  {djName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {/* Live indicator */}
            <div className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-success text-white text-xs font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </div>
          </div>

          <h1 className="text-3xl font-black text-text-primary mb-1">{djName}</h1>

          {djInstagram && (
            <a
              href={`https://instagram.com/${djInstagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-muted hover:text-text-secondary transition-colors text-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>@{djInstagram.replace("@", "")}</span>
            </a>
          )}
        </div>

        {/* Event info */}
        <div className="space-y-3 mb-8 animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          {genre && (
            <div className="glass-violet rounded-2xl px-5 py-4 text-center">
              <p className="text-xs text-violet-400 mb-1 uppercase tracking-wide font-medium">Tonight's vibe</p>
              <p className="text-xl font-bold text-text-primary">{genre}</p>
            </div>
          )}

          {message && (
            <div className="glass rounded-2xl px-5 py-4">
              <p className="text-text-secondary text-sm text-center italic">"{message}"</p>
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-3">
              <Clock className="w-4 h-4 text-text-muted flex-shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Hasta las</p>
                <p className="text-sm font-semibold text-text-primary">{endTime}</p>
              </div>
            </div>
            {venue && (
              <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4 py-3">
                <MapPin className="w-4 h-4 text-text-muted flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-muted">Venue</p>
                  <p className="text-sm font-semibold text-text-primary truncate">{venue}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-auto animate-slide-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <Link href={`/q/${qrSlug}/menu`}>
            <Button fullWidth size="xl" className="animate-pulse-glow">
              Siguiente
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-center text-xs text-text-muted mt-4">
            Sin apps · Sin registro · 100% vos
          </p>
        </div>
      </div>
    </div>
  )
}
