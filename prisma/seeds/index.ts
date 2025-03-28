import { PrismaClient } from '@prisma/client';
import { readdir } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  const seedDir = join(__dirname);
  const seedFiles = (await readdir(seedDir)).filter((file) =>
    file.endsWith('.seed.ts'),
  );

  for (const seedFile of seedFiles) {
    const seed = await import(`./${seedFile}`);
    await seed.default(prisma);
  }

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
