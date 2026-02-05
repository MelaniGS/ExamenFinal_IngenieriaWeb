export interface Libro {
  id: number
  titulo: string
  autor: string
  categoria: string
  anioPublicacion: number
  stock: number
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type LibroInput = Omit<Libro, "id" | "createdAt" | "updatedAt">
