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
  createPost: async (title, content, tag) => {
    return await prisma.post.create({
      data: {
        title,
        content,
        tags: {
          create: [
            {
              tag: {
                connectOrCreate: {
                  where: { tag },
                  create: { tag },
                },
              },
            },
          ],
        },
      },
    });
  },
  updatePostStatus: async (id, published) => {
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        published,
      },
    });
  },
  updatePost: async (id, title, content, published) => {
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        published,
      },
    });
  },
  deletePost: async (id) => {
    return await prisma.post.delete({
      where: {
        id,
      },
    });
  },
};

module.exports = prismaQueries;
