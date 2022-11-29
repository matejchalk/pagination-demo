const concurrently = require('concurrently');
const { exec } = require('child_process');

concurrently(
  [
    {
      name: 'server',
      command:
        'docker run -d --rm -p 27017:27017 --name mongo-test mongo:latest && ts-node tools/scripts/create-indexes.ts && npx nx serve server',
    },
    {
      name: 'client',
      command: 'npx nx serve client',
    },
  ],
  {
    prefix: 'name',
    prefixColors: ['bgBlue.bold', 'bgMagenta.bold'],
    killOthers: ['failure', 'success'],
  }
).result.then(stopMongoContainer, stopMongoContainer);

function stopMongoContainer() {
  exec('docker stop mongo-test', (err) => {
    if (err) {
      console.error('Failed to stop MongoDB container');
    } else {
      console.log('Stopped MongoDB container');
    }
    process.exit();
  });
}
