import { ADJECTIVES, PARTICIPANTS, WORDS } from "./word-bank"

export const WORDS_PER_ROUND = 7
export const ADJECTIVE_CHOICES = 5
const EIGHTH_WORD_POINTS = [5, 3, 1]
export const ADJECTIVE_POINTS = 5

export type Phase =
  | "setup"
  | "handoff-rank"
  | "rank"
  | "eighth-place"
  | "handoff-guess"
  | "guess"
  | "reveal"
  | "gameover"

export interface RoundDeal {
  words: string[]
  eighthWord: string
  adjective: string
  adjectiveChoices: string[]
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

function sampleUnique<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count)
}

export function buildWordPool(): string[] {
  return [...WORDS, ...PARTICIPANTS]
}

export function dealRound(): RoundDeal {
  const picks = sampleUnique(buildWordPool(), WORDS_PER_ROUND + 1)
  const adjectivePicks = sampleUnique(ADJECTIVES, ADJECTIVE_CHOICES)
  return {
    words: picks.slice(0, WORDS_PER_ROUND),
    eighthWord: picks[WORDS_PER_ROUND],
    adjective: adjectivePicks[0],
    adjectiveChoices: shuffle(adjectivePicks),
  }
}

export function scoreEighth(truePosition: number, guessPosition: number): number {
  return EIGHTH_WORD_POINTS[Math.abs(truePosition - guessPosition)] ?? 0
}

export function scoreAdjective(truth: string, guess: string): number {
  return truth === guess ? ADJECTIVE_POINTS : 0
}