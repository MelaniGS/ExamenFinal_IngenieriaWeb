import { NextResponse } from "next/server"
import { obtenerEstadisticas, obtenerCategorias } from "@/lib/data-store"

// GET /api/libros/estadisticas - Estadísticas generales
export async function GET() {
  try {
    const stats = await obtenerEstadisticas()

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al obtener estadísticas" },
      { status: 500 }
    )
  }
}
