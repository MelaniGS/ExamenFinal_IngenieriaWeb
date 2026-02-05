import { render, screen } from '@testing-library/react';
import { LibrosTable } from '../libros-table';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('LibrosTable Component', () => {
    const mockLibros = [
        { id: 1, titulo: 'Libro de Prueba', autor: 'Autor Test', categoria: 'Ficcion', anioPublicacion: 2021, stock: 5 }
    ];

    it('debe renderizar la lista de libros', () => {
        render(React.createElement(LibrosTable, {
            libros: mockLibros as any,
            onView: () => { },
            onEdit: () => { },
            onDelete: () => { }
        }));

        expect(screen.getByText('Libro de Prueba')).toBeInTheDocument();
    });
});
