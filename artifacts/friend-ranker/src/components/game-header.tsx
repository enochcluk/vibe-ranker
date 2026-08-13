import { cn } from "@/lib/utils"

interface Team {
  name: string
  score: number
}

export function GameHeader({
  teams,
  round,
  totalRounds,
  activeTeam,
}: {
  teams: [Team, Team]
  round: number
  totalRounds: number
  activeTeam?: 0 | 1
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-2.5">
        <TeamScore team={teams[0]} color="var(--color-chart-4)" active={activeTeam === 0} />
        <div className="flex flex-col items-center px-1">
          <span className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">Round</span>
          <span className="font-display text-base font-bold tabular-nums leading-none">
            {round}<span className="text-muted-foreground">/{totalRounds}</span>
          </span>
        </div>
        <TeamScore team={teams[1]} color="var(--color-chart-5)" active={activeTeam === 1} alignEnd />
      </div>
    </header>
  )
}

function TeamScore({
  team,
  color,
  active,
  alignEnd,
}: {
  team: Team
  color: string
  active: boolean
  alignEnd?: boolean
}) {
  return (
    <div className={cn(
      "flex flex-1 items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-colors",
      alignEnd && "flex-row-reverse text-right",
      active ? "border-primary/60 bg-primary/10" : "border-transparent",
    )}>
      <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
      <div className={cn("min-w-0", alignEnd && "flex flex-col items-end")}>
        <div className="truncate text-xs font-medium text-muted-foreground">{team.name}</div>
        <div className="font-display text-xl font-bold leading-none tabular-nums">{team.score}</div>
      </div>
    </div>
  )
}