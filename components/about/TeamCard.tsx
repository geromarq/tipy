"use client"
import { useState } from "react"
import { Mail, Send, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface TeamMember {
  name: string
  role: string
  email: string
  linkedin: string
}

export function TeamCard({ member }: { member: TeamMember }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function handleSend() {
    const mailto = `mailto:${member.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailto
    setShowEmailForm(false)
  }

  return (
    <div className="relative flex flex-col rounded-2xl border border-border bg-bg-surface-2 overflow-hidden transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10">
      {/* Avatar */}
      <div className="flex flex-col items-center px-8 pt-10 pb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand to-violet-400 flex items-center justify-center mb-4 shadow-lg shadow-brand/20 text-3xl font-black text-white select-none">
          {member.name.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-text-primary">{member.name}</h3>
        <p className="text-sm text-text-muted mt-1">{member.role}</p>
      </div>

      {/* Email form (inline, collapsible) */}
      {showEmailForm && (
        <div className="mx-6 mb-4 rounded-xl border border-brand/30 bg-bg-surface-3 p-4 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-muted font-medium">Para: {member.email}</span>
            <button
              onClick={() => setShowEmailForm(false)}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Asunto"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full rounded-lg bg-bg-surface-2 border border-border text-text-primary text-sm px-3 py-2 placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors"
          />
          <textarea
            placeholder="Escribí tu mensaje..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-bg-surface-2 border border-border text-text-primary text-sm px-3 py-2 placeholder:text-text-muted focus:outline-none focus:border-brand/50 transition-colors resize-none"
          />
          <Button
            fullWidth
            size="sm"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
            Abrir en mi correo
          </Button>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 px-6 pb-8">
        <Button
          variant={showEmailForm ? "outline" : "secondary"}
          size="sm"
          onClick={() => setShowEmailForm(v => !v)}
        >
          <Mail className="w-4 h-4" />
          {showEmailForm ? "Cancelar" : "Email"}
        </Button>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 text-xs px-3 py-1.5 bg-[#0077B5]/15 hover:bg-[#0077B5]/25 text-[#5BA3C9] border border-[#0077B5]/30 hover:border-[#0077B5]/50"
        >
          <ExternalLink className="w-4 h-4" />
          LinkedIn
        </a>
      </div>
    </div>
  )
}
