import { cn } from "@/lib/utils"

export function DecorativeShapes({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Large rotated circle — top left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06] animate-float-slow"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
        }}
      />

      {/* Rotated square — top right */}
      <svg
        className="absolute -top-16 -right-16 opacity-[0.07] animate-float-delayed"
        style={{ "--rotate": "45deg" } as React.CSSProperties}
        width="320" height="320" viewBox="0 0 320 320" fill="none"
      >
        <rect
          x="40" y="40" width="240" height="240" rx="32"
          stroke="#7c3aed" strokeWidth="2" fill="none"
          transform="rotate(45 160 160)"
        />
        <rect
          x="80" y="80" width="160" height="160" rx="20"
          stroke="#8b5cf6" strokeWidth="1.5" fill="none"
          transform="rotate(45 160 160)"
        />
      </svg>

      {/* Star/cross — bottom left */}
      <svg
        className="absolute bottom-16 -left-12 opacity-[0.08] animate-float"
        width="160" height="160" viewBox="0 0 160 160" fill="none"
      >
        <path
          d="M80 10 L90 70 L150 80 L90 90 L80 150 L70 90 L10 80 L70 70 Z"
          fill="#7c3aed" fillOpacity="0.5"
        />
      </svg>

      {/* Diamond grid — bottom right */}
      <svg
        className="absolute -bottom-12 -right-8 opacity-[0.05] animate-float-delayed"
        width="200" height="200" viewBox="0 0 200 200" fill="none"
      >
        {Array.from({ length: 4 }).map((_, i) =>
          Array.from({ length: 4 }).map((_, j) => (
            <rect
              key={`${i}-${j}`}
              x={i * 44 + 10} y={j * 44 + 10}
              width="24" height="24" rx="4"
              fill="#7c3aed"
              transform={`rotate(45 ${i * 44 + 22} ${j * 44 + 22})`}
            />
          ))
        )}
      </svg>

      {/* Gradient orb — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.04] blur-3xl"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #8b5cf6, #c4b5fd)",
        }}
      />
    </div>
  )
}

export function SmallDecorativeShapes({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-[0.08] animate-float"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
      />
      <svg
        className="absolute bottom-0 left-0 opacity-[0.06] animate-float-delayed"
        width="120" height="120" viewBox="0 0 120 120" fill="none"
      >
        <circle cx="60" cy="60" r="50" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="60" r="30" stroke="#8b5cf6" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}
