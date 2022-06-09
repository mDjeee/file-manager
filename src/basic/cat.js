import fs from 'fs';
import { readdir, lstat } from 'fs/promises';
export default async function cat(dirSet, sep, fileName){
  try {
    let files;

    if(dirSet.length === 1){
      files = await readdir(dirSet.join(sep) + sep);
    }
    else {
      files = await readdir(dirSet.join(sep));
    }

    let res = '';

    if(files.includes(fileName.toString())){
      let pathToFile = dirSet.join(sep) + sep + fileName;
      let readStream = fs.createReadStream(pathToFile);
      readStream.on('data', data => {
        res += data;
      });
      readStream.on('error', () =>{
        console.error('Operation failed');
      })
      readStream.on('end', () => {
        console.log(res);
        console.log(`You are currently in ${dirSet.join(sep)}`);
      })
      readStream.on('close', (err) => {
        if(err){
          console.error('Operation failed');
        }
      })
    }
    else {
      console.error('Operation failed: no such file');
    }
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}