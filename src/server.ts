// server

import * as https from 'https';
import { readFileSync } from 'fs';
import app from './app';
import socketIo from 'socket.io';

const options = {
  key: readFileSync('certs/privatekey.pem'),
  cert: readFileSync('certs/certificate.pem'),
};

const httpsServer = https.createServer(options, app);
const io = socketIo(httpsServer);

io.on('connection', (socket) => {
  console.log('some client connected');
  socket.on('chat message', (msg) => {
    console.log('emitting message', msg);
    io.emit('chat message', msg);
  });
});

httpsServer.listen(app.get('port'), () => {
  console.log(`OAuth Consumer Server is running at https://localhost:${app.get('port')}
               in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});
