// import type { Prisma } from '@prisma/client'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { nanoid } from 'nanoid';

import { APP_SECRET } from 'config'

import { Context } from 'app/graphql/context';

const subscribers: (() => void)[] = [];

const onMessagesUpdate = (fn: any) => subscribers.push(fn);

const resolvers = {
  // Query: {
  //   messages: () => messages,
  // },

  Mutation: {
    async signup(
      _parent: unknown,
      args: { email: string; password: string; name: string },
      { prisma }: Context
    ) {
      const password = await hash(args.password, 10)

      const targetEmailUser = await prisma.user.findUnique({
        where: { email: args.email }
      })

      if (targetEmailUser) {
        throw new Error('User already exists');
      }
 
      const user = await prisma.user.create({
        data: { ...args, password }
      })
 
      const token = sign({ userId: user.id }, APP_SECRET)

      // save token
      await prisma.token.create({
        data: { userId: user.id, token }
      })
 
      return { token, user }
    },

    async login(
      _parent: unknown,
      args: { email: string; password: string },
      { prisma }: Context
    ) {
      const user = await prisma.user.findUnique({
        where: { email: args.email }
      })

      if (!user) {
        throw new Error('No such user found');
      }
 
      const valid = await compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid password');
      }
 
      const token = sign({ userId: user.id }, APP_SECRET)

      await prisma.token.update({
        where: { userId: user.id },
        data: { token }
      });
 
      return { token, user }
    },

    async verifyToken(
      _parent: unknown,
      args: { token: string },
      { prisma }: Context
    ) {
      const { token } = args;

      const user = await prisma.token.findUnique({
        where: { token }
      });

      if (!user) {
        throw new Error('Token invalid');
      }

      return { token };
    },

    async postMessage(
      _parent: unknown,
      args: { text: string, dialogueId: number },
      { prisma }: Context
    ) {
      const { text } = args;
      
      const createdMessage = await prisma.message.create({
        data: {
          text,
          dialogueId: 1, // TODO
          senderId: 2, // TODO
        },
      })
  
      subscribers.forEach(fn => fn());
  
      return createdMessage.id;
    },

    async createDialogue(
      _parent: unknown,
      args: { name: string },
      { prisma }: Context
    ) {
      const { name } = args;
      
      const createdDialogue = await prisma.dialogue.create({
        data: {
          name,
        },
      })
    
      return createdDialogue.id;
    } 
  },

  Subscription: {
    messages: {
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
    }
  }
}

export default resolvers;
