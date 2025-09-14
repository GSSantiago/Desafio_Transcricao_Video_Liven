import { prisma, User } from "@repo/db";

export interface CreateUser {
  name: string;
  email: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export const create = async (data: CreateUser): Promise<User> => {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
};

export const findById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const update = async (id: string, data: UpdateUser): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const remove = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: { id },
  });
};

export const findAll = async (): Promise<User[]> => {
  return prisma.user.findMany();
};
