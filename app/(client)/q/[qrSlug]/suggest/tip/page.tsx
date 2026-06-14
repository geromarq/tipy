import { Suspense } from "react"
import { TipScreen } from "@/components/client/TipScreen"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function TipPage({ params }: Props) {
  const { qrSlug } = await params
  return (
    <Suspense>
      <TipScreen qrSlug={qrSlug} />
    </Suspense>
  )
}
