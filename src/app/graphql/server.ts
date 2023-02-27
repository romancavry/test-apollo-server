import * as fs from 'fs';
import * as path from 'path';

import { createSchema, createYoga } from 'graphql-yoga';

import resolvers from '../resolvers';
import { createContext } from './context';

const createYogaApp = () => {    
  const typeDefs = fs.readFileSync(path.join('src', 'app', 'graphql', 'schema.graphql'), {
    encoding: 'utf-8',
  });
  
  const schema = createSchema({
    typeDefs,
    resolvers,
  });
  
  const yogaApp = createYoga({
    context: createContext,
    graphiql: {
      subscriptionsProtocol: 'WS'
    },
    schema
  });

  return { yogaApp }
}

export default createYogaApp;
