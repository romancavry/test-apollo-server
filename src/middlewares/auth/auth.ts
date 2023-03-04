import { PrismaClient, User } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

import { APP_SECRET } from 'config';

export const authenticateUser = async (
  prisma: PrismaClient,
  request: Request,
): Promise<User | null> => {
  const header = request.headers.get('authorization');

  if (header) {
    const token = header.split(' ')[1];
    const tokenPayload = verify(token, APP_SECRET) as JwtPayload;

    const { userId } = tokenPayload;

    return prisma.user.findUnique({ where: { id: userId } });
  }

  return null;
};
