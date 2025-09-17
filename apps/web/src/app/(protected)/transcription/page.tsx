"use client";
import { useRef, useState } from "react";

import Image from "next/image";

import { Upload } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@repo/ui/components/button";
import { createTranscription } from "@/services/api/transcription";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthUserContext";

export default function Transcriptions() {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { authUser } = useAuth();

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
      const transcription = await createTranscription({
        userId: authUser?.uid || "",
        file: selectedFile,
      });

      if (transcription.id) toast.success("Solicitação feita com sucesso!");
      else throw new Error("Erro ao fazer a solicitação");
    } catch (error: unknown) {
      console.log(error);
      if (
        error instanceof AxiosError &&
        error?.response?.data.error.includes("Limite diário")
      ) {
        toast.error(error.response.data.error);
      } else toast.error("Ocorreu um erro na solicitação!");
    } finally {
      setLoading(false);
      setSelectedFile(null);
      fileInputRef.current!.value = "";
    }
  };

  return (
    <section className="relative overflow-hidden py-16 h-[calc(100vh-72px)]">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
          fill
        />
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <div>
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
              Transcrição de{" "}
              <span className="text-destructive">vídeos e áudios</span>!
            </h1>
            <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
              Faça o upload do seu vídeo e nossa ferramenta de IA gera a
              transcrição automática de forma rápida e precisa e encontre suas
              transcrições na página de histórico
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
              Enviar mídia
            </Button>

            <input
              type="file"
              accept="audio/mpeg,audio/wav,audio/mp4,video/mp4,video/x-matroska,video/webm"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile && (
              <>
                <p className="text-sm text-muted-foreground">
                  Arquivo selecionado:{" "}
                  <span className="font-medium">{selectedFile.name}</span>
                </p>
                <Button
                  onClick={handleUpload}
                  className="px-6 py-4 text-md"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar para transcrição"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
