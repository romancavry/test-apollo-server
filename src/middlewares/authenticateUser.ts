import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

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
      return prisma.user.findUnique({ where: { id: userId } });
    }
  }

  return null;
};

export default authenticateUser;
