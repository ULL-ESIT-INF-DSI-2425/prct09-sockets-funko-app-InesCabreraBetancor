import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { Funko } from './funko.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data/');

const getUserDir = (usuario: string): string => path.join(DATA_DIR, usuario);

const saveFunko = (usuario: string, funko: Funko): void => {
    const userDir = getUserDir(usuario);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }
    const filePath = path.join(userDir, `${funko.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(funko, null, 2));
};

const loadFunkos = (usuario: string): Funko[] => {
    const userDir = getUserDir(usuario);
    if (!fs.existsSync(userDir)) {
        return [];
    }
    return fs.readdirSync(userDir).map(file => {
        const filePath = path.join(userDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    });
};

export const addFunko = (usuario: string, funko: Funko): void => {
    const funkos = loadFunkos(usuario);
    if (funkos.some(f => f.id === funko.id)) {
        console.log(chalk.red(`Error: El Funko con ID ${funko.id} ya existe.`));
        return;
    }
    saveFunko(usuario, funko);
    console.log(chalk.green(`Funko ${funko.nombre} añadido correctamente.`));
};

export const updateFunko = (usuario: string, id: string, newData: Partial<Funko>): void => {
    const funkos = loadFunkos(usuario);
    const index = funkos.findIndex(f => f.id === id);
    if (index === -1) {
        console.log(chalk.red(`Error: No existe un Funko con ID ${id}.`));
        return;
    }
    const updatedFunko = { 
      ...funkos[index],
      ...newData,
      id: newData.id ?? funkos[index].id,
      nombre: newData.nombre ?? funkos[index].nombre,
      descripcion: newData.descripcion ?? funkos[index].descripcion,
      tipo: newData.tipo ?? funkos[index].tipo,
      genero: newData.genero ?? funkos[index].genero,
      franquicia: newData.franquicia ?? funkos[index].franquicia,
      numero: newData.numero ?? funkos[index].numero,
      exclusivo: newData.exclusivo ?? funkos[index].exclusivo,
      caracteristicas: newData.caracteristicas ?? funkos[index].caracteristicas,
      valor: newData.valor ?? funkos[index].valor
  };
  const updatedFunkoInstance = new Funko(
      updatedFunko.id,
      updatedFunko.nombre,
      updatedFunko.descripcion,
      updatedFunko.tipo,
      updatedFunko.genero,
      updatedFunko.franquicia,
      updatedFunko.numero,
      updatedFunko.exclusivo,
      updatedFunko.caracteristicas,
      updatedFunko.valor
  );
    saveFunko(usuario, updatedFunkoInstance);
    console.log(chalk.green(`Funko con ID ${id} actualizado.`));
};

export const deleteFunko = (usuario: string, id: string): void => {
    const userDir = getUserDir(usuario);
    const filePath = path.join(userDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red(`Error: No existe un Funko con ID ${id}.`));
        return;
    }
    fs.unlinkSync(filePath);
    console.log(chalk.green(`Funko con ID ${id} eliminado.`));
};

export const listFunkos = (usuario: string): void => {
    const funkos = loadFunkos(usuario);
    if (funkos.length === 0) {
        console.log(chalk.red('No hay Funkos en la lista.'));
        return;
    }
    funkos.forEach(funko => {
        let color = chalk.red;
        if (funko.valor > 100) color = chalk.green;
        else if (funko.valor > 50) color = chalk.yellow;
        else if (funko.valor > 20) color = chalk.blue;
        console.log(color(JSON.stringify(funko, null, 2)));
    });
};

export const showFunko = (usuario: string, id: string): void => {
    const funkos = loadFunkos(usuario);
    const funko = funkos.find(f => f.id === id);
    if (!funko) {
        console.log(chalk.red(`Error: No existe un Funko con ID ${id}.`));
        return;
    }
    console.log(chalk.green(JSON.stringify(funko, null, 2)));
};
