import { readdir } from 'fs/promises';
import fs from 'fs';
import crypto from 'crypto';
export default async function hash(dirSet, sep, fileName){
  try {
    let files;
    const hash = crypto.createHash('sha256');

    if(dirSet.length === 1){
      files = await readdir(dirSet.join(sep) + sep);
    }
    else {
      files = await readdir(dirSet.join(sep));
    }

    if(files.includes(fileName)){
      let pathToFile = dirSet.join(sep) + sep + fileName;
      let readStream = fs.createReadStream(pathToFile);
      let res = '';
      readStream.on('data', chunk => {
        res += chunk.toString();
      })
      readStream.on('end', () => {
        console.log(hash.update(res).digest("hex"));
      })
      readStream.on('close', (err) => {
        if(err){
          console.err('Operation failed');
        }
        else {
          console.log(`You are currently in ${dirSet.join(sep)}`);
        }
      });

    }
    else {
      console.error('Invalid input: no such file');
    }
  }
  catch (err){
    console.err('Operation failed');
  }
}