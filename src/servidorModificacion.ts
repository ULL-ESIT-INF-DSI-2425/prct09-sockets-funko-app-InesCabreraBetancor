import * as net from 'net';

const clientes : [net.Socket, number][] = [];
let mensajes_enviados : [string][] = [];
let ids_sockets = 0;

let wholeData = '';

const server = net.createServer((servidor) => {
  const clientId = ++ids_sockets;
  console.log(`Nuevo cliente conectado con ID ${clientId}`);
  clientes.push([servidor, clientId]);
  /**
   * Funcion para poder enviarle datos al resto de clientes conectados
   * buscamos el index para idetificar en los chats quien habla.
   */
  servidor.on('data', (dataChunk) => {
    wholeData += dataChunk;
    let mensaje = JSON.parse(wholeData);
    const clientIndex = clientes.findIndex(([s]) => s === servidor);
    if (clientIndex !== -1) {
      const [_, id] = clientes[clientIndex];
      const msg = mensaje;
      console.log(`Cliente ${id}: ${msg}`);
      enviarOtrosClientes(`Cliente ${id}: ${msg}\n`, servidor);
      wholeData = '';
    }
  });
  /**
   * Funcion para manejar errores de conexion
   */
  servidor.on('error', (err) => {
    console.error('Error en la conexión:', err.message);
  });
});

/**
 * Funcion para que reenviar los mensajes
 * @param message es el mensaje recibido
 * @param sender es el cliente emisor para que no se le escriba a él
 */
function enviarOtrosClientes(message: string, sender: net.Socket) {
  clientes.forEach(([client, _]) => {
    if (client !== sender && BuscarMensaje(message) === false) {
      client.write(message);
    }
  });
}

/**
 * NO HACE FALTA - ARREGLADO EN EL CLIENTE
 * Funcion para que no se repitan los mensajes. 
 * @param message mensaje que se quiere enviar
 * @returns true si ya ha sido enviado
 */
function BuscarMensaje(message : string) : boolean {
  mensajes_enviados.forEach((item, index) => {
    if (item[index] === message) {
      return true;
    }
  })
  return false;
}

server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});