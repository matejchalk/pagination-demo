import { createFastifyServer, runFastifyServer } from './app/server';

const server = createFastifyServer();

runFastifyServer(server);
