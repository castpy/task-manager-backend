import { AuthProvider, PrismaClient, Roles } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export default async function seed() {
  try {
    const tasks = [
      ...Array.from({ length: 10 }, () => ({
        id: uuid(),
        title: 'Tarefa - To Do',
        description: 'Descrição da tarefa - To Do',
        status: 'to-do',
        date_from: new Date(),
        date_to: new Date(),
      })),
      ...Array.from({ length: 10 }, () => ({
        id: uuid(),
        title: 'Tarefa - In Progress',
        description: 'Descrição da tarefa - In Progress',
        status: 'in-progress',
        date_from: new Date(),
        date_to: new Date(),
      })),
      ...Array.from({ length: 10 }, () => ({
        id: uuid(),
        title: 'Tarefa - Completed',
        description: 'Descrição da tarefa - Completed',
        status: 'completed',
        date_from: new Date(),
        date_to: new Date(),
      })),
    ];

    await prisma.users.upsert({
      where: { id: uuid() },
      update: {},
      create: {
        id: uuid(),
        roles: [Roles.ADMIN],
        email: 'user.teste@email.com',
        authProvider: AuthProvider.EMAIL,
        password: hashSync('Teste@123', 10),
        infos: {
          create: {
            id: uuid(),
            name: 'Usuário de Teste',
          },
        },
        tasks: {
          createMany: {
            data: tasks,
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
