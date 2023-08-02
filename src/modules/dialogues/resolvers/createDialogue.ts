import type { Context } from 'app/graphql/context';

const createDialogue = async (
  _parent: unknown,
  args: { name: string },
  { prisma, user }: Context,
) => {
  const { name } = args;

  // Create dialogue with all possible users included
  const users = await prisma.user.findMany();
  const usersIds = users.map(user => user.id);

  const newDialogue = await prisma.dialogue.create({
    data: {
      name,
      usersIds,
      messagesIds: [],
      users: {
        connect: {
          id: user!.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: user!.id,
    },
    data: {
      dialoguesIds: [...user!.dialoguesIds, newDialogue.id],
    },
  });

  return newDialogue.id;
};

export default createDialogue;
