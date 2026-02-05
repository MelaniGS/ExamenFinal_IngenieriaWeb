import { db } from "./db"
import { libros } from "./db/schema"
import { eq, like, sql, avg } from "drizzle-orm"
import type { Libro, LibroInput } from "./db/schema"

// ---------- CRUD Operations ----------

// GET ALL - Obtener todos los libros (con filtro opcional por categoría)
export async function obtenerLibros(categoria?: string): Promise<Libro[]> {
  if (categoria) {
    return await db.query.libros.findMany({
      where: eq(libros.categoria, categoria),
    })
  }
  return await db.query.libros.findMany()
}

// GET BY ID - Obtener un libro por su ID
export async function obtenerLibroPorId(id: number): Promise<Libro | undefined> {
  const result = await db.query.libros.findFirst({
    where: eq(libros.id, id),
  })
  return result
}

// POST - Crear un nuevo libro
export async function crearLibro(input: LibroInput): Promise<Libro> {
  const [nuevoLibro] = await db.insert(libros).values(input).returning()
  return nuevoLibro
}

// PUT - Actualizar un libro existente
export async function actualizarLibro(id: number, input: LibroInput): Promise<Libro | null> {
  const [libroActualizado] = await db
    .update(libros)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(libros.id, id))
    .returning()

  return libroActualizado || null
}

// DELETE - Eliminar un libro por su ID
export async function eliminarLibro(id: number): Promise<boolean> {
  const result = await db.delete(libros).where(eq(libros.id, id)).returning()
  return result.length > 0
}

// ---------- Funciones Adicionales ----------

// Promedio del año de publicación (Cálculo adicional requerido)
export async function promedioAñoPublicacion(): Promise<number> {
  const result = await db.select({ value: avg(libros.anioPublicacion) }).from(libros)
  return Math.round(Number(result[0].value) || 0)
}

// Obtener todas las categorías únicas
export async function obtenerCategorias(): Promise<string[]> {
  const result = await db.select({ categoria: libros.categoria }).from(libros).groupBy(libros.categoria)
  return result.map((r) => r.categoria).sort()
}

// Estadísticas generales (Endpoint adicional)
export async function obtenerEstadisticas() {
  const total = await db.select({ count: sql<number>`count(*)` }).from(libros)
  const totalStock = await db.select({ sum: sql<number>`sum(${libros.stock})` }).from(libros)
  const promedio = await promedioAñoPublicacion()
  const cats = await obtenerCategorias()

  return {
    totalLibros: Number(total[0].count),
    totalStock: Number(totalStock[0].sum || 0),
    promedioPublicacion: promedio,
    categorias: cats.length,
    listaCategorias: cats
  }
}
