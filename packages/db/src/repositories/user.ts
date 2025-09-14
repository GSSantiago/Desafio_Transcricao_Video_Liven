import { prisma } from "../client";

export const getAll = async () => {
  return prisma.usuario.findMany();
};

export const getById = async (id: string) => {
  return prisma.usuario.findUnique({ where: { id } });
};

export const create = async (data: { nome: string; email: string }) => {
  return prisma.usuario.create({ data });
};

export const update = async (id: string, data: { nome?: string; email?: string }) => {
  return prisma.usuario.update({ where: { id }, data });
};

export const remove = async (id: string) => {
  return prisma.usuario.delete({ where: { id } });
};
