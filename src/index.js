import path from 'path';
import os from 'os';

// import nwd functions
import cd from './nwd/cd.js';
import up from './nwd/up.js';
import ls from './nwd/ls.js';

// import basic functions
import cat from './basic/cat.js';
import add from './basic/add.js';
import rn from './basic/rename.js';
import copy from './basic/copy.js';
import rm from './basic/delete.js';
import mv from './basic/move.js';

// import os functions
import eol from './os/eol.js';

// import hash functions
import hash from './hash/hash.js';

// import compress functions
import compress from './compress/compress.js';
import decompress from './compress/decompress.js';

export const manageFile = async () => {
  let username;
  let args = process.argv.slice(2);
  if(args[0] && args[0].startsWith('--username')){
    let equalIndex = args[0].indexOf('=');
    username = args[0].substring(equalIndex + 1);
  }
  else {
    username = 'nameless';
  }

    let sep = path.sep;
    let dirSet = os.userInfo().homedir.split(sep);

    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${dirSet.join(sep)}`);

    process.stdin.on('data', data => {
      if(data.toString().slice(0, -os.EOL.length) === 'up'){
        up(dirSet, sep);
      }
      else if(data.toString().startsWith('cd ')){
        let toPath = data.toString().slice(3, -2);
        cd(dirSet, sep, toPath);
      }
      else if(data.toString().slice(0, -os.EOL.length) === 'ls'){
        ls(dirSet, sep);
      }
      else if(data.toString().startsWith('cat ')){
        let pathToFile = data.toString().slice(4, -os.EOL.length);
        cat(dirSet, sep, pathToFile);
      }
      else if(data.toString().startsWith('add ')) {
        let pathToFile = data.toString().slice(4, -os.EOL.length);
        add(dirSet, sep, pathToFile);
      }
      else if(data.toString().startsWith('rn ')) {
        let oldFileName = data.toString().split(' ')[1];
        let newFileName = data.toString().split(' ')[2].slice(0,-os.EOL.length);
        rn(dirSet, sep, oldFileName, newFileName);
      }
      else if(data.toString().startsWith('cp ')) {
        let oldFileName = data.toString().split(' ')[1];
        let newFileName = data.toString().split(' ')[2].slice(0,-os.EOL.length);
        copy(dirSet, sep, oldFileName, newFileName);
      }
      else if(data.toString().startsWith('mv ')) {
        let oldFileName = data.toString().split(' ')[1];
        let newFileName = data.toString().split(' ')[2].slice(0,-os.EOL.length);
        mv(dirSet, sep, oldFileName, newFileName);
      }
      else if(data.toString().startsWith('rm ')) {
        let oldFileName = data.toString().split(' ')[1].slice(0, -os.EOL.length);
        rm(dirSet, sep, oldFileName);
      }
      else if(data.toString().startsWith('os --')) {
        let command = data.toString().split(' ')[1].slice(0, -os.EOL.length);
        eol(dirSet, sep, command);
      }
      else if(data.toString().startsWith('hash ')) {
        let pathToFile = data.toString().split(' ')[1].slice(0, -os.EOL.length);
        hash(dirSet, sep, pathToFile);
      }
      else if(data.toString().startsWith('compress ')) {
        let oldFileName = data.toString().split(' ')[1];
        let newFileName = data.toString().split(' ')[2].slice(0,-os.EOL.length);
        compress(dirSet, sep, oldFileName, newFileName);
      }
      else if(data.toString().startsWith('decompress ')) {
        let oldFileName = data.toString().split(' ')[1];
        let newFileName = data.toString().split(' ')[2].slice(0,-os.EOL.length);
        decompress(dirSet, sep, oldFileName, newFileName);
      }
      else if(data.toString().slice(0, -os.EOL.length) === '.exit'){
        console.log(`Thank you for using File Manager, ${username}!`);
        process.exit();
      }
      else {
        console.log('Invalid input');
      }
    });

    process.on('SIGINT', () => {
      console.log(`Thank you for using File Manager, ${username}!`);
      process.exit();
    })
};
// use 'npm run start -- --username=user' for test
manageFile();