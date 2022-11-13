const { resolve } = require('path');
const { readdir } = require('fs').promises;
const sharp = require("sharp")

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

;(async () => {
    for await (const f of getFiles('./testCases')) {
      if (typeof f == 'string' && f.indexOf('.svg') !== -1) {
        toPNG(f)
      }
    }
  })()


async function toPNG(filePath) {
    await sharp(filePath)
        // .resize()
        .png()
        .toFile(filePath.replace('.svg', '.png'))
        console.log(filePath);
}