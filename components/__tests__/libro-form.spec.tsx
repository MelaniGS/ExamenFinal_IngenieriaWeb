import { render, screen, fireEvent } from '@testing-library/react';
import { LibroForm } from '../libro-form';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

describe('LibroForm Component', () => {
    const mockOnSubmit = vi.fn();
    const props = {
        open: true,
        onClose: vi.fn(),
        onSubmit: mockOnSubmit,
        loading: false
    };

    it('debe mostrar errores si el titulo esta vacio al intentar enviar', async () => {
        render(React.createElement(LibroForm, props));

        const submitBtn = screen.getByText('Crear Libro');
        fireEvent.click(submitBtn);

        expect(screen.getByText('El titulo es requerido')).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('no debe permitir ingresar numeros en el campo de autor', () => {
        render(React.createElement(LibroForm, props));

        const autorInput = screen.getByLabelText('Autor') as HTMLInputElement;

        // Simular intento de escribir un numero
        fireEvent.change(autorInput, { target: { value: 'Autor 123' } });

        // Solo deberia aceptar letras segun el regex implementado en el onChange
        // El test fallara si el componente no bloquea el cambio
        // En nuestra implementacion, el onChange bloquea el seteo si no cumple el regex
        // Pero fireEvent.change fuerza el valor. En React controlado, el valor final depende del estado.
        // Verificamos el valor del input
        expect(autorInput.value).toBe('');
    });
});
