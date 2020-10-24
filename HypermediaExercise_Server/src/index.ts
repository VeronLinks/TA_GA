import 'reflect-metadata';

import { Container } from 'typedi';
import { Server } from './server/server';

init();

async function init(): Promise<void> {
  Container.get(Server);
}
