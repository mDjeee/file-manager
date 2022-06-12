import fs from 'fs';
import path from 'path';
export default async function rm(dirSet, sep, pathToFile){
  try {
    let removedFile = path.join(dirSet.join(sep), pathToFile);
    if(fs.statSync(removedFile).isDirectory()){
      fs.rm(removedFile, { recursive: true }, (err) => {
        if (err) { return;}
    });
    } else {
      fs.unlink(removedFile, (error => {
        if (error) return;
      }));
    }
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}