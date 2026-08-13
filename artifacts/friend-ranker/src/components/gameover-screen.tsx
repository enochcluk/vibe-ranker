import { Crown, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Team {
  name: string
  score: number
}

export function GameOverScreen({ teams, onPlayAgain }: { teams: [Team, Team]; onPlayAgain: () => void }) {
  const tie = teams[0].score === teams[1].score
  const winnerIndex = teams[0].score >= teams[1].score ? 0 : 1
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <div><div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15"><Crown className="h-8 w-8 text-primary" /></div><h1 className="font-display text-4xl font-bold text-balance">{tie ? "It's a tie!" : `${teams[winnerIndex].name} wins!`}</h1><p className="mt-2 text-muted-foreground">{tie ? "Perfectly matched minds. Or perfectly confused." : "Masters of the bizarre semantic axis."}</p></div>
      <div className="w-full space-y-3">{teams.map((team, index) => { const isWinner = !tie && index === winnerIndex; return <div key={team.name} className={cn("flex items-center gap-3 rounded-2xl border px-4 py-4", isWinner ? "border-primary/60 bg-primary/10" : "border-border bg-card")}><span className="h-4 w-4 shrink-0 rounded-full" style={{ background: index === 0 ? "var(--color-chart-4)" : "var(--color-chart-5)" }} aria-hidden="true" /><span className="flex-1 text-left font-medium">{team.name}</span>{isWinner && <Crown className="h-4 w-4 text-primary" />}<span className="font-display text-2xl font-bold tabular-nums">{team.score}</span></div> })}</div>
      <Button onClick={onPlayAgain} className="h-14 w-full rounded-2xl text-lg font-bold"><Shuffle className="mr-1 h-5 w-5" />Play again</Button>
    </div>
  )
}