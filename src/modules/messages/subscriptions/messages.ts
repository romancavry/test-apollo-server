import { nanoid } from 'nanoid';

import { subscribers } from 'modules/dialogues';

const onMessagesUpdate = (fn: any) => subscribers.push(fn);

export default {
  subscribe: async (_parent: unknown, _args: never, { prisma, pubSub }: Context) => {
    const channel = nanoid();

    const getActualMessages = async () => {
      return await prisma.message.findMany({
        take: 50,
      });
    }

    const messages = getActualMessages();
    console.log('messages: ', messages);

    onMessagesUpdate(async () => {
      return pubSub.publish('messages', channel, getActualMessages());
    });

    // Get messages immediately, not waiting someone to send one
    setTimeout(() => pubSub.publish('messages', channel, messages), 0);

    return pubSub.subscribe('messages', channel);
  },
  resolve: (payload: any) => payload
};