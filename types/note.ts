export type NoteType = 0 | 1 | 2

export interface Note {
  id: string
  title: string
  description: string
  type: NoteType
  content: any
}