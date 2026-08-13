import { ArrowRight, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HandoffScreen({
  teamName,
  title,
  detail,
  buttonLabel,
  onContinue,
}: {
  teamName: string
  title: string
  detail: string
  buttonLabel: string
  onContinue: () => void
}) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-49px)] max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card"><EyeOff className="h-7 w-7 text-primary" /></div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-balance">{teamName}</h2>
      </div>
      <p className="text-pretty leading-relaxed text-muted-foreground">{detail}</p>
      <Button onClick={onContinue} className="h-14 w-full rounded-2xl text-lg font-bold">{buttonLabel}<ArrowRight className="ml-1 h-5 w-5" /></Button>
    </div>
  )
}