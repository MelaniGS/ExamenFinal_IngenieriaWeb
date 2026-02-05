"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Server, Database, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function HealthPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/health", fetcher, {
    refreshInterval: 5000,
  })

  const isHealthy = data?.status === "OK"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Health Check</h1>
            <p className="text-xs text-muted-foreground">
              Estado del sistema en tiempo real
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Status principal */}
          <Card>
            <CardContent className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isHealthy
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {isLoading
                      ? "Verificando..."
                      : error
                        ? "Error de conexion"
                        : isHealthy
                          ? "Sistema Operativo"
                          : "Sistema con Problemas"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {data?.timestamp
                      ? new Date(data.timestamp).toLocaleString("es-ES")
                      : "---"}
                  </p>
                </div>
              </div>
              <Badge
                variant={isHealthy ? "default" : "destructive"}
                className={isHealthy ? "bg-emerald-600 text-emerald-50 hover:bg-emerald-600" : ""}
              >
                {isHealthy ? "OK" : "ERROR"}
              </Badge>
            </CardContent>
          </Card>

          {/* Details */}
          {data && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">{data.servicio}</p>
                  <p className="text-xs text-muted-foreground">
                    Autora: {data.autor}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">{data.uptime}</p>
                  <p className="text-xs text-muted-foreground">
                    Tiempo activo del servidor
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Base de Datos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">
                    {data.estadisticas?.totalLibros} libros registrados
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {data.estadisticas?.totalStock} unidades en stock
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Estadisticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">
                    {data.estadisticas?.categorias} categorias
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Promedio publicacion: {data.estadisticas?.promedioPublicacion}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* API Endpoint */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Endpoint API</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <code className="rounded-md bg-muted px-3 py-2 font-mono text-sm text-foreground">
                GET /api/health
              </code>
              <Button variant="outline" size="sm" onClick={() => mutate()}>
                Refrescar
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
