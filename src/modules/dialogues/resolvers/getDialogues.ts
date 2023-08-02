import type { Context } from 'app/graphql/context';

const getDialogues = (_parent: unknown, _args: unknown, { prisma }: Context) =>
  prisma.dialogue.findMany();

export default getDialogues;
