import { rule, shield } from 'graphql-shield';

import type { Context } from 'app/graphql/context';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { user }: Context) => !!user,
);

export const permissions = shield(
  {
    Mutation: {
      createDialogue: isAuthenticated,
      postMessage: isAuthenticated,
      getDialogues: isAuthenticated,
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
