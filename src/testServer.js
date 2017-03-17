import server from "./server";
const spawn = require('child_process').spawn;

const command = spawn("jest", {shell: true, stdio: "inherit"}, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`${stdout}`);
  console.log(`${stderr}`);
});

command.on('close', (code) => {
  // console.log(command);
  console.log(`Exited with code: ${code}`)
  process.exit(code);
})
