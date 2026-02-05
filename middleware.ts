import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Simple "Security" requirement check
    // You can check for an API Key or just log the request
    const apiKey = request.headers.get("x-api-key");
    const path = request.nextUrl.pathname;

    // We only protect API routes
    if (path.startsWith("/api/libros")) {
        const VALID_API_KEY = "examen-seguro-2026";

        if (apiKey !== VALID_API_KEY) {
            return NextResponse.json(
                { success: false, message: "No autorizado: API Key invalida o ausente" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
