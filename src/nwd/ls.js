import { readdir } from 'fs/promises';
export default async function up(dirSet, sep){
  try {
    let files;
    if(dirSet.length === 1){
      files = await readdir(dirSet.join(sep) + sep);
    }
    else {
      files = await readdir(dirSet.join(sep));
    }
    
    console.log(files);
    console.log(`You are currently in ${dirSet.join(sep)}`);
  }
  catch {
    console.error('Operation failed');
  }
}