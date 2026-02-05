"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Layers, Package, Calendar } from "lucide-react"

interface StatsData {
  totalLibros: number
  totalStock: number
  promedioPublicacion: number
  categorias: number
}

export function StatsCards({ stats }: { stats: StatsData }) {
  const cards = [
    {
      title: "Total Libros",
      value: stats.totalLibros,
      icon: BookOpen,
      description: "Libros registrados",
    },
    {
      title: "Stock Total",
      value: stats.totalStock,
      icon: Package,
      description: "Unidades disponibles",
    },
    {
      title: "Promedio Publicacion",
      value: stats.promedioPublicacion,
      icon: Calendar,
      description: "Anio promedio",
    },
    {
      title: "Categorias",
      value: stats.categorias,
      icon: Layers,
      description: "Categorias unicas",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
