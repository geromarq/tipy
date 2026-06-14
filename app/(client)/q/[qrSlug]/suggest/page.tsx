import { SuggestionForm } from "@/components/client/SuggestionForm"

interface Props {
  params: Promise<{ qrSlug: string }>
}

export default async function SuggestPage({ params }: Props) {
  const { qrSlug } = await params
  return <SuggestionForm qrSlug={qrSlug} />
}
