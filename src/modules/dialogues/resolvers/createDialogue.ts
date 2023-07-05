import type { Context } from 'app/graphql/context';

const createDialogue = async (
  _parent: unknown,
  args: { name: string },
  { prisma, user }: Context,
) => {
  const { name } = args;

  const createdDialogue = await prisma.dialogue.create({
    data: {
      name,
      users: {
        connect: {
          id: user!.id,
        },
      },
    },
  });

  return createdDialogue.id;
};

export default createDialogue;
