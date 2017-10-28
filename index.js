const execFile = require('child_process').execFile;

var server = execFile('node',['server.js'],onExit);
var webcam = execFile('node',['webcam.js'],{cwd:'./webcam'},onExit);
var detection = execFile('node',['detection.js'],{cwd:'./detection'},onExit);
var storage = execFile('node',['storage.js'],{cwd:'./storage'},onExit);

server.stdout.on('data',console.log);
webcam.stdout.on('data',console.log);
detection.stdout.on('data',console.log);
storage.stdout.on('data',console.log);

function onExit(error){
  console.log(error);
}