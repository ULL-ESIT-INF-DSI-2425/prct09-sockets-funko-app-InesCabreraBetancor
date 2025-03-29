import { describe, it, expect, vi } from 'vitest';
import * as fs from 'fs';
import * as funkoService from '../src/funkoService.js';
import {TipoFunko, Funko, GeneroFunko} from '../src/funko.js'
import chalk from 'chalk';

// Mock de fs para evitar acceso real a los ficheros
vi.mock('fs');

// Datos de prueba
const usuario = 'usuario1';
const funkoData = new Funko('1','Funko1','Descripción de Funko1',TipoFunko.Pop,
GeneroFunko.Animacion,'The Big Bang Theory',101,true,'Brilla en la oscuridad', 50);

// Test para añadir un Funko
describe('funkoService', () => {
  it('should add a Funko to the list', () => {
    const saveFunkoMock = vi.spyOn(funkoService, 'addFunko').mockImplementation(() => {});
    funkoService.addFunko(usuario, funkoData);
    expect(saveFunkoMock).toHaveBeenCalledTimes(1);
    expect(saveFunkoMock).toHaveBeenCalledWith(usuario, expect.objectContaining(funkoData));
    saveFunkoMock.mockRestore();
  });

  it('should not add a Funko with an existing ID', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);  // Simulamos que el archivo ya existe
    const consoleErrorMock = vi.spyOn(console, 'log').mockImplementation(() => {});  // Mock de console.log
    funkoService.addFunko(usuario, funkoData);
    expect(consoleErrorMock).toHaveBeenCalledWith(chalk.red('Error: Ya existe un Funko con este ID.'));
    consoleErrorMock.mockRestore();
  });

  it('should update a Funko', () => {
    const updatedFunkoData = { nombre: 'Funko1 Updated', valor: 75 };
    vi.spyOn(funkoService, 'updateFunko').mockImplementation(() => {});
    funkoService.updateFunko(usuario, funkoData.id, updatedFunkoData);
    expect(funkoService.updateFunko).toHaveBeenCalledWith(usuario, expect.objectContaining(updatedFunkoData));
  });

  it('should throw an error when trying to update a non-existing Funko', () => {
    const consoleErrorMock = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);  // Simulamos que no existe el archivo
    funkoService.updateFunko(usuario, 'non-existing-id', funkoData);
    expect(consoleErrorMock).toHaveBeenCalledWith(chalk.red('Error: No existe un Funko con ID non-existing-id.'));
    consoleErrorMock.mockRestore();
  });

  it('should delete a Funko', () => {
    const deleteFunkoMock = vi.spyOn(funkoService, 'deleteFunko').mockImplementation(() => {});
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    funkoService.deleteFunko(usuario, funkoData.id);
    expect(deleteFunkoMock).toHaveBeenCalledTimes(1);
    deleteFunkoMock.mockRestore();
  });

  it('should list Funkos', () => {
    const funkosList = [funkoData];
    vi.spyOn(funkoService, 'listFunkos').mockReturnValue();
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});
    funkoService.listFunkos(usuario);
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Funko1'));
    consoleLogMock.mockRestore();
  });
});
