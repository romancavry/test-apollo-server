import { rule, shield } from 'graphql-shield';

import type { Context } from 'app/graphql/context';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx: Context) => ctx.user !== null,
);

export const permissions = shield({
  Mutation: {
    createDialogue: isAuthenticated,
    postMessage: isAuthenticated,
  },
  Subscription: {
    messages: isAuthenticated,
  },
});

export default permissions;
