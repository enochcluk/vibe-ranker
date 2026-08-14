import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RankBoard } from "@/components/rank-board"

export function RankStage({
  teamName,
  adjective,
  order,
  onReorder,
  onConfirm,
}: {
  teamName: string
  adjective: string
  order: string[]
  onReorder: (next: string[]) => void
  onConfirm: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-5">
      <div className="mb-5 rounded-3xl border border-border bg-card p-5 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{teamName}'s secret axis is</p>
        <p className="mt-1 font-display text-4xl font-bold lowercase tracking-tight" style={{ backgroundImage: "var(--spectrum)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{adjective}</p>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">Agree on what &quot;{adjective}&quot; means to you, then drag the words from <span className="text-foreground">most {adjective}</span> (top) to <span className="text-foreground">least {adjective}</span> (bottom). Keep your reasoning secret.</p>
      </div>
      <RankBoard items={order} onReorder={onReorder} topLabel={`most ${adjective}`} bottomLabel={`least ${adjective}`} />
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-4 py-3 backdrop-blur"><div className="mx-auto max-w-2xl"><Button onClick={onConfirm} className="h-13 w-full rounded-2xl py-3.5 text-base font-bold">Lock in this ranking<ArrowRight className="ml-1 h-5 w-5" /></Button></div></div>
    </div>
  )
}