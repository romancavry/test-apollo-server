import { PrismaClient, User } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

import { APP_SECRET } from 'config';

const authenticateUser = async (
  prisma: PrismaClient,
  request: Request,
): Promise<User | null> => {
  if (request) {
    const header = request.headers.get('authorization');

    if (header) {
      const token = header.split(' ')[1];
      const tokenPayload = verify(token, APP_SECRET) as JwtPayload;

      const { userId } = tokenPayload;
      const user = await prisma.user.findUnique({ where: { id: userId } });

      return user;
    }
  }

  return null;
};

export default authenticateUser;
