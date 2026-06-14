import { VibeSlider } from "@/components/client/VibeSlider"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function VibePage({ params }: Props) {
  const { qrSlug } = await params
  return <VibeSlider qrSlug={qrSlug} />
}
