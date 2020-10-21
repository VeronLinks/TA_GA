import 'reflect-metadata';

import { DatabaseService } from './database/database';
import { Container } from 'typedi';
import { Server } from './server/server';

init();

async function init(): Promise<void> {
  const containterDB = Container.get(DatabaseService);
  containterDB.initConnectionPool();

  Container.get(Server);
}
