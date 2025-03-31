import * as net from 'net';
import * as fs from 'fs';
import * as path from 'path';
import { Funko } from './funko.js';
import { EventEmitter } from 'events';
import { createServer } from 'http';

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  usuario: string;
  funkoPop?: Funko;
  id?: number;
};

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  message?: string;
  funkoPops?: Funko[];
};

const DATA_DIR = path.join(__dirname, '../data/');
const getUserDir = (usuario: string): string => path.join(DATA_DIR, usuario);

class MessageEventEmitter extends EventEmitter {
  constructor(socket: net.Socket) {
    super();
    let dataBuffer = '';
    socket.on('data', (chunk) => {
      dataBuffer += chunk.toString();
      let messageLimit = dataBuffer.indexOf('\n');
      while (messageLimit !== -1) {
        const message = dataBuffer.substring(0, messageLimit);
        dataBuffer = dataBuffer.substring(messageLimit + 1);
        this.emit('message', JSON.parse(message));
        messageLimit = dataBuffer.indexOf('\n');
      }
    });
  }
}

const server = net.createServer((socket) => {
const emitter = new MessageEventEmitter(socket);
emitter.on('message', (request: RequestType) => {
  let response: ResponseType;
  switch (request.type) {
    case 'add':
      handleAdd(request, (response) => socket.write(JSON.stringify(response) + '\n'));
    break;
    case 'update':
      handleUpdate(request, (response) => socket.write(JSON.stringify(response) + '\n'));
    break;
    case 'remove':
      handleRemove(request, (response) => socket.write(JSON.stringify(response) + '\n'));
    break;
    case 'read':
      handleRead(request, (response) => socket.write(JSON.stringify(response) + '\n'));
    break;
    case 'list':
      handleList(request, (response) => socket.write(JSON.stringify(response) + '\n'));
    break;
    default:
      socket.write(JSON.stringify({ type: request.type, success: false, message: 'Operación no válida' }) + '\n');
    }
  });
});

server.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000');
});

function handleAdd(request: RequestType, callback: (response: ResponseType) => void): void {
  if (!request.funkoPop) return callback({ type: 'add', success: false, message: 'Datos inválidos' });
  const userDir = getUserDir(request.usuario);
  fs.mkdir(userDir, { recursive: true }, (err) => {
    if (err) return callback({ type: 'add', success: false, message: 'Error al crear directorio' });
    if (!request.funkoPop) return callback({ type: 'add', success: false, message: 'Datos inválidos' });
    const filePath = path.join(userDir, `${request.funkoPop.id}.json`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) return callback({ type: 'add', success: false, message: 'Funko ya existe' });
      fs.writeFile(filePath, JSON.stringify(request.funkoPop, null, 2), (err) => {
        if (err) return callback({ type: 'add', success: false, message: 'Error al guardar Funko' });
        callback({ type: 'add', success: true, message: 'Funko añadido' });
      });
    });
  });
}

function handleUpdate(request: RequestType, callback: (response: ResponseType) => void): void {
  if (!request.funkoPop) return callback({ type: 'update', success: false, message: 'Datos inválidos' });
  const filePath = path.join(getUserDir(request.usuario), `${request.funkoPop.id}.json`);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return callback({ type: 'update', success: false, message: 'Funko no encontrado' });
    fs.writeFile(filePath, JSON.stringify(request.funkoPop, null, 2), (err) => {
      if (err) return callback({ type: 'update', success: false, message: 'Error al actualizar Funko' });
      callback({ type: 'update', success: true, message: 'Funko actualizado' });
    });
  });
}

function handleRemove(request: RequestType, callback: (response: ResponseType) => void): void {
  if (request.id === undefined) return callback({ type: 'remove', success: false, message: 'ID inválido' });
  const filePath = path.join(getUserDir(request.usuario), `${request.id}.json`);
  fs.unlink(filePath, (err) => {
    if (err) return callback({ type: 'remove', success: false, message: 'Funko no encontrado o error al eliminar' });
    callback({ type: 'remove', success: true, message: 'Funko eliminado' });
  });
}

function handleRead(request: RequestType, callback: (response: ResponseType) => void): void {
  if (request.id === undefined) return callback({ type: 'read', success: false, message: 'ID inválido' });
  const filePath = path.join(getUserDir(request.usuario), `${request.id}.json`);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return callback({ type: 'read', success: false, message: 'Funko no encontrado' });
    callback({ type: 'read', success: true, funkoPops: [JSON.parse(data)] });
  });
}

function handleList(request: RequestType, callback: (response: ResponseType) => void): void {
  const userDir = getUserDir(request.usuario);
  fs.readdir(userDir, (err, files) => {
    if (err) return callback({ type: 'list', success: false, message: 'Usuario sin Funkos o error al leer directorio' });
    const funkos: Funko[] = [];
    let count = files.length;
    if (count === 0) return callback({ type: 'list', success: true, funkoPops: funkos });
    files.forEach(file => {
      fs.readFile(path.join(userDir, file), 'utf-8', (err, data) => {
        if (!err) funkos.push(JSON.parse(data));
        if (--count === 0) callback({ type: 'list', success: true, funkoPops: funkos });
      });
    });
  });
}