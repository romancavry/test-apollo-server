import { hash, compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import type { PubSub } from 'graphql-yoga';

import { APP_SECRET } from 'config'

import { messages } from 'app/graphql/mock';
import { Context } from 'app/graphql/context';

const subscribers: any[] = [];

const onMessagesUpdate = (fn: any) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },

  Mutation: {
    async signup(
      _: unknown,
      args: { email: string; password: string; name: string },
      context: Context
    ) {
      const password = await hash(args.password, 10)
 
      const user = await context.prisma.user.create({
        data: { ...args, password }
      })
 
      const token = sign({ userId: user.id }, APP_SECRET)

      // save token
      await context.prisma.token.create({
        data: { userId: user.id, token }
      })
 
      return { token, user }
    },

    async login(
      _: unknown,
      args: { email: string; password: string },
      context: Context
    ) {
      const user = await context.prisma.user.findUnique({
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
 
      return { token, user }
    },

    async verifyToken(
      _: unknown,
      args: { token: string },
      context: Context
    ) {
      const { token } = args;

      const user = await context.prisma.token.findUnique({
        where: { token }
      });

      if (!user) {
        throw new Error('Token invalid');
      }

      return { token };
    },

    postMessage: (_: unknown, { user, content }: { user: string; content: string }) => {
      const id = messages.length;

      messages.push({
        id,
        user,
        content,
      })

      subscribers.forEach(fn => fn());

      return id;
    }
  },

  Subscription: {
    messages: {
      subscribe: (_: unknown, _2: unknown, { pubSub }: { pubSub: PubSub<any> }) => {
        const channel = Math.random().toString(36).slice(2, 15);
 
        onMessagesUpdate(() => pubSub.publish('messages', channel, messages));
        // Get messages immediately, not waiting someone to send one
        setTimeout(() => pubSub.publish('messages', channel, messages), 0);

        console.log('messages: ', messages);
        return pubSub.subscribe('messages', channel);
      },
      resolve: (payload: any) => payload
    }
  }
}

export default resolvers;