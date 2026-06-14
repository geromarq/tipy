import Link from "next/link"
import { Music2, QrCode, Star, ArrowRight, Zap, Users, Shield, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { DecorativeShapes } from "@/components/ui/DecorativeShapes"
import { TipyLogo, TipyIcon } from "@/components/ui/TipyLogo"

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 glass border-b border-border/50">
        <TipyLogo size="md" />
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Iniciar sesión</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Soy DJ</Button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <DecorativeShapes />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-violet text-sm text-violet-300 mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5" />
            <span>La nueva forma de conectar DJ y público</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-slide-up">
            <span className="gradient-text">Sugerí música.</span>
            <br />
            <span className="text-text-primary">Dejá propina.</span>
            <br />
            <span className="text-text-secondary font-light text-4xl md:text-5xl">En tiempo real.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            Escaneá el QR del DJ, mandá tu canción favorita y apoyá con una propina directa.
            Sin apps, sin registro. Solo tu celular y las ganas de bailar.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            <Link href="/register">
              <Button size="xl" className="animate-pulse-glow">
                Empezar gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="xl" variant="secondary">
                ¿Cómo funciona?
                <ChevronDown className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Floating phone mockup */}
        <div className="relative z-10 mt-20 animate-float">
          <div className="mx-auto w-64 md:w-80">
            <div className="relative glass-violet rounded-[2.5rem] p-4 border border-violet-500/30 shadow-2xl shadow-brand/20">
              <div className="flex justify-between items-center px-2 mb-4 text-xs text-text-muted">
                <span>21:45</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-success opacity-80" />
                </div>
              </div>
              <div className="bg-bg-surface-2 rounded-2xl p-4 mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-violet-400 flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-primary">DJ Santi</p>
                    <p className="text-xs text-text-muted">Techno / House</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {["🔥 En vivo", "hasta las 3AM"].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-brand/20 text-violet-300">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-brand/20 border border-brand/30 rounded-xl p-3 text-center">
                  <Star className="w-4 h-4 text-violet-300 mx-auto mb-1" />
                  <p className="text-xs font-medium text-violet-200">Rate Vibe</p>
                </div>
                <div className="bg-bg-surface-3 rounded-xl p-3 text-center border border-border">
                  <Music2 className="w-4 h-4 text-text-secondary mx-auto mb-1" />
                  <p className="text-xs font-medium text-text-secondary">Sugerir</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-[2.5rem] blur-2xl bg-brand/15 -z-10" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-text-muted" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-border bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "0s", label: "para empezar" },
            { value: "100%", label: "mobile-first" },
            { value: "💜", label: "hecho para la noche" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-text-primary mb-4">Así funciona</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Simple para el público, poderoso para el DJ.
            </p>
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center">
                <span className="text-sm font-bold text-brand">DJ</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Para el DJ</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: QrCode,
                  step: "01",
                  title: "Creá tu QR",
                  desc: "Configurá la info de tu evento: género, mensaje, horario. Generás un QR único en segundos."
                },
                {
                  icon: Star,
                  step: "02",
                  title: "Imprimilo y pegalo",
                  desc: "Imprimí el QR y pegalo en el venue. Tu público lo escanea con cualquier celular, sin descargar nada."
                },
                {
                  icon: Music2,
                  step: "03",
                  title: "Recibí sugerencias en vivo",
                  desc: "Ves las sugerencias en tu dashboard en tiempo real. Aceptás, rechazás y las propinas llegan a tu cuenta."
                },
              ].map(item => (
                <Card key={item.step} className="p-6 relative overflow-hidden group hover:border-brand/30 transition-colors">
                  <span className="absolute top-4 right-4 text-5xl font-black text-bg-surface-4 group-hover:text-brand/10 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-brand" />
                  </div>
                  <h4 className="font-bold text-text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-border" />
            <span className="text-text-muted text-sm">Y para el público</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { emoji: "📱", title: "Escanean el QR", desc: "En segundos, desde cualquier celular." },
              { emoji: "🎵", title: "Sugieren música", desc: "Una canción, un género, o lo que quieran." },
              { emoji: "💜", title: "Votan la vibe", desc: "Un slider de 🔴 a 🟢 para decir cómo está la noche." },
              { emoji: "💰", title: "Dejan propina", desc: "Opcional, directo por MercadoPago." },
            ].map(item => (
              <Card key={item.title} variant="glass" className="p-5 text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h4 className="font-semibold text-text-primary mb-1 text-sm">{item.title}</h4>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-text-primary mb-4">Todo lo que necesitás</h2>
            <p className="text-text-secondary">Sin complicaciones. Sin apps. Solo el link.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎛️",
                title: "Dashboard en tiempo real",
                desc: "Ves cada sugerencia al instante. Aceptás o rechazás con un toque."
              },
              {
                icon: "🗳️",
                title: "Crowdsourcing de pista",
                desc: "El público vota y suma plata a las sugerencias que más quieren escuchar."
              },
              {
                icon: "📊",
                title: "Métricas de vibe",
                desc: "Seguí cómo reacciona el público a lo largo de la noche con gráficos en vivo."
              },
              {
                icon: "🔗",
                title: "QR compartido",
                desc: "Coordiná varios DJs en el mismo evento con slots de horario."
              },
              {
                icon: "💳",
                title: "MercadoPago integrado",
                desc: "Propinas directas a tu cuenta. Reembolso automático si rechazás una sugerencia."
              },
              {
                icon: "🔒",
                title: "100% seguro",
                desc: "Tus credenciales de pago están cifradas. Nunca se exponen al público."
              },
            ].map(feature => (
              <Card key={feature.title} className="p-6 hover:border-brand/30 transition-colors group">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-text-primary mb-2 group-hover:text-brand transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-text-secondary">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CROWDSOURCE */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-violet text-sm text-violet-300 mb-6">
                <Users className="w-3.5 h-3.5" />
                <span>Propuestas de la Pista</span>
              </div>
              <h2 className="text-4xl font-black text-text-primary mb-6">
                La pista decide qué suena
              </h2>
              <p className="text-text-secondary text-lg mb-6">
                Cuando alguien sugiere una canción, aparece en la sección pública.
                El resto puede votar o sumar plata al pool.
                El DJ ve cuánto apoyo tiene cada canción antes de decidir.
              </p>
              <ul className="space-y-3">
                {[
                  "Votación anónima o con alias",
                  "Pool de propinas por canción",
                  "El DJ ve el ranking en tiempo real",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-success" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <Card variant="glass" className="p-4 space-y-3">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide px-2">
                  Propuestas de la pista 🔥
                </p>
                {[
                  { song: "Satisfaction — Benny Benassi", votes: 12, pool: "$2.400", rank: 1 },
                  { song: "One More Time — Daft Punk", votes: 8, pool: "$1.800", rank: 2 },
                  { song: "Levels — Avicii", votes: 5, pool: "$900", rank: 3 },
                ].map(item => (
                  <div key={item.song} className="flex items-center gap-3 p-3 rounded-xl bg-bg-surface-2 border border-border">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.rank === 1 ? "bg-warning/20 text-warning" : "bg-bg-surface-3 text-text-muted"}`}>
                      {item.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{item.song}</p>
                      <p className="text-xs text-text-muted">{item.votes} votos · pool {item.pool}</p>
                    </div>
                    <button className="text-xs px-2.5 py-1 rounded-lg bg-brand/15 text-violet-300 border border-brand/20 flex-shrink-0">
                      +1
                    </button>
                  </div>
                ))}
              </Card>
              <div className="absolute -inset-4 blur-3xl bg-brand/5 -z-10 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-16 px-6 bg-bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-10 h-10 text-brand mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-3">Tus datos siempre seguros</h2>
          <p className="text-text-secondary">
            Las credenciales de MercadoPago se guardan cifradas con AES-256.
            Las propinas van directo a tu cuenta. El público nunca ve tus tokens.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-32 px-6 overflow-hidden">
        <DecorativeShapes />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black gradient-text mb-6">
            ¿Listo para la próxima fecha?
          </h2>
          <p className="text-text-secondary text-xl mb-10">
            Creá tu cuenta gratis y generá tu primer QR en menos de 2 minutos.
          </p>
          <Link href="/register">
            <Button size="xl" className="animate-pulse-glow">
              Empezar ahora — es gratis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <TipyLogo size="xs" />
            <span className="text-text-muted text-sm">· tipy.uy</span>
          </div>
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Tipy. Hecho con 💜 para la noche.
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="/about" className="hover:text-text-primary transition-colors">Nosotros</Link>
            <Link href="/login" className="hover:text-text-primary transition-colors">DJ Login</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
