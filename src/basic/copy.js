import { copyFile, readdir, mkdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
export default async function copy(dirSet, sep, source, destination){
  try {
    let fileSource = path.join(dirSet.join(sep), source);
    let fileDest = path.join(dirSet.join(sep), destination);
    if(fs.statSync(fileDest).isFile()){
      copyFile(fileSource, fileDest);
    }
    else {
      mkdir(fileDest, { recursive: true }, (err) => {
        if (err) console.error('Operation failed');
      });

      if(fs.statSync(fileSource).isFile()){
        copyFile(fileSource, path.join(fileDest, source))
      }
      else {
  
        let files = await readdir(fileSource,{ withFileTypes: true });
        let filesCopy = await readdir(fileDest,{ withFileTypes: true });
  
        for (const file of filesCopy) {
          fs.unlink(path.join(fileDest, file.name), (error => {
            if (error) return console.error(error.message);
          }));
        }
  
        for (const file of files){
          let newDir = path.join(fileSource,file.name);
          let toNewDir = path.join(fileDest, file.name);
          copyFile(newDir, toNewDir);
        }
      }
    }
    console.log(`You are currently in ${dirSet.join(sep)}`);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}