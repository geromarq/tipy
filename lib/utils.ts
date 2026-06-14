import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export function formatCurrency(amount: number, currency = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(date))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(date))
}

export function vibeColor(rating: number): string {
  if (rating <= 3) return "#ef4444"
  if (rating <= 5) return "#f97316"
  if (rating <= 7) return "#f59e0b"
  if (rating <= 8) return "#84cc16"
  return "#22c55e"
}

export function vibeLabel(rating: number): string {
  if (rating <= 2) return "Bajón total"
  if (rating <= 4) return "Puede mejorar"
  if (rating <= 6) return "Pasable"
  if (rating <= 8) return "Buena onda"
  if (rating <= 9) return "Explotando"
  return "¡FUEGO!"
}

export function getSessionToken(): string {
  if (typeof window === "undefined") return ""
  let token = sessionStorage.getItem("tipy_session")
  if (!token) {
    token = `s_${generateSlug(16)}`
    sessionStorage.setItem("tipy_session", token)
  }
  return token
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max) + "…"
}
