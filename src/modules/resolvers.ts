// Queries
import { getUser } from './auth/queries';

// Mutations
import { signup, login, verifyToken } from './auth/resolvers';
import { createDialogue } from './dialogues/resolvers';
import { postMessage } from './messages/resolvers';

// Subscriptions
import { messages } from './messages/subscriptions';

const resolvers = {
  Query: {
    getUser,
  },

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
  },
};

export default resolvers;
