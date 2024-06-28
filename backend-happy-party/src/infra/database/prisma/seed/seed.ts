import { PrismaClient } from '@prisma/client';
import { PresentsHot } from './presents-hot.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.typeParty.deleteMany();

  await prisma.typeParty.create({
    data: {
      id: '1b3e2569-08db-4984-9c61-8ab07baac9ae',
      name: 'Married',
    },
  });

  await prisma.typeParty.create({
    data: {
      id: '8018d569-797d-4ada-8116-7485d09aac54',
      name: 'Birthday',
    },
  });

  await prisma.presentsHot.deleteMany();

  for (const present of PresentsHot) {
    await prisma.presentsHot.create({
      data: present,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .then(async () => {
    await prisma.$disconnect();
  });
