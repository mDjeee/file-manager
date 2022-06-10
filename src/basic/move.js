import { readdir, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import rm from './delete.js';
export default async function move(dirSet, sep, source, destination){
  try {
    let fileSource = path.join(dirSet.join(sep), source);
    let fileDest = path.join(dirSet.join(sep), destination);
    if(fs.statSync(fileDest).isFile()){
      let readableStream = fs.createReadStream(fileSource);
      let writableStream = fs.createWriteStream(fileDest);
      const stream = readableStream.pipe(writableStream);
      stream.on('finish', async () => { await rm(dirSet, sep, source)});
    }
    else {
      if(fs.statSync(fileSource).isFile()){
        let readableStream = fs.createReadStream(fileSource);
        let writableStream = fs.createWriteStream(path.join(fileDest, source));
        const stream = readableStream.pipe(writableStream);
        stream.on('finish', async () => { await rm(dirSet, sep, source)});
      }
      else {
        mkdir(path.join(fileDest, source), { recursive: true }, (err) => {
          if (err) console.error('');
        });
  
        let files = await readdir(fileSource,{ withFileTypes: true });
  
        for (const file of files){
          let newDir = path.join(fileSource,file.name);
          let toNewDir = path.join(fileDest, source, file.name);
          let readableStream = fs.createReadStream(newDir);
          let writableStream = fs.createWriteStream(toNewDir);
          const stream = readableStream.pipe(writableStream);
          stream.on('finish', async () => { await rm(dirSet, sep, source)});
        }
      }
    }
    // (async () => rm(dirSet, sep, source))();
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}