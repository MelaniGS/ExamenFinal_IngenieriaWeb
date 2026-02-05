import { NextResponse } from "next/server"
import { promedioAñoPublicacion, obtenerLibros } from "@/lib/data-store"

// GET /api/libros/promedio-publicacion - Promedio del año de publicación
export async function GET() {
  try {
    const promedio = await promedioAñoPublicacion()
    const totalLibros = (await obtenerLibros()).length

    return NextResponse.json({
      success: true,
      data: {
        promedioAnioPublicacion: promedio,
        totalLibrosConsiderados: totalLibros,
      },
      message: `El promedio del año de publicación es ${promedio}`,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al calcular el promedio" },
      { status: 500 }
    )
  }
}
