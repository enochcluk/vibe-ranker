import { ArrowRight, Check, Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Team {
  name: string
  score: number
}

interface GuessSubmission {
  guessEighthPos: number
  guessAdjective: string
  eighthPoints: number
  adjectivePoints: number
}

type RoundGuesses = [GuessSubmission, GuessSubmission]

export function RevealStage({
  teams,
  adjective,
  trueOrder,
  eighthWord,
  trueEighthPos,
  guesses,
  isLastRound,
  onContinue,
}: {
  teams: [Team, Team]
  adjective: string
  trueOrder: string[]
  eighthWord: string
  trueEighthPos: number
  guesses: RoundGuesses
  isLastRound: boolean
  onContinue: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-5">
      <div className="rounded-3xl border border-primary/40 bg-primary/10 p-6 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Both teams have guessed</p>
        <p className="mt-1 font-display text-3xl font-bold">Reveal the spectrum</p>
        <p className="mt-2 text-sm text-muted-foreground">See who got closer to the representative&apos;s logic.</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {teams.map((team, index) => {
          const guess = guesses[index]
          const total = guess.eighthPoints + guess.adjectivePoints
          const distance = Math.abs(trueEighthPos - guess.guessEighthPos)
          const adjectiveRight = guess.adjectivePoints > 0
          return (
            <div key={team.name} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="truncate font-display text-lg font-bold">{team.name}</span>
                <span className="rounded-full bg-primary/15 px-2.5 py-1 font-display text-lg font-bold text-primary">+{total}</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="font-semibold text-foreground">8th word:</span> slot {guess.guessEighthPos + 1} <span className="text-xs">({guess.eighthPoints} pts{distance === 0 ? ", exact" : `, off by ${distance}`})</span></p>
                <p><span className="font-semibold text-foreground">Adjective:</span> {guess.guessAdjective} <span className="ml-1 inline-flex align-middle">{adjectiveRight ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-muted-foreground" />}</span></p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <h3 className="mb-1 font-display text-lg font-bold">The representative&apos;s true ranking</h3>
        <p className="mb-3 text-sm text-muted-foreground">most <span className="lowercase text-foreground">{adjective}</span> → least <span className="lowercase text-foreground">{adjective}</span></p>
        <ol className="flex flex-col gap-2">
          {trueOrder.map((word, index) => {
            const isEighth = word === eighthWord
            const guessers = teams
              .map((team, teamIndex) => guesses[teamIndex].guessEighthPos === index ? team.name : null)
              .filter((name): name is string => Boolean(name))
            return (
              <li key={word} className={cn("flex items-center gap-3 rounded-2xl border px-3 py-3 sm:px-4", isEighth ? "border-primary/70 bg-primary/10" : "border-border bg-card")}>
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold tabular-nums", isEighth ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>{index + 1}</span>
                <span className="flex-1 text-pretty font-medium leading-snug">{word}{isEighth && <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 align-middle text-[11px] font-semibold text-primary">8th word</span>}</span>
                {guessers.length > 0 && <span className="shrink-0 rounded-full border border-accent/50 px-2 py-0.5 text-[11px] font-semibold text-accent">{guessers.join(" + ")} guessed here</span>}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-4 text-center">
        <p className="text-sm font-medium">Representative: explain your interpretation of <span className="lowercase text-primary">{adjective}</span> out loud.</p>
        <p className="mt-1 text-xs text-muted-foreground">Defend the most unhinged placement on the board.</p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <Button onClick={onContinue} className="h-13 w-full rounded-2xl py-3.5 text-base font-bold">
            {isLastRound ? <>See final results<Trophy className="ml-1 h-5 w-5" /></> : <>Next round<ArrowRight className="ml-1 h-5 w-5" /></>}
          </Button>
        </div>
      </div>
    </div>
  )
}