import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TipyLogo } from "@/components/ui/TipyLogo"
import { DecorativeShapes } from "@/components/ui/DecorativeShapes"
import { TeamCard } from "@/components/about/TeamCard"

const team = [
  {
    name: "Gerónimo Martínez",
    role: "Co-fundador",
    email: "geromarqui@gmail.com",
    linkedin: "https://www.linkedin.com/in/geronimo-m-a1592928a",
  },
  {
    name: "Ignacio Bordagorry",
    role: "Co-fundador",
    email: "nachobordagorry2020@gmail.com",
    linkedin: "https://www.linkedin.com/in/juan-bordagorry-mart%C3%ADnez-a434b12ba/",
  },
  {
    name: "Nicolás Cabrera",
    role: "Co-fundador",
    email: "nicolascabreraaguilar@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicolas-cabrera-7346b1289/",
  },
]

export const metadata = {
  title: "Quiénes somos — Tipy",
  description: "Conocé al equipo detrás de Tipy, la plataforma de sugerencias musicales y propinas para DJs.",
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 glass border-b border-border/50">
        <TipyLogo size="md" />
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
      </nav>

      <DecorativeShapes />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-violet text-sm text-violet-300 mb-6">
            <span>💜</span>
            <span>El equipo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-text-primary mb-6">
            ¿Quiénes somos?
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Somos un equipo de tres estudiantes uruguayos que aman la noche, la música
            y construir cosas que la gente usa de verdad. Tipy nació de querer conectar
            al DJ con su pista de una forma simple y directa.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {team.map(member => (
            <TeamCard key={member.email} member={member} />
          ))}
        </div>

        {/* Mission */}
        <div className="mt-24 rounded-2xl border border-brand/20 bg-bg-surface-2 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🎧</div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Nuestra misión</h2>
            <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
              Que cada noche de música sea mejor. Que el DJ sepa qué quiere su pista,
              que el público se sienta parte del show, y que las propinas lleguen directo
              al artista sin intermediarios.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex justify-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Tipy · Hecho con 💜 en Uruguay
          </p>
        </div>
      </footer>
    </main>
  )
}
