'use client'
import { useRef, useState } from "react";

import { Upload } from "lucide-react";
import { toast } from 'react-toastify';

import { Button } from "@repo/ui/components/button";
import { createTranscription } from "@/services/api/transcription";
import { AxiosError } from "axios";

export default function Transcriptions() {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setLoading(true);

    try {
      // TODO: trocar pelo userId real do usuário logado
      const userId = "07b90e56-59b2-4040-a072-3a0d488648e6"

      const transcription = await createTranscription({
        userId,
        file: selectedFile,
      })

      if(transcription.id)
        toast.success('Solicitação feita com sucesso!')
      else 
        throw new Error('Erro ao fazer a solicitação');

    } catch (error: unknown) {
      console.log(error);
        if(error instanceof AxiosError && error.message.includes('Limite diário')) {
          toast.error(error.message);
        }
        else
        toast.error('Ocorreu um erro na solicitação!')
    } finally {
      setLoading(false);
      setSelectedFile(null);
      fileInputRef.current!.value = "";
    }
  }

  return (
      <section className="relative overflow-hidden py-16">
        <div className="relative z-10 container mx-auto">
          <div className="flex flex-col items-center gap-6 text-center">
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Transcrição de{" "}
                <span className="text-destructive">vídeos e áudios</span>!
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Faça o upload do seu vídeo e nossa ferramenta de IA gera a transcrição automática
                de forma rápida e precisa.
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center gap-4">
              <Button
                className="shadow-sm transition-shadow hover:shadow px-8 py-6 text-lg"
                variant="default"
                onClick={handleButtonClick}
                disabled={loading}
                >
                    <Upload className="mr-2 h-6 w-6" />
                    Enviar vídeo
                </Button>


              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile && (
                <>
                    <p className="text-sm text-muted-foreground">
                        Arquivo selecionado: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                    <Button
                    onClick={handleUpload}
                    className="px-6 py-4 text-md"
                    disabled={loading}
                    >
                    {loading ? 'Enviando...' : 'Enviar para transcrição'}
                    </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
  );
}
