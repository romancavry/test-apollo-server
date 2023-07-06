import type { Context } from 'app/graphql/context';

const getDialogues = async (
  _parent: unknown,
  args: { ids: number[] },
  { prisma }: Context,
) => {
  const { ids } = args;

  const dialogues = await prisma.dialogue.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return dialogues;
};

export default getDialogues;
