import { prisma } from "../client";

export const getAll = async () => {
  return prisma.user.findMany();
};

export const getById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = async (data: { name: string; email: string }) => {
  return prisma.user.create({ data });
};

export const update = async (id: string, data: { name?: string; email?: string }) => {
  return prisma.user.update({ where: { id }, data });
};

export const remove = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};
