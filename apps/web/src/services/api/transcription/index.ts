import { api } from '@/lib/axios'

//#TODO Remover essa tipagem e usar a do packages/schema
interface Transcription {
  id: string
  userId: string
  fileName: string
  durationInSeconds: number
  fileSize: number
  status: string
  createdAt: string
  finishedAt?: string
  transcript?: string
}

interface CreateTranscription {
  userId: string
  file: File
}

export async function createTranscription(data: CreateTranscription): Promise<Transcription> {
  const formData = new FormData();
  formData.append('userId', data.userId);
  formData.append('file', data.file);


  const response = await api.post<Transcription>('/transcription', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}
