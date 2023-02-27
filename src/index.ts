// Register project aliases
import 'module-alias/register';

import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';

import { PORT } from 'config';

import createYogaApp from "./app/graphql/server";

const main = () => {
  const { yogaApp } = createYogaApp();

  const httpServer = createServer(yogaApp);
  
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: yogaApp.graphqlEndpoint
  })
  
  useServer(
    {
      execute: args => {
        const argsRootValue = args.rootValue as any;
        return argsRootValue.execute(args);
      },
      subscribe: args => {
        const argsRootValue = args.rootValue as any;
        return argsRootValue.subscribe(args);
      },
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yogaApp.getEnveloped({
            ...ctx,
            req: ctx.extra.request,
            socket: ctx.extra.socket,
            params: msg.payload
          })
   
        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe
          }
        }
   
        const errors = validate(args.schema, args.document)
        if (errors.length) return errors
        return args
      }
    },
    wsServer
  )

  httpServer.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}/graphql`)
  }) 
}

void main();
