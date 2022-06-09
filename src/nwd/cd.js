import { readdir, lstat } from 'fs/promises';
export default async function up(dirSet, sep, toPath){
  try {
    let files
    if(dirSet.length === 1){
      files = await readdir(dirSet.join(sep) + sep);
    }
    else {
      files = await readdir(dirSet.join(sep));
    }
    if(files.includes(toPath)){
      dirSet.push(toPath);
      const isFolder = (await lstat(dirSet.join(sep))).isDirectory()
      if(isFolder){
        console.log(`You are currently in ${dirSet.join(sep)}`);
      }
      else {
        dirSet.pop();
        console.error('Operation failed: type a folder, not a file')
      }
    }
    else {
      console.error('Operation failed: no such directory');
    }
  }
  catch {
    console.error('Operation failed');
  }
}