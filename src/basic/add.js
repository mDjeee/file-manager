import { appendFile } from 'fs/promises';
import fs from 'fs';
export default async function add(dirSet, sep, fileName){
  try {
    let pathToFile = dirSet.join(sep) + sep + fileName;

    let writeStream = fs.createWriteStream(pathToFile);

    writeStream.write('New File', 'utf8');

    writeStream.on('err', (err) => {
      if(err){
        console.error('Operation failed');
      }
    })

    writeStream.on('finish', () => {
      console.log(`You are currently in ${dirSet.join(sep)}`);
    });
    
    writeStream.end();
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}