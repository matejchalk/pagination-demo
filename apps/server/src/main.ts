import { createFastifyServer, runFastifyServer } from './app/server';

createFastifyServer().then((server) => {
  runFastifyServer(server);
});
