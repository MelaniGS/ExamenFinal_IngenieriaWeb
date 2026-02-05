import { describe, it, expect, vi } from 'vitest';
import * as dataStore from '../data-store';
import { db } from '../db';

vi.mock('../db', () => ({
  db: {
    query: {
      libros: {
        findMany: vi.fn(),
        findFirst: vi.fn(),
      }
    },
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([]),
      }),
    }),
  }
}));

describe('Servicio de Libros (Backend)', () => {
  it('debe obtener todos los libros correctamente', async () => {
    const mockLibros = [{ id: 1, titulo: 'Libro 1', autor: 'Autor 1', categoria: 'Cat 1', anioPublicacion: 2020, stock: 10 }];
    (db.query.libros.findMany as any).mockResolvedValue(mockLibros);

    const result = await dataStore.obtenerLibros();
    expect(result).toEqual(mockLibros);
  });

  it('debe crear un libro correctamente', async () => {
    const mockInput = { titulo: 'Nuevo', autor: 'Yo', categoria: 'General', anioPublicacion: 2024, stock: 5 };
    const mockOutput = { id: 2, ...mockInput };

    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([mockOutput]),
      }),
    } as any);

    const result = await dataStore.crearLibro(mockInput as any);
    expect(result).toEqual(mockOutput);
  });

  it('debe manejar errores de la base de datos al obtener libros', async () => {
    (db.query.libros.findMany as any).mockRejectedValue(new Error('DB Error'));

    await expect(dataStore.obtenerLibros()).rejects.toThrow('DB Error');
  });
});
