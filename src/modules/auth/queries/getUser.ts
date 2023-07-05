import type { Context } from 'app/graphql/context';

const getUser = async (_parent: unknown, _args: never, { user }: Context) =>
  user;

export default getUser;
