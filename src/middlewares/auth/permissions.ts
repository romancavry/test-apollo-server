import { isLoggedIn } from './utils';

export const permissions = {
  Subscription: {
    messages: isLoggedIn
  }
};


export default permissions;
