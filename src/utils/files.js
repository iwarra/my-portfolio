export const files = Files()

function Files() {
  if (!process.server) return

  let filesDir = "../data/posts/"
  const fs = require('fs');
  const path = require('path');
  const markdown = require('markdown-it')({
    html: true,
    xhtmlOut: true,
    breaks: true,
  })
  
  const readFile = function(fileName) {
    let file = JSON.parse(fs.readFileSync(path.resolve(__dirname, `${filesDir + fileName}`)));

    return {
      ...file,
      body: markdown.renderInline(file.body),
      slug: fileName.replace(".json", "")
    }
  }

  const getAll = (relativePath) => {
    if (relativePath) filesDir = relativePath
    const fileNames = fs.readdirSync(path.resolve(__dirname, filesDir));

    return fileNames.map(name => readFile(name))
  }

  return {
    getAll,
    getSingle: (name) => {
      return readFile(name)
    },
  }
}