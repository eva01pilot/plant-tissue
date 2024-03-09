import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
  await prisma.user.deleteMany({
    where: {
      role: {equals: 'ADMIN'}
    }
  })
  const user = await prisma.user.create({
    data: {
      role: "ADMIN",
      password_hash: Bun.password.hashSync("1111"),
      username: "admin",
      avatar: "",
    },
    select: {
      username: true
    }
  });
  const users = await prisma.user.findMany()
