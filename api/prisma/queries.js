const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const prismaQueries = {
  findAdmin: async (email, id) => {
    return await prisma.admin.findFirst({
      where: {
        email,
        id,
      },
    });
  },
};

module.exports = prismaQueries;
