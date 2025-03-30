import * as net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { RequestType, ResponseType } from './server.js';
import { Funko, TipoFunko, GeneroFunko } from './funko.js';

const client = new net.Socket();
const PORT = 5000;
const HOST = 'localhost';

client.connect(PORT, HOST, () => {
  console.log(`Conectado al servidor en ${HOST}:${PORT}`);
});

client.on('data', (data) => {
  const responses: ResponseType[] = data.toString().trim().split('\n').map(line => JSON.parse(line));
  responses.forEach(response => console.log('Respuesta del servidor:', response));
});

client.on('close', () => {
  console.log('Conexión cerrada');
});

client.on('error', (err) => {
  console.error('Error en la conexión:', err.message);
});

const sendRequest = (request: RequestType): void => {
  client.write(JSON.stringify(request) + '\n');
};

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
    sendRequest({ type: 'add', usuario: argv.usuario, funkoPop: funko });
  })
  .command('update', 'Modificar un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'string', demandOption: true },
    campo: { type: 'string', demandOption: true },
    valor: { type: 'string', demandOption: true }
  }, (argv) => {
    //sendRequest({ type: 'update', usuario: argv.usuario, funkoPop: { id: argv.id, [argv.campo]: argv.valor } });
  })
  .command('delete', 'Eliminar un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'string', demandOption: true }
  }, (argv) => {
    sendRequest({ type: 'remove', usuario: argv.usuario, id: Number(argv.id) });
  })
  .command('list', 'Listar Funkos', {
    usuario: { type: 'string', demandOption: true }
  }, (argv) => {
    sendRequest({ type: 'list', usuario: argv.usuario });
  })
  .command('show', 'Mostrar un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'string', demandOption: true }
  }, (argv) => {
    sendRequest({ type: 'read', usuario: argv.usuario, id: Number(argv.id) });
  })
  .help()
  .argv;
