import { rule, shield } from 'graphql-shield';

import type { Context } from 'app/graphql/context';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { user }: Context) => !!user,
);

export const permissions = shield(
  {
    Query: {
      getDialogues: isAuthenticated,
    },
    Mutation: {
      createDialogue: isAuthenticated,
      postMessage: isAuthenticated,
    },
    Subscription: {
      messages: isAuthenticated,
    },
  },
  {
    debug: true,
  },
);

export default permissions;
