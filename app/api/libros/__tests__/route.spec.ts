import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '../route';
import { obtenerLibros, crearLibro } from '@/lib/data-store';
import { NextResponse } from 'next/server';

vi.mock('@/lib/data-store', () => ({
    obtenerLibros: vi.fn(),
    crearLibro: vi.fn(),
}));

describe('API Libros (Controlador)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GET /api/libros', () => {
        it('debe retornar 200 y la lista de libros en caso de éxito', async () => {
            const mockLibros = [{ id: 1, titulo: 'Test' }];
            vi.mocked(obtenerLibros).mockResolvedValue(mockLibros as any);

            const req = new Request('http://localhost/api/libros');
            const res = await GET(req);
            const data = await res.json();

            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toEqual(mockLibros);
        });

        it('debe retornar 500 si el servicio falla', async () => {
            vi.mocked(obtenerLibros).mockRejectedValue(new Error('Fail'));

            const req = new Request('http://localhost/api/libros');
            const res = await GET(req);
            const data = await res.json();

            expect(res.status).toBe(500);
            expect(data.success).toBe(false);
        });
    });

    describe('POST /api/libros', () => {
        it('debe retornar 201 y el libro creado si los datos son válidos', async () => {
            const mockInput = { titulo: 'T', autor: 'A', categoria: 'C', anioPublicacion: 2000, stock: 10 };
            vi.mocked(crearLibro).mockResolvedValue({ id: 1, ...mockInput } as any);

            const req = new Request('http://localhost/api/libros', {
                method: 'POST',
                body: JSON.stringify(mockInput),
            });
            const res = await POST(req);
            const data = await res.json();

            expect(res.status).toBe(201);
            expect(data.success).toBe(true);
        });

        it('debe retornar 400 si faltan campos obligatorios', async () => {
            const req = new Request('http://localhost/api/libros', {
                method: 'POST',
                body: JSON.stringify({ titulo: 'Solo Titulo' }),
            });
            const res = await POST(req);
            const data = await res.json();

            expect(res.status).toBe(400);
            expect(data.success).toBe(false);
        });
    });
});
