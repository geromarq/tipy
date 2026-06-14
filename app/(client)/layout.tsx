export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-bg-base">
      {children}
    </div>
  )
}
