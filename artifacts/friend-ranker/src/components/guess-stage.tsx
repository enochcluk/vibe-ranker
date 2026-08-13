import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RankBoard } from "@/components/rank-board"
import { cn } from "@/lib/utils"

export function GuessStage({
  teamName,
  eighthWord,
  order,
  onReorder,
  adjectiveChoices,
  selectedAdjective,
  onSelectAdjective,
  onConfirm,
}: {
  teamName: string
  eighthWord: string
  order: string[]
  onReorder: (next: string[]) => void
  adjectiveChoices: string[]
  selectedAdjective: string | null
  onSelectAdjective: (adjective: string) => void
  onConfirm: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-5">
      <div className="mb-5 rounded-3xl border border-border bg-card p-5">
        <h2 className="font-display text-2xl font-bold text-balance">{teamName}, read your representative&apos;s mind</h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">This is your team&apos;s locked ranking. Work together to figure out the hidden logic, then do two things:</p>
        <ol className="mt-3 space-y-1.5 text-sm">
          <li className="flex gap-2"><span className="font-display font-bold text-primary">1.</span>Drag <span className="font-semibold text-foreground">{eighthWord}</span> into the slot where your representative placed it.</li>
          <li className="flex gap-2"><span className="font-display font-bold text-primary">2.</span>Pick which adjective your representative used as the secret axis.</li>
        </ol>
      </div>
      <RankBoard items={order} onReorder={onReorder} lowLabel="least" highLabel="most" movableId={eighthWord} highlightId={eighthWord} />
      <div className="mt-8">
        <h3 className="mb-3 font-display text-lg font-bold">Which adjective was it?</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {adjectiveChoices.map((adjective) => {
            const selected = selectedAdjective === adjective
            return <button key={adjective} type="button" onClick={() => onSelectAdjective(adjective)} className={cn("rounded-2xl border px-3 py-3.5 text-center font-display text-base font-bold lowercase transition-colors", selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/50")} aria-pressed={selected}>{adjective}</button>
          })}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-4 py-3 backdrop-blur"><div className="mx-auto max-w-2xl"><Button onClick={onConfirm} disabled={!selectedAdjective} className="h-13 w-full rounded-2xl py-3.5 text-base font-bold">{selectedAdjective ? "Reveal the answer" : "Pick an adjective first"}<ArrowRight className="ml-1 h-5 w-5" /></Button></div></div>
    </div>
  )
}