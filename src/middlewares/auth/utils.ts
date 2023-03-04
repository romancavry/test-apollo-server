// import { verify } from 'jsonwebtoken';

// import { APP_SECRET } from 'config';

export const isLoggedIn = async (
  resolve: any,
  parent: any,
  args: any,
  ctx: any,
  info: any,
) => {
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
  return resolve();
};
