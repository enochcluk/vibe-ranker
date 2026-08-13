import { useState } from "react"
import { Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SetupScreen({
  onStart,
  poolSize,
}: {
  onStart: (config: { teamNames: [string, string]; rounds: number }) => void
  poolSize: number
}) {
  const [teamA, setTeamA] = useState("")
  const [teamB, setTeamB] = useState("")
  const [rounds, setRounds] = useState(6)
  const roundOptions = [4, 6, 8, 10]

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-8 px-5 py-10">
      <header className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />{poolSize} words in the bank
        </div>
        <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-balance sm:text-6xl">
          Friend <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--spectrum)" }}>Ranker</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          One representative secretly ranks 7 words. Both teams reverse-engineer the logic — then guess the surprise 8th word and hidden adjective.
        </p>
      </header>

      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-primary" />Name your two teams</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <TeamInput label="Team 1" value={teamA} onChange={setTeamA} placeholder="Team Violet" accent="var(--color-chart-4)" />
          <TeamInput label="Team 2" value={teamB} onChange={setTeamB} placeholder="Team Lime" accent="var(--color-chart-5)" />
        </div>
        <div className="mt-6">
          <div className="mb-2 text-sm font-semibold">How many rounds?</div>
          <div className="grid grid-cols-4 gap-2">
            {roundOptions.map((roundCount) => (
              <button key={roundCount} type="button" onClick={() => setRounds(roundCount)} className={cn(
                "rounded-xl border py-3 font-display text-lg font-bold transition-colors",
                rounds === roundCount ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-secondary-foreground hover:border-primary/50",
              )}>{roundCount}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Both teams submit a guess every round.</p>
        </div>
      </div>

      <Button onClick={() => onStart({ teamNames: [teamA.trim() || "Team Violet", teamB.trim() || "Team Lime"], rounds })} className="h-14 rounded-2xl text-lg font-bold">Start the game</Button>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">Each round, one representative ranks for everyone, then both teams get their own private guess.</p>
    </div>
  )
}

function TeamInput({
  label,
  value,
  onChange,
  placeholder,
  accent,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  accent: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} aria-hidden="true" />{label}
      </span>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={24} className="w-full rounded-xl border border-input bg-background px-3 py-3 text-base font-medium outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30" />
    </label>
  )
}