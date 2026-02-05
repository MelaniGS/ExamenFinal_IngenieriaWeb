import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // 1. Manejo de CORS
    const origin = request.headers.get("origin") ?? "*";
    const res = NextResponse.next();

    // Añadir headers de CORS básicos
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
    res.headers.set("Access-Control-Max-Age", "86400");

    // Manejar el preflight (OPTIONS)
    if (request.method === "OPTIONS") {
        return new NextResponse(null, { headers: res.headers });
    }

    // 2. Seguridad por API Key
    const apiKey = request.headers.get("x-api-key");
    const path = request.nextUrl.pathname;

    if (path.startsWith("/api/libros")) {
        const VALID_API_KEY = "examen-seguro-2026";

        if (apiKey !== VALID_API_KEY) {
            return NextResponse.json(
                { success: false, message: "No autorizado: API Key invalida o ausente" },
                { status: 401, headers: res.headers }
            );
        }
    }

    return res;
}

export const config = {
    matcher: "/api/:path*",
};
