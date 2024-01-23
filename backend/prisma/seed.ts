import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
  console.log('ayaya')
  const user = await prisma.user.create({
    data: {
      role: "ADMIN",
      password_hash: Bun.password.hashSync("32143678"),
      username: "admin",
      avatar: "",
    },
    select: {
      username: true
    }
  });
  const users = await prisma.user.findMany()
  console.log('ayaya')
  console.log(users)
