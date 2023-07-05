import * as fs from 'fs';
import * as path from 'path';

import { createSchema, createYoga } from 'graphql-yoga';
import { useGraphQLMiddleware } from '@envelop/graphql-middleware';

import { permissions } from 'middlewares';

import resolvers from 'modules/resolvers';
import { createContext } from './context';

const createYogaApp = () => {
  const typeDefs = fs.readFileSync(
    path.join('src', 'app', 'graphql', 'schema.graphql'),
    {
      encoding: 'utf-8',
    },
  );

  const schema = createSchema({
    typeDefs,
    resolvers,
  });

  const yogaApp = createYoga({
    plugins: [useGraphQLMiddleware([permissions])],
    context: createContext,
    graphiql: {
      subscriptionsProtocol: 'WS',
    },
    // @ts-ignore
    schema,
  });

  return { yogaApp };
};

export default createYogaApp;
