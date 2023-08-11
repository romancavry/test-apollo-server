import type { Context } from 'app/graphql/context';

const getMessages = (
  _parent: unknown,
  args: { dialogueId: number },
  { prisma }: Context,
) => prisma.message.findMany({ where: { dialogueId: args.dialogueId } });

export default getMessages;
