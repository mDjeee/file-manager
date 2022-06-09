import { readdir } from 'fs/promises';
import crypto from 'crypto';
export default async function hash(dirSet, sep, pathToFile){
  try {
    let files;
    if(dirSet.length === 1){
      files = await readdir(dirSet.join(sep) + sep);
    }
    else {
      files = await readdir(dirSet.join(sep));
    }
    if(files.includes(pathToFile)){
      console.log(crypto.createHash('sha256').update(pathToFile).digest("hex"));
      console.log(`You are currently in ${dirSet.join(sep)}`);
    }
    else {
      console.error('Invalid input: no such file or directory')
    }
  }
  catch (err){
    console.err('Operation failed');
  }
}