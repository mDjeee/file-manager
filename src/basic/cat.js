import { readFile } from 'fs/promises';
export default async function cat(dirSet, sep, pathToFile){
  try {
    let fileName = dirSet.join(sep) + sep + pathToFile;
    let text = await readFile(fileName);
    console.log(text.toString())
    console.log(`You are currently in ${dirSet.join(sep)}`);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}