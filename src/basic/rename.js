import { rename } from 'fs/promises';
export default async function rn(dirSet, sep, pathToFile, newName){
  try {
    let oldFileName = dirSet.join(sep) + sep + pathToFile;
    let newFileName = dirSet.join(sep) + sep + newName;
    await rename(oldFileName, newFileName, () => console.error('Operation failed'));
    console.log(`You are currently in ${dirSet.join(sep)}`);
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('Operation failed');
  }
}