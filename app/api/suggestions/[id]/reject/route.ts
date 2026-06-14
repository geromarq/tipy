import { NextResponse } from "next/server"
import { createAdminClient, createClient } from "@/lib/supabase/server"
import { decryptToken } from "@/lib/mercadopago/client"

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const admin = await createAdminClient()

  const { data: suggestion } = await admin
    .from("suggestions")
    .select("id, dj_user_id, status, tip_pool, contact_email, contact_phone, contact_name")
    .eq("id", id)
    .single()

  if (!suggestion || suggestion.dj_user_id !== user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  }

  if (suggestion.status !== "pending") {
    return NextResponse.json({ error: "Ya procesada" }, { status: 409 })
  }

  // Update status
  await admin
    .from("suggestions")
    .update({ status: "rejected", updated_at: new Date().toISOString() })
    .eq("id", id)

  // Refund any approved tips
  if (suggestion.tip_pool > 0) {
    const { data: transactions } = await admin
      .from("tip_transactions")
      .select("id, mp_payment_id, amount")
      .eq("suggestion_id", id)
      .eq("status", "approved")

    if (transactions && transactions.length > 0) {
      // Get DJ's MP credentials for refund
      const { data: creds } = await admin
        .from("mp_credentials")
        .select("access_token_encrypted")
        .eq("user_id", user.id)
        .single()

      if (creds) {
        const accessToken = decryptToken(creds.access_token_encrypted)

        for (const tx of transactions) {
          try {
            const refundRes = await fetch(
              `https://api.mercadopago.com/v1/payments/${tx.mp_payment_id}/refunds`,
              {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
                body: "{}",
              }
            )
            const refundData = await refundRes.json()

            if (refundData.id) {
              await admin
                .from("tip_transactions")
                .update({ status: "refunded", refund_id: refundData.id.toString() })
                .eq("id", tx.id)
            }
          } catch {}
        }
      }
    }
  }

  // Notify client if contact info available
  if (suggestion.contact_email || suggestion.contact_phone) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "",
        },
        body: JSON.stringify({
          type: "suggestion_rejected",
          to_email: suggestion.contact_email,
          to_phone: suggestion.contact_phone,
          name: suggestion.contact_name,
          refunded: suggestion.tip_pool > 0,
        }),
      })
    } catch {}
  }

  return NextResponse.json({ success: true })
}
