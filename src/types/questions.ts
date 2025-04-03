export interface Question {
  id: number
  mainText: string
  additionalText?: string
  topics: string[]
  used: boolean
  reused: boolean
  mechanics: string[]
  quizzes?: string[]
}
