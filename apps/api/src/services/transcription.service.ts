import { Status } from '@repo/db';
import * as transcriptionRepository from '@repo/db/repositories/transcription';
import * as userRepository from '@repo/db/repositories/user';

import { getMediaDuration } from '../utils/media';

export interface CreateTranscription {
  userId: string;
  fileName: string;
  fileSize: number;
  file: Express.Multer.File;
  status: Status;
}

export interface UpdateTranscription {
  status?: Status;
  finishedAt?: Date;
  transcript?: string;
}

export const getAllTranscriptions = async () => {
  return transcriptionRepository.findAll();
};

export const getTranscriptionById = async (id: string) => {
  const transcription = await transcriptionRepository.findById(id);
  if (!transcription) {
    throw new Error('Transcrição não encontrada');
  }
  return transcription;
};

export const getTranscriptionsByUserId = async (userId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return transcriptionRepository.findByUserId(user.id);
};

export const createTranscription = async (data: CreateTranscription) => {
  const user = await userRepository.findById(data.userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const durationInSeconds = await getMediaDuration(data.file.path);

  return transcriptionRepository.create({
    ...data,
    durationInSeconds,
    status: Status.PROCESSING, 
  });
};

export const updateTranscription = async (id: string, data: UpdateTranscription) => {
  const transcription = await transcriptionRepository.findById(id);
  if (!transcription) {
    throw new Error('Transcrição não encontrada');
  }

  if (data.status === Status.DONE && !data.finishedAt) {
    data.finishedAt = new Date();
  }

  return transcriptionRepository.update(id, data);
};

export const deleteTranscription = async (id: string) => {
  const transcription = await transcriptionRepository.findById(id);
  if (!transcription) {
    throw new Error('Transcrição não encontrada');
  }

  return transcriptionRepository.remove(id);
};
