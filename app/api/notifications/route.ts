import { NextResponse } from "next/server"
import { Resend } from "resend"

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@tipy.uy"

export async function POST(req: Request) {
  // Verify internal secret
  const secret = req.headers.get("X-Internal-Secret")
  if (secret !== process.env.INTERNAL_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await req.json()
  const { type, to_email, name, refunded } = body

  if (!to_email) return NextResponse.json({ ok: true })

  const displayName = name ? `, ${name}` : ""

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    if (type === "suggestion_accepted") {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: to_email,
        subject: "¡Tu sugerencia fue aceptada! 🎵",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#09090b;color:#fafafa;padding:32px;border-radius:16px">
            <h1 style="color:#8b5cf6;margin-bottom:8px">¡Buenas noticias${displayName}!</h1>
            <p style="color:#a1a1aa">El DJ aceptó tu sugerencia musical. 🎶</p>
            <p style="color:#71717a;font-size:12px;margin-top:24px">Powered by <a href="https://tipy.uy" style="color:#7c3aed">tipy.uy</a></p>
          </div>
        `,
      })
    } else if (type === "suggestion_rejected") {
      await (resend as Resend).emails.send({
        from: FROM_EMAIL,
        to: to_email,
        subject: "Tu sugerencia no pudo ser en esta ocasión",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#09090b;color:#fafafa;padding:32px;border-radius:16px">
            <h1 style="color:#8b5cf6;margin-bottom:8px">Hola${displayName}</h1>
            <p style="color:#a1a1aa">Esta vez tu sugerencia no pudo ser, pero gracias por participar.</p>
            ${refunded ? `<p style="color:#22c55e;margin-top:16px">✅ Tu propina fue reembolsada. El dinero volverá a tu cuenta en los próximos días hábiles.</p>` : ""}
            <p style="color:#71717a;font-size:12px;margin-top:24px">Powered by <a href="https://tipy.uy" style="color:#7c3aed">tipy.uy</a></p>
          </div>
        `,
      })
    }
  } catch (err) {
    console.error("Email error:", err)
  }

  return NextResponse.json({ ok: true })
}
