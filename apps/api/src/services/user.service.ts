import * as userRepository from '@repo/db/repositories/user';
import { auth } from '../lib/firebase';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export const getAllUsers = async () => {
  return userRepository.findAll();
};

export const getUserById = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return user;
};

export const createUser = async (data: CreateUser) => {
  const existUser = await userRepository.findByEmail(data.email);
  if (existUser) {
    throw new Error('Email já está em uso');
  }

  try {
    const createdUser = await userRepository.create(data);

    await auth.createUser({
      uid: createdUser.id,
      email: createdUser.email,
      displayName: createdUser.name,
      password: data.password,
    });

    return createdUser;
  } catch (error) {
    throw new Error('Erro ao criar usuário');
  }
};

export const updateUser = async (id: string, data: UpdateUser) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return userRepository.update(id, data);
};

export const deleteUser = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return userRepository.remove(id);
};
