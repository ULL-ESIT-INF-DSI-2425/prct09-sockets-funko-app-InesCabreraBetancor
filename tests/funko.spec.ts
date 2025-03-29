import { describe, expect, test } from 'vitest';
import { Funko, TipoFunko, GeneroFunko } from '../src/funko';

describe('Funko Class', () => {
  const funko = new Funko(
    '1',
    'Elena',
    'Pop pequeño',
    TipoFunko.Pop,
    GeneroFunko.Animacion,
    'Nemo',
    24,
    true,
    'Edición especial',
    256
  );

  test('Debe retornar el id correctamente', () => {
    expect(funko.id).toBe('1');
  });

  test('Debe retornar el nombre correctamente', () => {
    expect(funko.nombre).toBe('Elena');
  });

  test('Debe retornar la descripción correctamente', () => {
    expect(funko.descripcion).toBe('Pop pequeño');
  });

  test('Debe retornar el tipo correctamente', () => {
    expect(funko.tipo).toBe(TipoFunko.Pop);
  });

  test('Debe retornar el género correctamente', () => {
    expect(funko.genero).toBe(GeneroFunko.Animacion);
  });

  test('Debe retornar la franquicia correctamente', () => {
    expect(funko.franquicia).toBe('Nemo');
  });

  test('Debe retornar el número correctamente', () => {
    expect(funko.numero).toBe(24);
  });

  test('Debe retornar si es exclusivo correctamente', () => {
    expect(funko.exclusivo).toBe(true);
  });

  test('Debe retornar las características correctamente', () => {
    expect(funko.caracteristicas).toBe('Edición especial');
  });

  test('Debe retornar el valor correctamente', () => {
    expect(funko.valor).toBe(256);
  });
});