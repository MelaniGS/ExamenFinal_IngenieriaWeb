import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as apiService from '../api-service';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API Service (Frontend)', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    it('createLibro debe enviar una peticion POST con los headers correctos', async () => {
        const mockInput = { titulo: 'Test', autor: 'A', categoria: 'C', anioPublicacion: 2024, stock: 10 };
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, data: { id: 1, ...mockInput } })
        });

        const result = await apiService.createLibro(mockInput as any);

        expect(mockFetch).toHaveBeenCalledWith('/api/libros', expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
                'x-api-key': 'examen-seguro-2026',
                'Content-Type': 'application/json'
            })
        }));
        expect(result.success).toBe(true);
    });

    it('getLibroById debe enviar una peticion GET con el ID correcto', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, data: { id: 1, titulo: 'Libro 1' } })
        });

        const result = await apiService.getLibroById('1');

        expect(mockFetch).toHaveBeenCalledWith('/api/libros/1', expect.objectContaining({
            headers: expect.objectContaining({
                'x-api-key': 'examen-seguro-2026'
            })
        }));
        expect(result.data.id).toBe(1);
    });
});
