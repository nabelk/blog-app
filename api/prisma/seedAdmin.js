const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  bcrypt.hash(process.env.ADMIN_PASSWORD, 10, async (err, hashedPassword) => {
    if (err) {
      next(err);
    }
    const admin = await prisma.admin.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: {},
      create: {
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
