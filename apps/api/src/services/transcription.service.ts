import fs from "fs";

import { Status } from '@repo/db';
import * as transcriptionRepository from '@repo/db/repositories/transcription';
import * as userRepository from '@repo/db/repositories/user';

import { getMediaDuration } from '../utils/media';

import openai from '../lib/openai';
import { MAX_PER_DAY } from "../constants/quota";

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

  const { totalTranscriptions } = await transcriptionRepository.getUserDailyUsage(data.userId);

  if(totalTranscriptions >= MAX_PER_DAY) {
    throw new Error(`Limite diário de ${MAX_PER_DAY} transcrições atingido`);
  }

  const durationInSeconds = await getMediaDuration(data.file.path);

   const entity =  await transcriptionRepository.create({
    ...data,
    durationInSeconds,
    status: Status.PROCESSING, 
  });

  processTranscription(data.file.path, entity.id);

  return entity;
};

const processTranscription = async (filePath: string, transcriptionId: string) => {

    try {
        const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: process.env.TRANSCRIPTION_MODEL || "gpt-4o-transcribe",
        });

        await transcriptionRepository.update(transcriptionId, {
            status: Status.DONE,
            finishedAt: new Date(),
            transcript: transcription.text,
        });

    } catch (error) {
        console.error("Erro ao processar transcrição:", error);
        await transcriptionRepository.update(transcriptionId, {
            status: Status.FAILED,
            finishedAt: new Date(),
        });
    }finally {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Erro ao deletar arquivo temporário:", err);
            }
        });
    }
}

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
