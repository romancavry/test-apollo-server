import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import { createPubSub } from 'graphql-yoga';
import type { PubSub, YogaInitialContext } from 'graphql-yoga';

import { authenticateUser } from 'middlewares';

const prisma = new PrismaClient();

const pubSub = createPubSub();

export interface Context {
  prisma: PrismaClient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pubSub: PubSub<any>;
  user?: User | null | undefined;
}

export const createContext = async (initialContext: YogaInitialContext) => {
  const context: Context = {
    prisma,
    pubSub,
  };

  if (initialContext.request) {
    const user = await authenticateUser(prisma, initialContext.request);
    context.user = user;
  }

  return context;
};
