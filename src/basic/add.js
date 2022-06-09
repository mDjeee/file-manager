import { appendFile } from 'fs/promises';
export default async function add(dirSet, sep, pathToFile){
  try {
    let fileName = dirSet.join(sep) + sep + pathToFile;
    await appendFile(fileName, '', () => console.error('FS operation failed'));
    console.log(`You are currently in ${dirSet.join(sep)}`);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}