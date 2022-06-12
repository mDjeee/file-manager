import { readdir, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
export default async function copy(dirSet, sep, source, destination){
  try {
    let fileSource = path.join(dirSet.join(sep), source);
    let fileDest = path.join(dirSet.join(sep), destination);
    if(fs.statSync(fileDest).isFile()){
      let readableStream = fs.createReadStream(fileSource);
      let writableStream = fs.createWriteStream(fileDest);
      readableStream.pipe(writableStream);
    }
    else {
      if(fs.statSync(fileSource).isFile()){
        let readableStream = fs.createReadStream(fileSource);
        let writableStream = fs.createWriteStream(path.join(fileDest, source));
        readableStream.pipe(writableStream);
      }
      else {
        let files = await readdir(fileSource,{ withFileTypes: true });

        mkdir(path.join(fileDest, source), { recursive: true }, (err) => {
          if (err) console.error('Operation failed');
        });
  
        for (const file of files){
          let newDir = path.join(fileSource,file.name);
          let toNewDir = path.join(fileDest, source, file.name);
          let readableStream = fs.createReadStream(newDir);
          let writableStream = fs.createWriteStream(toNewDir);
          readableStream.pipe(writableStream);
        }
      }
    }
    console.log(`You are currently in ${dirSet.join(sep)}`);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}