import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RankBoard } from "@/components/rank-board"

export function EighthStage({
  teamName,
  adjective,
  eighthWord,
  order,
  onReorder,
  onConfirm,
}: {
  teamName: string
  adjective: string
  eighthWord: string
  order: string[]
  onReorder: (next: string[]) => void
  onConfirm: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-5">
      <div className="mb-5 rounded-3xl border border-border bg-card p-5 text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"><Sparkles className="h-3.5 w-3.5" />Surprise 8th word</div>
        <p className="font-display text-3xl font-bold text-balance sm:text-4xl">{eighthWord}</p>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">Drag <span className="font-semibold text-foreground">{eighthWord}</span> into the slot where it belongs on the &quot;{adjective}&quot; spectrum. Both teams will try to guess where you put it — so no hints.</p>
      </div>
      <RankBoard items={order} onReorder={onReorder} lowLabel={`least ${adjective}`} highLabel={`most ${adjective}`} movableId={eighthWord} highlightId={eighthWord} />
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-4 py-3 backdrop-blur"><div className="mx-auto max-w-2xl"><Button onClick={onConfirm} className="h-13 w-full rounded-2xl py-3.5 text-base font-bold">Lock in the 8th word<ArrowRight className="ml-1 h-5 w-5" /></Button></div></div>
    </div>
  )
}