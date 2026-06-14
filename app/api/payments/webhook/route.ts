import { NextResponse, type NextRequest } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { decryptToken } from "@/lib/mercadopago/client"
import { MercadoPagoConfig, Payment } from "mercadopago"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  // Respond immediately to prevent MP retries
  const body = await req.json()

  // Signature verification
  const signature = req.headers.get("x-signature") ?? ""
  const requestId = req.headers.get("x-request-id") ?? ""
  const dataId = body.data?.id?.toString() ?? ""

  if (process.env.MP_WEBHOOK_SECRET && signature) {
    const manifest = `id:${dataId};request-id:${requestId};`
    const parts = signature.split(",")
    const v1Part = parts.find((p: string) => p.startsWith("v1="))
    const tsPart = parts.find((p: string) => p.startsWith("ts="))

    if (v1Part && tsPart) {
      const ts = tsPart.slice(3)
      const expectedManifest = `${ts}${manifest}`
      const hmac = crypto
        .createHmac("sha256", process.env.MP_WEBHOOK_SECRET)
        .update(expectedManifest)
        .digest("hex")

      if (hmac !== v1Part.slice(3)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }
  }

  if (body.type !== "payment" || !dataId) {
    return NextResponse.json({ ok: true })
  }

  // Process async
  processPayment(dataId).catch(console.error)

  return NextResponse.json({ ok: true })
}

async function processPayment(paymentId: string) {
  const admin = await createAdminClient()

  // Find transaction by payment ID or preference (MP sends payment ID on approved)
  const { data: tx } = await admin
    .from("tip_transactions")
    .select("id, suggestion_id, dj_user_id, amount, status")
    .or(`mp_payment_id.eq.${paymentId},mp_preference_id.eq.pref_${paymentId}`)
    .single()

  if (!tx) return

  // Get DJ credentials to query MP
  const { data: creds } = await admin
    .from("mp_credentials")
    .select("access_token_encrypted")
    .eq("user_id", tx.dj_user_id)
    .single()

  if (!creds) return

  const accessToken = decryptToken(creds.access_token_encrypted)
  const mp = new MercadoPagoConfig({ accessToken })
  const paymentClient = new Payment(mp)

  const paymentData = await paymentClient.get({ id: Number(paymentId) })
  const status = paymentData.status

  let newStatus: "approved" | "rejected" | "refunded" | "pending" = "pending"
  if (status === "approved") newStatus = "approved"
  else if (status === "rejected" || status === "cancelled") newStatus = "rejected"

  await admin.from("tip_transactions").update({
    mp_payment_id: paymentId,
    status: newStatus,
    payer_email: paymentData.payer?.email ?? null,
    updated_at: new Date().toISOString(),
  }).eq("id", tx.id)

  if (newStatus === "approved" && tx.suggestion_id) {
    // Update tip pool on suggestion
    const { data: currentSuggestion } = await admin
      .from("suggestions")
      .select("tip_pool")
      .eq("id", tx.suggestion_id)
      .single()

    if (currentSuggestion) {
      await admin.from("suggestions").update({
        tip_pool: (currentSuggestion.tip_pool ?? 0) + tx.amount,
        tip_amount: (currentSuggestion.tip_pool ?? 0) + tx.amount,
      }).eq("id", tx.suggestion_id)
    }
  }
}
