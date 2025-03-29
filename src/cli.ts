import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Funko, TipoFunko, GeneroFunko } from './funko.js';
import { addFunko, updateFunko, deleteFunko, listFunkos, showFunko } from './toolsFunko.js';

yargs(hideBin(process.argv))
    .command('add', 'Añadir un Funko', {
        usuario: { type: 'string', demandOption: true },
        id: { type: 'string', demandOption: true },
        nombre: { type: 'string', demandOption: true },
        descripcion: { type: 'string', demandOption: true },
        tipo: { type: 'string', demandOption: true },
        genero: { type: 'string', demandOption: true },
        franquicia: { type: 'string', demandOption: true },
        numero: { type: 'number', demandOption: true },
        exclusivo: { type: 'boolean', demandOption: true },
        caracteristicas: { type: 'string', demandOption: true },
        valor: { type: 'number', demandOption: true }
    }, (argv) => {
        const funko = new Funko(
            argv.id,
            argv.nombre,
            argv.descripcion,
            argv.tipo as TipoFunko,
            argv.genero as GeneroFunko,
            argv.franquicia,
            argv.numero,
            argv.exclusivo,
            argv.caracteristicas,
            argv.valor
        );
        addFunko(argv.usuario, funko);
    })
    .command('update', 'Modificar un Funko', {
        usuario: { type: 'string', demandOption: true },
        id: { type: 'string', demandOption: true },
        campo: { type: 'string', demandOption: true },
        valor: { type: 'string', demandOption: true }
    }, (argv) => {
        updateFunko(argv.usuario, argv.id, { [argv.campo]: argv.valor });
    })
    .command('delete', 'Eliminar un Funko', {
        usuario: { type: 'string', demandOption: true },
        id: { type: 'string', demandOption: true }
    }, (argv) => {
        deleteFunko(argv.usuario, argv.id);
    })
    .command('list', 'Listar Funkos', {
        usuario: { type: 'string', demandOption: true }
    }, (argv) => {
        listFunkos(argv.usuario);
    })
    .command('show', 'Mostrar un Funko', {
        usuario: { type: 'string', demandOption: true },
        id: { type: 'string', demandOption: true }
    }, (argv) => {
        showFunko(argv.usuario, argv.id);
    })
    .help()
    .argv;
