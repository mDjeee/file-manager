import path from 'path';
export default function up(dirSet, sep){
  try {
    if(dirSet.length > 1){
      dirSet.pop();
    }
    console.log(`You are currently in ${dirSet.join(sep)}`);
  }
  catch {
    console.error('Operation failed');
  }
}