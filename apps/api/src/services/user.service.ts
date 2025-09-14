import * as userRepository from '@repo/db/repositories/user';

export interface CreateUser {
  name: string;
  email: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export const getAllUsers = async () => {
  return userRepository.getAll();
};

export const getUserById = async (id: string) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return user;
};

export const createUser = async (data: CreateUser) => {
  const existUser = await userRepository.getByEmail(data.email);
  if (existUser) {
    throw new Error('Email já está em uso');
  }

  return userRepository.create(data);
};

export const updateUser = async (id: string, data: UpdateUser) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return userRepository.update(id, data);
};

export const deleteUser = async (id: string) => {
  const user = await userRepository.getById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return userRepository.remove(id);
};
