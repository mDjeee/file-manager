import os from 'os';
export default async function eol(dirSet, sep, command){
  try{
    if(command === '--EOL'){
      console.log(JSON.stringify(os.EOL));
      console.log(`You are currently in ${dirSet.join(sep)}`);
    }
    else if(command === '--cpus'){
      console.log(os.cpus());
      console.log(`You are currently in ${dirSet.join(sep)}`);
    }
    else if(command === '--homedir'){
      console.log(os.homedir());
      console.log(`You are currently in ${dirSet.join(sep)}`);
    }
    else if(command === '--username'){
      console.log(os.userInfo().username);
      console.log(`You are currently in ${dirSet.join(sep)}`);
    }
    else if(command === '--architecture'){
      console.log(os.arch());
      console.log(`You are currently in ${dirSet.join(sep)}`);
    }
    else {
      console.error('Invalid input');
    }
  }
  catch(err){
    console.error('Operation failed');
  }
}