import { AuthProvider, PrismaClient, Roles } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export default async function seed() {
  try {
    await prisma.users.upsert({
      where: { id: uuid() },
      update: {},
      create: {
        id: uuid(),
        roles: [Roles.ADMIN],
        email: 'user.admin@email.com',
        authProvider: AuthProvider.EMAIL,
        password: hashSync('Teste@123', 10),
        infos: {
          create: {
            id: uuid(),
            name: 'Marcus Vinicius',
          },
        },
      },
    });

    console.log('[USERS]: criado com sucesso!');
  } catch (error) {
    console.log('[USERS]: Erro ao criar Seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
