"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Libro } from "@/lib/types"
import { Eye, Pencil, Trash2 } from "lucide-react"

interface LibrosTableProps {
  libros: Libro[]
  onView: (libro: Libro) => void
  onEdit: (libro: Libro) => void
  onDelete: (id: number) => void
}

export function LibrosTable({ libros, onView, onEdit, onDelete }: LibrosTableProps) {
  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
        <p className="text-lg font-medium text-muted-foreground">
          No se encontraron libros
        </p>
        <p className="text-sm text-muted-foreground">
          Agrega un nuevo libro para comenzar.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="w-24 text-center">Anio</TableHead>
            <TableHead className="w-20 text-center">Stock</TableHead>
            <TableHead className="w-32 text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {libros.map((libro) => (
            <TableRow key={libro.id}>
              <TableCell className="font-mono text-muted-foreground">
                {libro.id}
              </TableCell>
              <TableCell className="font-medium">{libro.titulo}</TableCell>
              <TableCell>{libro.autor}</TableCell>
              <TableCell>
                <Badge variant="secondary">{libro.categoria}</Badge>
              </TableCell>
              <TableCell className="text-center">
                {libro.anioPublicacion}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={libro.stock > 0 ? "default" : "destructive"}
                >
                  {libro.stock}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(libro)}
                    aria-label={`Ver detalles de ${libro.titulo}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(libro)}
                    aria-label={`Editar ${libro.titulo}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(libro.id)}
                    className="text-destructive hover:text-destructive"
                    aria-label={`Eliminar ${libro.titulo}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
