import { nanoid } from 'nanoid';

import type { Context } from 'app/graphql/context';

import { subscribers } from 'modules/dialogues/subscribers';

const onMessagesUpdate = (fn: () => void) => subscribers.push(fn);

export default {
  subscribe: async (
    _parent: unknown,
    _args: never,
    { prisma, pubSub }: Context,
  ) => {
    const channel = nanoid();

    const getActualMessages = async () =>
      prisma.message.findMany({
        take: 50,
      });

    onMessagesUpdate(async () =>
      pubSub.publish('messages', channel, getActualMessages()),
    );

    return pubSub.subscribe('messages', channel);
  },
  resolve: (payload: unknown) => payload,
};
