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
  createPost: async (title, content, tags) => {
    return await prisma.post.create({
      data: {
        title,
        content,
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { tag },
                create: { tag },
              },
            },
          })),
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
  updatePost: async (id, title, content, tags) => {
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        tags: {
          deleteMany: {},
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { tag },
                create: { tag },
              },
            },
          })),
        },
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
  getPosts: async () => {
    return await prisma.post.findMany({
      include: {
        _count: { select: { comments: true } },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  },
  getPost: async (id) => {
    return await prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  },
  getTags: async () => {
    return await prisma.tag.findMany();
  },
  createCommentInPost: async (postId, name, comment) => {
    return await prisma.comment.create({
      data: { postId, name, comment },
    });
  },
};

module.exports = prismaQueries;
