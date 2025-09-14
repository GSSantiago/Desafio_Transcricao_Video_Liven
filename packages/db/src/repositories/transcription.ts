import { prisma, Transcription, Status } from "@repo/db";

export interface CreateTranscription {
  userId: string;
  fileName: string;
  durationInSeconds: number;
  fileSize: number;
  status: Status;
}

export interface UpdateTranscription {
  status?: Status;
  finishedAt?: Date;
  transcript?: string;
}

export const create = async (data: CreateTranscription): Promise<Transcription> => {
  return prisma.transcription.create({
    data: {
      userId: data.userId,
      fileName: data.fileName,
      durationInSeconds: data.durationInSeconds,
      fileSize: data.fileSize,
      status: data.status || Status.PENDING,
    },
  });
};

export const findById = async (id: string): Promise<Transcription | null> => {
  return prisma.transcription.findUnique({
    where: { id },
  });
};

export const findByUserId = async (userId: string): Promise<Transcription[]> => {
  return prisma.transcription.findMany({
    where: { userId },
  });
};

export const update = async (id: string, data: UpdateTranscription): Promise<Transcription> => {
  return prisma.transcription.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const remove = async (id: string): Promise<void> => {
  await prisma.transcription.delete({
    where: { id },
  });
};

export const findAll = async (): Promise<Transcription[]> => {
  return prisma.transcription.findMany();
};
