// generateEnv

const fs = require('fs');

function generateEnvFile(port, nodeEnv) {
  // Creates .env file for configuration
  fs.writeFileSync('.env', `PORT=${port}\r\nNODE_ENV=${nodeEnv}`);
}

generateEnvFile(5000, 'dev');