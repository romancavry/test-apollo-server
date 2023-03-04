import { PrismaClient } from '@prisma/client'
import { createPubSub } from 'graphql-yoga';
import type { PubSub, YogaInitialContext } from 'graphql-yoga'

import { authenticateUser } from 'middlewares/auth/auth';

const prisma = new PrismaClient()

const pubSub = createPubSub();

export interface Context {
  prisma: PrismaClient
  pubSub: PubSub<any>
  user: null | any // TODO: "User" type
}

export const createContext = async (initialContext: YogaInitialContext) => {
  return {
    prisma,
    pubSub,
    // user: await authenticateUser(prisma, initialContext.request)
  }
}
