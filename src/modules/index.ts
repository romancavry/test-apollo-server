// import type { Prisma } from '@prisma/client'
import { signup, login, verifyToken } from './auth/resolvers';
import { createDialogue } from './dialogues/resolvers';
import { postMessage } from './messages/resolvers';
import { messages } from './messages/subscriptions';

const resolvers = {
  // Query: {
  //   messages: () => messages,
  // },

  Mutation: {
    // Auth
    signup,
    login,
    verifyToken,

    // Messages
    postMessage,

    // Dialogues
    createDialogue,
  },

  Subscription: {
    messages,
  }
}

export default resolvers;
