import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { APP_SECRET } from 'config'

const login = async (
  _parent: unknown,
  args: { email: string; password: string },
  { prisma }: Context
) => {
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
};

export default login;
