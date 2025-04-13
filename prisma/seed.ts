import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async (tx) => {
    const users = await tx.users.createManyAndReturn({
      data: [
        {
          name: "Mohan Babu",
          email: "admin@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "admin",
        },
        {
          name: "Praveen Kumar",
          email: "faculty@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "faculty",
        },
        {
          name: "Sai Ram",
          email: "student@email.com",
          password:
            "$2a$12$GsG/5pFRyi9E1bHp5qfTweQK8Kxm7I9lKuQBos/FRnQ8.o/Njyoii",
          role: "student",
        },
      ],
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
