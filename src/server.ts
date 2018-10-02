// server

import * as https from 'https';
import { join as pathJoin } from 'path';
import { readFileSync } from 'fs';
import app from './app';

const options = {
    key: readFileSync('certs/privatekey.pem'),
    cert: readFileSync('certs/certificate.pem'),
};

https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`OAuth Consumer Server is running at https://localhost:${app.get('port')}
               in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});