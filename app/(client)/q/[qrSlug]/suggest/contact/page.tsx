import { Suspense } from "react"
import { ContactForm } from "@/components/client/ContactForm"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function ContactPage({ params }: Props) {
  const { qrSlug } = await params
  return (
    <Suspense>
      <ContactForm qrSlug={qrSlug} />
    </Suspense>
  )
}
