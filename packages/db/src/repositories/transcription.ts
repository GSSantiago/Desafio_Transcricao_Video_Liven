import { prisma, Transcription, Status } from "@repo/db";

export interface CreateTranscription {
  userId: string;
  fileName: string;
  durationInSeconds: number;
  fileSize: number;
  status: Status;
  transcript?: string;
}

export interface UpdateTranscription {
  status?: Status;
  finishedAt?: Date;
  transcript?: string;
}

export const create = async (
  data: CreateTranscription,
): Promise<Transcription> => {
  return prisma.transcription.create({
    data: {
      userId: data.userId,
      fileName: data.fileName,
      durationInSeconds: data.durationInSeconds,
      fileSize: data.fileSize,
      transcript: data.transcript || null,
      status: data.status || Status.PENDING,
    },
  });
};

export const findById = async (id: string): Promise<Transcription | null> => {
  return prisma.transcription.findUnique({
    where: { id },
  });
};

export const findAllByUserId = async (
  userId: string,
): Promise<Transcription[]> => {
  return prisma.transcription.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const update = async (
  id: string,
  data: UpdateTranscription,
): Promise<Transcription> => {
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

export const getUserDailyUsage = async (userId: string) => {
  const startDate = new Date(new Date().setHours(0, 0, 0));
  const endDate = new Date(new Date().setHours(23, 59, 59));

  const result = await prisma.transcription.aggregate({
    _sum: {
      durationInSeconds: true,
      fileSize: true,
    },
    _count: true,
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  return {
    totalDuration: result._sum.durationInSeconds || 0,
    totalFileSize: result._sum.fileSize || 0,
    totalTranscriptions: result._count,
  };
};
