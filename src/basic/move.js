import { copyFile, readdir, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import rm from './delete.js';
export default async function copy(dirSet, sep, source, destination){
  try {
    let fileSource = path.join(dirSet.join(sep), source);
    let fileDest = path.join(dirSet.join(sep), destination);
    if(fs.statSync(fileDest).isFile()){
      copyFile(fileSource, fileDest);
    }
    else {

      if(fs.statSync(fileSource).isFile()){
        await mkdir(fileDest, { recursive: true }, (err) => {
          if (err) console.error('');
        });

        copyFile(fileSource, path.join(fileDest, source))
      }
      else {
        await mkdir(path.join(fileDest, source), { recursive: true }, (err) => {
          if (err) console.error('');
        });
  
        let files = await readdir(fileSource,{ withFileTypes: true });
        let filesCopy = await readdir(path.join(fileDest, source),{ withFileTypes: true });
  
        for (const file of filesCopy) {
          fs.unlink(path.join(fileDest, file.name), (error => {
            if (error) return console.error(error.message);
          }));
        }
  
        for (const file of files){
          let newDir = path.join(fileSource,file.name);
          let toNewDir = path.join(fileDest, source, file.name);
          copyFile(newDir, toNewDir);
        }
      }
    }
    (async () => rm(dirSet, sep, source))();
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}