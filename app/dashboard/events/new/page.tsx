import { CreateEventForm } from "@/components/dashboard/CreateEventForm"

export default function NewEventPage() {
  return (
    <div className="lg:pt-0 pt-16 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary">Nuevo evento</h1>
        <p className="text-text-muted text-sm mt-1">Completá los datos y generá tu QR</p>
      </div>
      <CreateEventForm />
    </div>
  )
}
