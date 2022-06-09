import zlib from 'zlib';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';

export default async function compress(dirSet, sep, fileToCompress, pathToCompress){
  try {
    let input = path.join(dirSet.join(sep), fileToCompress);
    let output = path.join(dirSet.join(sep), pathToCompress);
    
    const readStream = fs.createReadStream(input);
    const writeStream = fs.createWriteStream(output);

    const brotli = zlib.createBrotliCompress();

    pipeline(
      readStream,
      brotli,
      writeStream,
      (err) => {
        if(err){
          console.error('Operation failed');
        }
        else {
          console.log(`You are currently in ${dirSet.join(sep)}`);
        }
      } 
    );
  }
  catch (err){
    console.error('Operation failed')
  }
}