#!/usr/bin/env node
/* eslint-disable no-console */

require('dotenv').config();
const app = require('./src/app/init');
const debug = require('debug')('nevis-range:server');
const http = require('http');

const normalizePort = (val) => {
  const portAsInt = parseInt(val, 10);

  if (isNaN(portAsInt)) {
    // named pipe
    return val;
  }

  if (portAsInt >= 0) {
    return portAsInt;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
