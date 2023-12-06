export function getPosts(relativePath) {
  if (process.server) {
    const fs = require('fs');
    const path = require('path');

    const readFile = function(file) {
      return fs.readFileSync(path.resolve(__dirname, `${relativePath + file}`));
    }

    const fileNames = fs.readdirSync(path.resolve(__dirname, relativePath));
    return fileNames.map(name => JSON.parse(readFile(name)))
  }
}