import { Request, Response } from 'express';
import * as transcriptionService from '../services/transcription.service';

export const getAllTranscriptions = async (req: Request, res: Response) => {
  try {
    const transcriptions = await transcriptionService.getAllTranscriptions();
    return res.json(transcriptions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTranscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transcription = await transcriptionService.getTranscriptionById(id);
    return res.json(transcription);
  } catch (error: any) {
    if (error.message === 'Transcrição não encontrada') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getTranscriptionsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const transcriptions = await transcriptionService.getTranscriptionsByUserId(userId);
    return res.json(transcriptions);
  } catch (error: any) {
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const createTranscription = async (req: Request, res: Response) => {
  try {
    const { userId, fileName, durationInSeconds, fileSize, status } = req.body;
    const transcription = await transcriptionService.createTranscription({
      userId,
      fileName,
      durationInSeconds,
      fileSize,
      status,
    });
    return res.status(201).json(transcription);
  } catch (error: any) {
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};


export const deleteTranscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await transcriptionService.deleteTranscription(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.message === 'Transcrição não encontrada') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};
