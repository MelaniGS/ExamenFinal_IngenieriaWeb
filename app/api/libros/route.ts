import { NextResponse } from "next/server"
import { obtenerLibros, crearLibro } from "@/lib/data-store"
import type { LibroInput } from "@/lib/types"

// GET /api/libros - Obtener todos los libros
// GET /api/libros?categoria=Novela - Filtrar por categoría
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get("categoria") || undefined

    const libros = await obtenerLibros(categoria)

    return NextResponse.json({
      success: true,
      data: libros,
      total: libros.length,
      ...(categoria && { filtro: { categoria } }),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener los libros" },
      { status: 500 }
    )
  }
}

// POST /api/libros - Crear un nuevo libro
export async function POST(request: Request) {
  try {
    const body: LibroInput = await request.json()

    // Validación de campos requeridos
    if (!body.titulo || !body.autor || !body.categoria || !body.anioPublicacion || body.stock === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos son requeridos: titulo, autor, categoria, anioPublicacion, stock",
        },
        { status: 400 }
      )
    }

    // Validación de tipos
    if (typeof body.anioPublicacion !== "number" || typeof body.stock !== "number") {
      return NextResponse.json(
        { success: false, error: "anioPublicacion y stock deben ser números" },
        { status: 400 }
      )
    }

    if (body.stock < 0) {
      return NextResponse.json(
        { success: false, error: "El stock no puede ser negativo" },
        { status: 400 }
      )
    }

    const nuevoLibro = await crearLibro(body)

    return NextResponse.json(
      { success: true, data: nuevoLibro, message: "Libro creado exitosamente" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al crear el libro" },
      { status: 500 }
    )
  }
}
