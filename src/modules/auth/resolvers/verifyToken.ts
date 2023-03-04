import type { Context } from 'app/graphql/context';

const verifyToken = async (
  _parent: unknown,
  args: { token: string },
  { prisma }: Context,
) => {
  const { token } = args;

  const user = await prisma.token.findUnique({
    where: { token },
  });

  if (!user) {
    throw new Error('Token invalid');
  }

  return { token };
};

export default verifyToken;
