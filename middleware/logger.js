const fs = require('fs');
const logStream = fs.createWriteStream('./logs/app.log', { flags: 'a' });

function logger(message) {
  const time = new Date().toISOString();
  logStream.write(`[${time}] ${message}\n`);
}

module.exports = logger;
