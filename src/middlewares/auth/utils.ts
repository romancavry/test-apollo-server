import { verify } from 'jsonwebtoken'

import { APP_SECRET } from 'config'

// export const isLoggedIn = (resolve: any, parent: any, args: any, context: any, info: any) => {
//   let Authorization;

//   if (
//     info.operation.operation === "query" ||
//     info.operation.operation === "mutation"
//   ) {
//     Authorization = context.request.get("Authorization");
//   }

//   if (info.operation.operation === "subscription") {
//     Authorization = context.connection.context.Authorization;
//   }

//   if (Authorization) {
//     const token = Authorization.replace("Bearer ", "");
//     // @ts-ignore
//     const { userId } = verify(token, APP_SECRET);

//     return resolve({ userId, ...parent });
//   }

//   throw new AuthError();
// };

// class AuthError extends Error {
//   constructor() {
//     super("Not authorized");
//   }
// }

// export const isLoggedIn = (resolve: any, parent: any, args: any, context: any, info: any) => {
//   console.log(resolve);
//   console.log(parent);
//   console.log(args);
//   console.log(context);
//   console.log(info);
// };

// class AuthError extends Error {
//   constructor() {
//     super("Not authorized");
//   }
// }

// export const isLoggedIn = async ({ root, args, context, info }: any, next: () => void) => {
//   console.log('root: ', root);
//   console.log('args: ', args);
//   console.log('context: ', context);
  
//   return next()
// }

export const isLoggedIn = async (resolve: any, parent: any, args: any, ctx: any, info: any) => {
  // Include your agent code as Authorization: <token> header.
  // const permit = ctx.request.get('Authorization') === code
 
  // if (!permit) {
  //   throw new Error(`Not authorized!`)
  // }
 
  console.log('resolve: ', resolve);
  console.log('parent: ', parent);
  console.log('args: ', args);
  console.log('ctx: ', ctx);
  console.log('info: ', info);
  return resolve()
}
