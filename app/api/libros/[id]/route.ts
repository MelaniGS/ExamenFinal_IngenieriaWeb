import { NextResponse } from "next/server"
import { obtenerLibroPorId, actualizarLibro, eliminarLibro } from "@/lib/data-store"
import type { LibroInput } from "@/lib/types"

// GET /api/libros/:id - Obtener un libro por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const libro = await obtenerLibroPorId(Number(id))

    if (!libro) {
      return NextResponse.json(
        { success: false, error: `Libro con id ${id} no encontrado` },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: libro })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener el libro" },
      { status: 500 }
    )
  }
}

// PUT /api/libros/:id - Actualizar un libro
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: LibroInput = await request.json()

    // Validación
    if (!body.titulo || !body.autor || !body.categoria || !body.anioPublicacion || body.stock === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos son requeridos: titulo, autor, categoria, anioPublicacion, stock",
        },
        { status: 400 }
      )
    }

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

    const libroActualizado = await actualizarLibro(Number(id), body)

    if (!libroActualizado) {
      return NextResponse.json(
        { success: false, error: `Libro con id ${id} no encontrado` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: libroActualizado,
      message: "Libro actualizado exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al actualizar el libro" },
      { status: 500 }
    )
  }
}

// DELETE /api/libros/:id - Eliminar un libro
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eliminado = await eliminarLibro(Number(id))

    if (!eliminado) {
      return NextResponse.json(
        { success: false, error: `Libro con id ${id} no encontrado` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Libro con id ${id} eliminado exitosamente`,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al eliminar el libro" },
      { status: 500 }
    )
  }
}
