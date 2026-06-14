"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, Lightbulb,
  BarChart2, User, Settings, LogOut, QrCode, Menu, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { TipyLogo } from "@/components/ui/TipyLogo"

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/events", label: "Eventos & QRs", icon: QrCode },
  { href: "/dashboard/suggestions", label: "Sugerencias", icon: Lightbulb },
  { href: "/dashboard/vibes", label: "Vibe del público", icon: BarChart2 },
  { href: "/dashboard/profile", label: "Mi perfil", icon: User },
  { href: "/dashboard/settings/payments", label: "Configurar pagos", icon: Settings },
]

interface DashboardSidebarProps {
  userName: string
  userAvatar: string | null
}

export function DashboardSidebar({ userName, userAvatar }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-border">
        <TipyLogo size="md" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-brand/15 text-brand border border-brand/20"
                  : "text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand/30 flex items-center justify-center">
              <span className="text-xs font-bold text-brand">{userName.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <span className="text-sm font-medium text-text-primary truncate">{userName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-error transition-colors w-full px-3 py-2"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-bg-surface border-b border-border">
        <TipyLogo size="xs" />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-text-muted">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-bg-base/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "lg:hidden fixed top-0 left-0 bottom-0 z-40 w-64 bg-bg-surface border-r border-border flex flex-col transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-bg-surface border-r border-border flex-col z-30">
        <SidebarContent />
      </aside>
    </>
  )
}
