import { PrismaClient } from '@prisma/client'
import { createPubSub } from 'graphql-yoga';
import type { PubSub } from 'graphql-yoga';

const prisma = new PrismaClient()

const pubSub = createPubSub();

export interface Context {
  prisma: PrismaClient
  pubSub: PubSub<any>
  req: any // HTTP request carrying the `Authorization` header
}

export function createContext(req: any) {
  return {
    ...req,
    prisma,
    pubSub,
  }
}
