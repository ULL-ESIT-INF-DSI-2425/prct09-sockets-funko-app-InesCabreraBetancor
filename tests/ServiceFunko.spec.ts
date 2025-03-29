import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import mockfs from 'mock-fs';
import { Funko, TipoFunko, GeneroFunko } from '../src/funko.js';
import * as fs from 'fs';
import * as path from 'path';
import * as funkosModule from '../src/ServiceFunko.js';

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
});  

/* Mocking fs and path functions
vi.mock('fs');
vi.mock('path');

describe('Funkos Module', () => {
    beforeEach(() => {
        mockfs(); // Crear un sistema de archivos simulado vacío
    });

    afterEach(() => {
        mockfs.restore(); // Restaurar el sistema de archivos después de cada prueba
    });

    it('should add a new Funko correctly', () => {
        const usuario = 'usuario1';
        const funko = new Funko(
            '123',
            'Spider-Man',
            'Figura de colección',
            TipoFunko.Pop,
            GeneroFunko.Animacion,
            'Marvel',
            1,
            false,
            'Brilla en la oscuridad',
            25.99
        );

        const saveFunkoSpy = vi.spyOn(funkosModule, 'addFunko').mockImplementation(() => {});
        
        funkosModule.addFunko(usuario, funko);
        
        expect(saveFunkoSpy).toHaveBeenCalledTimes(1);
        expect(saveFunkoSpy).toHaveBeenCalledWith(usuario, funko);
    });

    it('should update an existing Funko correctly', () => {
        const usuario = 'usuario1';
        const originalFunko = new Funko(
            '123',
            'Spider-Man',
            'Figura de colección',
            TipoFunko.Pop,
            GeneroFunko.Animacion,
            'Marvel',
            1,
            false,
            'Brilla en la oscuridad',
            25.99
        );
        
        const updatedFunkoData = {
            nombre: 'Spider-Man 2',
            valor: 30.00
        };

        const saveFunkoSpy = vi.spyOn(funkosModule, 'addFunko').mockImplementation(() => {});
        funkosModule.updateFunko(usuario, '123', updatedFunkoData);
        expect(saveFunkoSpy).toHaveBeenCalledTimes(1);
        expect(saveFunkoSpy).toHaveBeenCalledWith(usuario, expect.objectContaining({
            id: '123',
            nombre: 'Spider-Man 2',
            valor: 30.00
        }));
    });

    it('should delete a Funko correctly', () => {
        const usuario = 'usuario1';
        const funko = new Funko(
            '123',
            'Spider-Man',
            'Figura de colección',
            TipoFunko.Pop,
            GeneroFunko.Animacion,
            'Marvel',
            1,
            false,
            'Brilla en la oscuridad',
            25.99
        );

        const unlinkSyncSpy = vi.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
        const existsSyncSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
        funkosModule.deleteFunko(usuario, '123');
        expect(unlinkSyncSpy).toHaveBeenCalledTimes(1);
    });

    it('should list all Funkos correctly', () => {
        const usuario = 'usuario1';
        const funko1 = new Funko(
            '123',
            'Spider-Man',
            'Figura de colección',
            TipoFunko.Pop,
            GeneroFunko.Animacion,
            'Marvel',
            1,
            false,
            'Brilla en la oscuridad',
            25.99
        );
        const funko2 = new Funko(
            '124',
            'Iron Man',
            'Figura de colección',
            TipoFunko.Pop,
            GeneroFunko.Animacion,
            'Marvel',
            2,
            true,
            'Edición especial',
            120.99
        );

        const loadFunkosSpy = vi.spyOn(funkosModule, 'listFunkos').mockReturnValue();
        console.log = vi.fn(); // Mocking console.log to check outputs
        funkosModule.listFunkos(usuario);
        expect(loadFunkosSpy).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Spider-Man'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Iron Man'));
    });

    it('should show a specific Funko correctly', () => {
        const usuario = 'usuario1';
        const funko = new Funko(
            '123',
            'Spider-Man',
            'Figura de colección',
            TipoFunko.Pop,
            GeneroFunko.Animacion,
            'Marvel',
            1,
            false,
            'Brilla en la oscuridad',
            25.99
        );
        const loadFunkosSpy = vi.spyOn(funkosModule, 'showFunko').mockReturnValue();
        funkosModule.showFunko(usuario, '123');
        expect(loadFunkosSpy).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Spider-Man'));
    });
});
*/