import type { Libro, LibroInput } from "./types"

const BASE_URL = "https://examenfinal-ingenieriaweb.onrender.com"

const API_HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": "examen-seguro-2026",
}

export const fetcher = (url: string) => {
    const targetUrl = `${BASE_URL}${url}`;
    console.log(`[API] Fetching: ${targetUrl}`);
    return fetch(targetUrl, { headers: { "x-api-key": "examen-seguro-2026" } })
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            return res.json()
        })
}

export async function createLibro(data: LibroInput) {
    const res = await fetch(`${BASE_URL}/api/libros`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function updateLibro(id: number, data: LibroInput) {
    const res = await fetch(`${BASE_URL}/api/libros/${id}`, {
        method: "PUT",
        headers: API_HEADERS,
        body: JSON.stringify(data),
    })
    return res.json()
}

export async function deleteLibro(id: number) {
    const res = await fetch(`${BASE_URL}/api/libros/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": "examen-seguro-2026" },
    })
    return res.json()
}

export async function getLibroById(id: string) {
    const res = await fetch(`${BASE_URL}/api/libros/${id}`, {
        headers: { "x-api-key": "examen-seguro-2026" },
    })
    return res.json()
}
