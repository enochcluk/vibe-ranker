import { useMemo, useState } from "react"
import {
  buildWordPool,
  dealRound,
  scoreAdjective,
  scoreEighth,
  type Phase,
  type RoundDeal,
} from "@/lib/game"
import { SetupScreen } from "@/components/setup-screen"
import { GameHeader } from "@/components/game-header"
import { HandoffScreen } from "@/components/handoff-screen"
import { RankStage } from "@/components/rank-stage"
import { EighthStage } from "@/components/eighth-stage"
import { GuessStage } from "@/components/guess-stage"
import { RevealStage } from "@/components/reveal-stage"
import { GameOverScreen } from "@/components/gameover-screen"

interface Team {
  name: string
  score: number
}

export interface GuessSubmission {
  guessEighthPos: number
  guessAdjective: string
  eighthPoints: number
  adjectivePoints: number
}

type RoundGuesses = [GuessSubmission | null, GuessSubmission | null]

export default function App() {
  const poolSize = useMemo(() => buildWordPool().length, [])
  const [phase, setPhase] = useState<Phase>("setup")
  const [teams, setTeams] = useState<[Team, Team]>([
    { name: "Team Violet", score: 0 },
    { name: "Team Lime", score: 0 },
  ])
  const [totalRounds, setTotalRounds] = useState(6)
  const [turnIndex, setTurnIndex] = useState(0)
  const [deal, setDeal] = useState<RoundDeal | null>(null)
  const [rankOrder, setRankOrder] = useState<string[]>([])
  const [eighthOrder, setEighthOrder] = useState<string[]>([])
  const [guessOrder, setGuessOrder] = useState<string[]>([])
  const [guessAdjective, setGuessAdjective] = useState<string | null>(null)
  const [guessingTeam, setGuessingTeam] = useState<0 | 1>(0)
  const [roundGuesses, setRoundGuesses] = useState<RoundGuesses>([null, null])

  const round = turnIndex + 1
  const isLastRound = round >= totalRounds
  const completedGuesses: [GuessSubmission, GuessSubmission] | null =
    roundGuesses[0] && roundGuesses[1]
      ? [roundGuesses[0], roundGuesses[1]]
      : null

  function beginTurn() {
    const nextDeal = dealRound()
    setDeal(nextDeal)
    setRankOrder(nextDeal.words)
    setEighthOrder([])
    setGuessOrder([])
    setGuessAdjective(null)
    setGuessingTeam(0)
    setRoundGuesses([null, null])
    setPhase("handoff-rank")
  }

  function startGame(config: { teamNames: [string, string]; rounds: number }) {
    setTeams([
      { name: config.teamNames[0], score: 0 },
      { name: config.teamNames[1], score: 0 },
    ])
    setTotalRounds(config.rounds)
    setTurnIndex(0)
    beginTurn()
  }

  function confirmRanking() {
    if (!deal) return
    setEighthOrder([...rankOrder, deal.eighthWord])
    setPhase("eighth-place")
  }

  function confirmEighth() {
    if (!deal) return
    setGuessingTeam(0)
    setRoundGuesses([null, null])
    setGuessOrder([
      ...eighthOrder.filter((word) => word !== deal.eighthWord),
      deal.eighthWord,
    ])
    setGuessAdjective(null)
    setPhase("handoff-guess")
  }

  function confirmGuess() {
    if (!deal || !guessAdjective) return

    const trueEighthPos = eighthOrder.indexOf(deal.eighthWord)
    const guessEighthPos = guessOrder.indexOf(deal.eighthWord)
    const submission: GuessSubmission = {
      guessEighthPos,
      guessAdjective,
      eighthPoints: scoreEighth(trueEighthPos, guessEighthPos),
      adjectivePoints: scoreAdjective(deal.adjective, guessAdjective),
    }
    const points = submission.eighthPoints + submission.adjectivePoints

    setRoundGuesses((previous) => {
      const next = [...previous] as RoundGuesses
      next[guessingTeam] = submission
      return next
    })
    setTeams((previous) => {
      const next = [...previous] as [Team, Team]
      next[guessingTeam] = {
        ...next[guessingTeam],
        score: next[guessingTeam].score + points,
      }
      return next
    })

    if (guessingTeam === 0) {
      setGuessingTeam(1)
      setGuessOrder([
        ...eighthOrder.filter((word) => word !== deal.eighthWord),
        deal.eighthWord,
      ])
      setGuessAdjective(null)
      setPhase("handoff-guess")
    } else {
      setPhase("reveal")
    }
  }

  function continueFromReveal() {
    if (isLastRound) {
      setPhase("gameover")
      return
    }
    setTurnIndex((index) => index + 1)
    beginTurn()
  }

  if (phase === "setup") {
    return <SetupScreen onStart={startGame} poolSize={poolSize} />
  }

  if (phase === "gameover") {
    return <GameOverScreen teams={teams} onPlayAgain={() => setPhase("setup")} />
  }

  return (
    <main className="min-h-dvh">
      <GameHeader teams={teams} round={round} totalRounds={totalRounds} />

      {phase === "handoff-rank" && (
        <HandoffScreen
          teamName="Any player"
          title="Choose a representative"
          detail="Pick one person from either team to make the secret ranking. The representative can be from anywhere — the real challenge starts when both teams try to read their mind."
          buttonLabel="I'm the representative — show me"
          onContinue={() => setPhase("rank")}
        />
      )}

      {phase === "rank" && deal && (
        <RankStage
          teamName="Representative"
          adjective={deal.adjective}
          order={rankOrder}
          onReorder={setRankOrder}
          onConfirm={confirmRanking}
        />
      )}

      {phase === "eighth-place" && deal && (
        <EighthStage
          teamName="Representative"
          adjective={deal.adjective}
          eighthWord={deal.eighthWord}
          order={eighthOrder}
          onReorder={setEighthOrder}
          onConfirm={confirmEighth}
        />
      )}

      {phase === "handoff-guess" && (
        <HandoffScreen
          teamName={teams[guessingTeam].name}
          title={`${teams[guessingTeam].name}'s guess`}
          detail={`Pass the device to ${teams[guessingTeam].name}. The representative's ranking is locked, and the other team's answer is hidden. Work together to place the surprise 8th word and identify the secret adjective.`}
          buttonLabel={`${teams[guessingTeam].name} — show our puzzle`}
          onContinue={() => setPhase("guess")}
        />
      )}

      {phase === "guess" && deal && (
        <GuessStage
          teamName={teams[guessingTeam].name}
          eighthWord={deal.eighthWord}
          order={guessOrder}
          onReorder={setGuessOrder}
          adjectiveChoices={deal.adjectiveChoices}
          selectedAdjective={guessAdjective}
          onSelectAdjective={setGuessAdjective}
          onConfirm={confirmGuess}
        />
      )}

      {phase === "reveal" && deal && completedGuesses && (
        <RevealStage
          teams={teams}
          adjective={deal.adjective}
          trueOrder={eighthOrder}
          eighthWord={deal.eighthWord}
          trueEighthPos={eighthOrder.indexOf(deal.eighthWord)}
          guesses={completedGuesses}
          isLastRound={isLastRound}
          onContinue={continueFromReveal}
        />
      )}
    </main>
  )
}