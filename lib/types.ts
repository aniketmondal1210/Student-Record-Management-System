export interface Student {
  id: string
  name: string
  rollNumber: number
  marks: number
  course: string
}

export interface Node<T> {
  data: T
  prev: Node<T> | null
  next: Node<T> | null
}
