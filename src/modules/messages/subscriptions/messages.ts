import { nanoid } from 'nanoid';

import type { Context } from 'app/graphql/context';

import { subscribers } from 'modules/dialogues';

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

    const messages = getActualMessages();
    console.log('messages: ', messages);

    onMessagesUpdate(async () =>
      pubSub.publish('messages', channel, getActualMessages()),
    );

    // Get messages immediately, not waiting someone to send one
    setTimeout(() => pubSub.publish('messages', channel, messages), 0);

    return pubSub.subscribe('messages', channel);
  },
  resolve: (payload: unknown) => payload,
};
