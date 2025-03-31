import * as net from 'net';
import * as readline from 'readline';

const client = new net.Socket();
const PORT = 60300;

let wholeData = '';

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

/**
 * Permite la conexion de un cliente a un puerto
 */
client.connect(PORT, () => {
  console.log('Conectado al servidor');
});

/**
 * Funcion para recibir datos de otro cliente
 */
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
  console.log(wholeData);
  wholeData = '';
});

/**
 * Funcion por si ocurren errores durante la conexion
 */
client.on('error', (err) => {
  console.error('Error:', err.message);
});

/**
 * Funcion para cuando cerramos la conexion del cliente con el servidor
 */
client.on('close', () => {
  console.log('Conexión cerrada');
});

/**
 * Funcion para poder enviar mensajes al chat
*/
rl.on('line', (input) => {
  client.write(JSON.stringify(input));
});