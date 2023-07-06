// Queries
import { getUser } from './auth/queries';

// Mutations
import { signup, login, verifyToken } from './auth/resolvers';
import { createDialogue, getDialogues } from './dialogues/resolvers';
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
    getDialogues,
  },

  Subscription: {
    messages,
  },
};

export default resolvers;
