"use client"

import { useState, useCallback } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatsCards } from "@/components/stats-cards"
import { LibrosTable } from "@/components/libros-table"
import { LibroForm } from "@/components/libro-form"
import { LibroDetail } from "@/components/libro-detail"
import { DeleteConfirm } from "@/components/delete-confirm"
import type { Libro, LibroInput } from "@/lib/types"
import { Plus, Search, BookOpen, Heart } from "lucide-react"
import {
  fetcher,
  createLibro,
  updateLibro,
  deleteLibro,
  getLibroById
} from "@/lib/api-service"

export default function Page() {
  // State
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("")
  const [busqueda, setBusqueda] = useState("")
  const [searchId, setSearchId] = useState("")
  const [searchingId, setSearchingId] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Libro | null>(null)
  const [saving, setSaving] = useState(false)

  // Data fetching with SWR
  const apiUrl = categoriaFiltro
    ? `/api/libros?categoria=${encodeURIComponent(categoriaFiltro)}`
    : "/api/libros"

  const { data: librosData, mutate: mutateLibros } = useSWR(apiUrl, fetcher)
  const { data: statsData, mutate: mutateStats } = useSWR(
    "/api/libros/estadisticas",
    fetcher
  )

  const libros: Libro[] = librosData?.data || []
  const stats = statsData?.data || {
    totalLibros: 0,
    totalStock: 0,
    promedioPublicacion: 0,
    categorias: 0,
  }
  const categorias: string[] = statsData?.data?.listaCategorias || []

  // Filter by search
  const librosFiltrados = busqueda
    ? libros.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.toLowerCase())
    )
    : libros

  // Refresh all data
  const refreshAll = useCallback(() => {
    mutateLibros()
    mutateStats()
  }, [mutateLibros, mutateStats])

  // CRUD Handlers
  async function handleCreate(data: LibroInput) {
    setSaving(true)
    try {
      const result = await createLibro(data)
      if (result.success) {
        setFormOpen(false)
        setSelectedLibro(null)
        refreshAll()
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(data: LibroInput) {
    if (!selectedLibro) return
    setSaving(true)
    try {
      const result = await updateLibro(selectedLibro.id, data)
      if (result.success) {
        setFormOpen(false)
        setSelectedLibro(null)
        refreshAll()
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      const result = await deleteLibro(deleteTarget.id)
      if (result.success) {
        setDeleteOpen(false)
        setDeleteTarget(null)
        refreshAll()
      }
    } catch {
      // Error handling silenciado
    }
  }

  // UI action handlers
  async function handleIdSearch() {
    if (!searchId) return
    setSearchingId(true)
    try {
      const result = await getLibroById(searchId)
      if (result.success && result.data) {
        setSelectedLibro(result.data)
        setDetailOpen(true)
        setSearchId("")
      } else {
        alert("Libro no encontrado")
      }
    } catch (error) {
      alert("Error al buscar el libro")
    } finally {
      setSearchingId(false)
    }
  }

  function openCreate() {
    setSelectedLibro(null)
    setFormOpen(true)
  }

  function openEdit(libro: Libro) {
    setSelectedLibro(libro)
    setFormOpen(true)
  }

  function openDetail(libro: Libro) {
    setSelectedLibro(libro)
    setDetailOpen(true)
  }

  function openDelete(id: number) {
    const libro = libros.find((l) => l.id === id)
    if (libro) {
      setDeleteTarget(libro)
      setDeleteOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Sistema de Gestion de Libros
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              API: ONLINE
            </div>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Nuevo Libro
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <StatsCards stats={stats} />

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-6">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por titulo o autor..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Buscar por Id"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-32"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIdSearch}
                  disabled={searchingId}
                  title="Buscar por ID"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Select
                value={categoriaFiltro}
                onValueChange={(val) =>
                  setCategoriaFiltro(val === "todas" ? "" : val)
                }
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Todas las categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorias</SelectItem>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground">
              {librosFiltrados.length} libro(s) encontrado(s)
            </p>
          </div>

          {/* Table */}
          <LibrosTable
            libros={librosFiltrados}
            onView={openDetail}
            onEdit={openEdit}
            onDelete={openDelete}
          />

          {/* Footer */}
          <footer className="border-t pt-4 text-center text-xs text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              Desarrollado con <Heart className="h-3 w-3 text-destructive" /> por GUAMAN SANTOS MELANIE CRISTINA
            </p>
            <p className="mt-1">
              Programacion - Ingenieria Web | 2026
            </p>
          </footer>
        </div>
      </main>

      {/* Modals */}
      <LibroForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setSelectedLibro(null)
        }}
        onSubmit={selectedLibro ? handleUpdate : handleCreate}
        libro={selectedLibro}
        loading={saving}
      />

      <LibroDetail
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false)
          setSelectedLibro(null)
        }}
        libro={selectedLibro}
      />

      <DeleteConfirm
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false)
          setDeleteTarget(null)
        }}
        onConfirm={handleDelete}
        title={deleteTarget?.titulo}
      />
    </div>
  )
}
