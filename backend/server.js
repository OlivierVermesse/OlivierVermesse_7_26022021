const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'écoute') {
    throw error;
  }
  const address = server.address();
  const fullAdress = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(fullAdress + " Vous devez être administrateur.");
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(fullAdress + ' est en cours d\'utilisation.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const fullAdress = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Le serveur est utilisé sur ' + fullAdress);
});

server.listen(port);
