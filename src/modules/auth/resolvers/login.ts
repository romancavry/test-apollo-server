import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from 'config';

import type { Context } from 'app/graphql/context';

const login = async (
  _parent: unknown,
  args: { email: string; password: string },
  context: Context,
) => {
  const { prisma } = context;

  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = sign({ userId: user.id }, APP_SECRET);

  await prisma.token.update({
    where: { userId: user.id },
    data: { token },
  });

  // eslint-disable-next-line no-param-reassign
  context.user = user;

  return { token, user };
};

export default login;
