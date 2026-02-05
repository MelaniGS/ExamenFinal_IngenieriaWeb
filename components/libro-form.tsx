"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Libro, LibroInput } from "@/lib/types"

interface LibroFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: LibroInput) => void
  libro?: Libro | null
  loading?: boolean
}

export function LibroForm({ open, onClose, onSubmit, libro, loading }: LibroFormProps) {
  const [formData, setFormData] = useState<LibroInput>({
    titulo: "",
    autor: "",
    categoria: "",
    anioPublicacion: new Date().getFullYear(),
    stock: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (libro) {
      setFormData({
        titulo: libro.titulo,
        autor: libro.autor,
        categoria: libro.categoria,
        anioPublicacion: libro.anioPublicacion,
        stock: libro.stock,
      })
    } else {
      setFormData({
        titulo: "",
        autor: "",
        categoria: "",
        anioPublicacion: new Date().getFullYear(),
        stock: 0,
      })
    }
    setErrors({})
  }, [libro, open])

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (!formData.titulo.trim()) newErrors.titulo = "El titulo es requerido"

    // Validacion Solo Letras
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/

    if (!formData.autor.trim()) {
      newErrors.autor = "El autor es requerido"
    } else if (!soloLetrasRegex.test(formData.autor)) {
      newErrors.autor = "El autor solo puede contener letras"
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = "La categoria es requerida"
    } else if (!soloLetrasRegex.test(formData.categoria)) {
      newErrors.categoria = "La categoria solo puede contener letras"
    }
    if (!formData.anioPublicacion) newErrors.anioPublicacion = "El anio es requerido"
    if (formData.stock < 0) newErrors.stock = "El stock no puede ser negativo"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {libro ? "Editar Libro" : "Nuevo Libro"}
          </DialogTitle>
          <DialogDescription>
            {libro
              ? "Modifica los campos del libro y guarda los cambios."
              : "Completa todos los campos para registrar un nuevo libro."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="titulo">Titulo</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              placeholder="Ej: Cien Anios de Soledad"
            />
            {errors.titulo && (
              <p className="text-sm text-destructive">{errors.titulo}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="autor">Autor</Label>
            <Input
              id="autor"
              value={formData.autor}
              onChange={(e) => {
                const value = e.target.value
                if (value === "" || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(value)) {
                  setFormData({ ...formData, autor: value })
                }
              }}
              placeholder="Ej: Gabriel Garcia Marquez"
            />
            {errors.autor && (
              <p className="text-sm text-destructive">{errors.autor}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Input
              id="categoria"
              value={formData.categoria}
              onChange={(e) => {
                const value = e.target.value
                if (value === "" || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(value)) {
                  setFormData({ ...formData, categoria: value })
                }
              }}
              placeholder="Ej: Novela, Ciencia, Ficcion"
            />
            {errors.categoria && (
              <p className="text-sm text-destructive">{errors.categoria}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="anioPublicacion">Anio de Publicacion</Label>
              <Input
                id="anioPublicacion"
                type="number"
                value={formData.anioPublicacion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    anioPublicacion: parseInt(e.target.value) || 0,
                  })
                }
              />
              {errors.anioPublicacion && (
                <p className="text-sm text-destructive">
                  {errors.anioPublicacion}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min={0}
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
              />
              {errors.stock && (
                <p className="text-sm text-destructive">{errors.stock}</p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : libro ? "Actualizar" : "Crear Libro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
