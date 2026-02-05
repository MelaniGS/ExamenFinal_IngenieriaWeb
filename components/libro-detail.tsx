"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Libro } from "@/lib/types"
import { BookOpen, User, Layers, Calendar, Package } from "lucide-react"

interface LibroDetailProps {
  open: boolean
  onClose: () => void
  libro: Libro | null
}

export function LibroDetail({ open, onClose, libro }: LibroDetailProps) {
  if (!libro) return null

  const fields = [
    { label: "ID", value: `#${libro.id}`, icon: BookOpen },
    { label: "Titulo", value: libro.titulo, icon: BookOpen },
    { label: "Autor", value: libro.autor, icon: User },
    { label: "Categoria", value: libro.categoria, icon: Layers },
    { label: "Anio de Publicacion", value: libro.anioPublicacion, icon: Calendar },
    { label: "Stock", value: `${libro.stock} unidades`, icon: Package },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Detalle del Libro
          </DialogTitle>
          <DialogDescription>
            Informacion completa del libro seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {fields.map((field) => (
            <div key={field.label} className="flex items-start gap-3">
              <field.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </span>
                {field.label === "Categoria" ? (
                  <Badge variant="secondary">{field.value}</Badge>
                ) : (
                  <span className="text-sm font-medium">{field.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
