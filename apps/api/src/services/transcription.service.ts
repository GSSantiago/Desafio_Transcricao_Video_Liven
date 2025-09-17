import fs from "fs";

import { Status } from "@repo/db";
import * as transcriptionRepository from "@repo/db/repositories/transcription";
import * as userRepository from "@repo/db/repositories/user";

import { convertToMP3, getMediaDuration, splitAudio } from "../utils/media";

import openai from "../lib/openai";
import { MAX_PER_DAY } from "../constants/quota";
import { MAX_SIZE } from "../constants/audio";

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
    throw new Error("Transcrição não encontrada");
  }
  return transcription;
};

export const getTranscriptionsByUserId = async (userId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return transcriptionRepository.findAllByUserId(user.id);
};

export const createTranscription = async (data: CreateTranscription) => {
  const user = await userRepository.findById(data.userId);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const { totalTranscriptions } =
    await transcriptionRepository.getUserDailyUsage(data.userId);

  if (totalTranscriptions >= MAX_PER_DAY) {
    fs.unlink(data.file.path, (err) => {
      if (err) {
        console.error("Erro ao deletar arquivo temporário:", err);
      }
    });
    throw new Error(`Limite diário de ${MAX_PER_DAY} transcrições atingido`);
  }

  const durationInSeconds = await getMediaDuration(data.file.path);

  const entity = await transcriptionRepository.create({
    ...data,
    durationInSeconds,
    status: Status.PROCESSING,
  });

  processTranscription(data.file, entity.id);

  return entity;
};

const processTranscription = async (
  file: Express.Multer.File,
  transcriptionId: string,
) => {
  let mp3Pathname: string | null = null;

  try {
    let transcript: string = "";
    mp3Pathname = await convertToMP3(file.path, file.filename);

    const { size: mp3fileSize } = fs.statSync(mp3Pathname);

    if (mp3fileSize > MAX_SIZE)
      transcript = await processMultipleAudios(mp3Pathname, file.filename);
    else transcript = await processSingleAudio(mp3Pathname);

    await transcriptionRepository.update(transcriptionId, {
      status: Status.DONE,
      finishedAt: new Date(),
      transcript,
    });
  } catch (error) {
    console.error("Erro ao processar transcrição:", error);
    await transcriptionRepository.update(transcriptionId, {
      status: Status.FAILED,
      finishedAt: new Date(),
    });
  } finally {
    [mp3Pathname, file.path].forEach((path) => {
      if (path) {
        fs.unlink(path, (err) => {
          if (err) {
            console.error(`Erro ao deletar arquivo temporário ${path}:`, err);
          }
        });
      }
    });
  }
};

const processSingleAudio = async (audioPath: string) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: process.env.TRANSCRIPTION_MODEL || "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    throw Error(
      error instanceof Error ? error.message : "Erro ao processar transcrição",
    );
  }
};

const processMultipleAudios = async (audioPath: string, rootName: string) => {
  const audioPaths = await splitAudio(audioPath, rootName);
  try {
    let fullTranscript = "";
    for (const path of audioPaths) {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(path),
        model: process.env.TRANSCRIPTION_MODEL || "gpt-4o-transcribe",
      });
      fullTranscript += transcription.text + "\n";
    }

    return fullTranscript;
  } catch (error) {
    throw Error(
      error instanceof Error ? error.message : "Erro ao processar transcrição",
    );
  } finally {
    audioPaths.forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error("Erro ao deletar arquivo temporário:", err);
        }
      });
    });
  }
};

export const updateTranscription = async (
  id: string,
  data: UpdateTranscription,
) => {
  const transcription = await transcriptionRepository.findById(id);
  if (!transcription) {
    throw new Error("Transcrição não encontrada");
  }

  if (data.status === Status.DONE && !data.finishedAt) {
    data.finishedAt = new Date();
  }

  return transcriptionRepository.update(id, data);
};

export const deleteTranscription = async (id: string) => {
  const transcription = await transcriptionRepository.findById(id);
  if (!transcription) {
    throw new Error("Transcrição não encontrada");
  }

  return transcriptionRepository.remove(id);
};
