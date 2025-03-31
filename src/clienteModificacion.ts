import * as net from 'net';

const client = new net.Socket();
const PORT = 60300;

let wholeData = '';

client.connect(PORT, () => {
  console.log('Conectado al servidor');
});

client.on('data', (dataChunk) => {
  wholeData += dataChunk;
  console.log(wholeData);
  wholeData = '';
});

client.on('error', (err) => {
  console.error('Error:', err.message);
});

client.on('close', () => {
  console.log('Conexión cerrada');
});

process.stdin.on('data', (input) => {
  client.write(input.toString().trim());
});