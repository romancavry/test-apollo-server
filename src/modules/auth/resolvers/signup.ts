import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from 'config';

import type { Context } from 'app/graphql/context';

const signup = async (
  _parent: unknown,
  args: { email: string; password: string; name: string },
  { prisma }: Context,
) => {
  const password = await hash(args.password, 10);

  const targetEmailUser = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (targetEmailUser) {
    throw new Error('User already exists');
  }

  const user = await prisma.user.create({
    data: { ...args, password },
  });

  const token = sign({ userId: user.id }, APP_SECRET);

  // save token
  await prisma.token.create({
    data: { userId: user.id, token },
  });

  return { token, user };
};

export default signup;
