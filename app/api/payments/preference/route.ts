import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { decryptToken } from "@/lib/mercadopago/client"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { z } from "zod"

const schema = z.object({
  suggestion_id: z.string().uuid(),
  amount: z.number().min(100).max(1000000),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const { suggestion_id, amount } = parsed.data
  const admin = await createAdminClient()

  // Get suggestion + DJ info
  const { data: suggestion } = await admin
    .from("suggestions")
    .select("id, dj_user_id, text, status")
    .eq("id", suggestion_id)
    .single()

  if (!suggestion || suggestion.status === "rejected") {
    return NextResponse.json({ error: "Sugerencia no válida" }, { status: 404 })
  }

  // Get DJ's MP credentials
  const { data: creds } = await admin
    .from("mp_credentials")
    .select("access_token_encrypted")
    .eq("user_id", suggestion.dj_user_id)
    .single()

  if (!creds) {
    return NextResponse.json(
      { error: "El DJ aún no configuró su cuenta de pagos" },
      { status: 422 }
    )
  }

  const accessToken = decryptToken(creds.access_token_encrypted)
  const mp = new MercadoPagoConfig({ accessToken })
  const preference = new Preference(mp)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tipy.uy"

  const prefData = await preference.create({
    body: {
      items: [
        {
          id: suggestion_id,
          title: `Propina para DJ — ${suggestion.text.slice(0, 60)}`,
          quantity: 1,
          unit_price: amount,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${appUrl}/q/tip/success`,
        failure: `${appUrl}/q/tip/failure`,
        pending: `${appUrl}/q/tip/pending`,
      },
      auto_return: "approved",
      notification_url: `${appUrl}/api/payments/webhook`,
      external_reference: suggestion_id,
      statement_descriptor: "TIPY DJ TIP",
    },
  })

  // Record pending transaction
  await admin.from("tip_transactions").insert({
    suggestion_id,
    dj_user_id: suggestion.dj_user_id,
    mp_payment_id: `pref_${prefData.id}`,
    mp_preference_id: prefData.id ?? "",
    amount,
    currency: "ARS",
    status: "pending",
  })

  return NextResponse.json({ init_point: prefData.init_point })
}
